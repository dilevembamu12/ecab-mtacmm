---
name: ecab-mtacmm
description: |
  Expert knowledge for the e-Cab MTACMM project — a Sovereign Document Management System 
  built on Nextcloud 34 for the Ministry of Transport (Republic of Congo).
  USE WHEN: working on sgds_* apps, Collabora configuration, OCR/Tesseract setup, 
  Nextcloud OCC commands, dashboard widgets, workflow circuit, or deployment.
  DO NOT USE FOR: general PHP/JS questions unrelated to this project.
applyTo: "apps/sgds_*/**"
---

# e-Cab MTACMM — AI Agent Skill

## Project Identity

- **Name**: e-Cab MTACMM (Système de Gestion Documentaire Souverain)
- **Client**: Ministère des Transports, de l'Aviation Civile et de la Marine Marchande — République du Congo
- **Stack**: Nextcloud 34.0.1 + PHP 8.3 + MySQL + Nginx + Collabora Online (Docker) + Tesseract OCR + LibreSign
- **Repository**: `git@github.com:dilevembamu12/ecab-mtacmm.git`
- **Branch**: `main`

## Critical Rules — ALWAYS Follow

### 1. OCC Command Execution
```
CORRECT:   sudo -u www php occ <command>
WRONG:     sudo -u www-data php occ <command>
WRONG:     php occ <command>
```
The `occ` tool MUST be run as user `www` (UID 1001). Running as `www-data` or root causes "Console must be executed with the user that owns config.php" errors.

### 2. config.php Protection
Before any OCC command:
```bash
sudo chown www:www config/config.php && sudo chmod 644 config/config.php
```
After any OCC command:
```bash
sudo chown root:root config/config.php && sudo chmod 444 config/config.php
```

### 3. Database Table Naming
SGDS tables do NOT use the Nextcloud `oc_` prefix:
```sql
-- CORRECT
SELECT * FROM sgds_dossier WHERE status = 'BROUILLON';
-- WRONG (QueryBuilder adds oc_ prefix automatically)
$qb->select('*')->from('sgds_dossier'); -- becomes oc_sgds_dossier!
```
Use raw SQL via `$this->db->executeQuery()` for SGDS tables, NOT the QueryBuilder.

### 4. Collabora server_name
```
CORRECT:   server_name=ecab.fbb.local:9980
WRONG:     server_name=ecab\.fbb\.local:9980
```
Backslash escaping in the Docker `-e server_name` parameter breaks CSP headers and WebSocket URLs.

### 5. PHP disable_functions
`exec`, `proc_open`, `popen` MUST be ENABLED in `/www/server/php/83/etc/php.ini`.
- Required by: `sgds_ocr` (Tesseract), `libresign` (certificate engine)
- If disabled: OCR returns empty text, LibreSign throws "Call to undefined function exec()"

## Architecture

### Circuit e-Cabinet
```
Courrier entrant → sgds_ocr (Tesseract) → BROUILLON
  → files_automatedtagging → tags RLI/DIRCOOP/DCO
  → sgds_metadata → schéma métadonnées
  → sgds_workflow → SOUMIS→EXAMEN_FORME→ANALYSE_FOND→AVIS→PRET_VISA→VISE→SIGNE
  → richdocuments (Collabora Online)
  → libresign (signature numérique)
  → sgds_archives (SHA-256)
  → files_retention (conservation permanente)
```

### Namespace Convention
All SGDS apps use: `OCA\Sgds<Name>\`
- `OCA\SgdsDossier\`, `OCA\SgdsWorkflow\`, `OCA\SgdsOcr\`, etc.
- NOT: `SgdsDossier\` (without OCA prefix)

### IWidget Interface (Nextcloud 34)
Only 6 methods exist:
```php
public function getId(): string;
public function getTitle(): string;
public function getOrder(): int;
public function getIconClass(): string;
public function getUrl(): ?string;
public function load(): void;
```
Methods `getDescription()` and `getIconUrl()` do NOT exist in v34.

## Database Schema

### SGDS Tables (no oc_ prefix)
| Table | Purpose |
|-------|---------|
| `sgds_dossier` | Dossiers: id, title, description, document_type, status, created_by, assigned_to, created_at, updated_at |
| `sgds_dossier_file` | Links dossier ↔ file: dossier_id, file_id, role (DOCUMENT_PRINCIPAL, ANNEXE, etc.) |
| `sgds_workflow_log` | Transitions: dossier_id, from_status, to_status, actor, comment, created_at |
| `sgds_grille_pilier` | Evaluations: dossier_id, pilier (opportunite/conformite/forme/fond), score |
| `sgds_metadata_schema` | 111 metadata fields across 12 document types |
| `sgds_ocr_results` | OCR output: file_id, extracted_text, metadata_json, document_type, confidence |
| `sgds_mailgate_config` | IMAP settings for email polling |

### Dossier Statuses
```
BROUILLON → SOUMIS → EXAMEN_FORME → ANALYSE_FOND → AVIS_FAVORABLE/AVIS_DEFAVORABLE → PRET_VISA → VISE → SIGNE → ARCHIVED
```

## Collabora Online Setup

### Docker Deployment
```bash
docker rm -f collabora-code 2>/dev/null
docker run -d --name collabora-code \
  --restart unless-stopped \
  -p 127.0.0.1:9981:9980 \
  --add-host=ecab.fbb.local:172.17.0.1 \
  -e "extra_params=--o:ssl.enable=false --o:ssl.termination=false" \
  -e "domain=ecab.fbb.local" \
  -e "server_name=ecab.fbb.local:9980" \
  -e "username=admin" \
  -e "password=CongoMTACMM-2026-Collabora!" \
  collabora/code:latest
```

### Nginx Proxy (port 9980 → 9981)
Config in `config/nginx-collabora-proxy.conf`. Must proxy WebSocket for real-time editing.

### Nextcloud Config
```bash
sudo -u www php occ app:enable richdocuments
sudo -u www php occ config:app:set richdocuments wopi_url --value="http://127.0.0.1:9981/"
sudo -u www php occ config:app:set richdocuments public_wopi_url --value="http://ecab.fbb.local:9980/"
sudo -u www php occ config:app:set richdocuments disable_certificate_verification --value="yes"
sudo -u www php occ richdocuments:setup
```

## Dashboard Widgets

### Current Limitation
Widgets show titles but not content. The `getUrl()` method returns iframe URLs, but Nextcloud 34 `registerDashboardWidget()` expects Vue.js compiled JS. Without `npm run build`, iframe content doesn't render.

### Widget URLs (functional, testable via curl)
- `http://ecab.fbb.local/index.php/apps/sgds_dossier/widget/pending`
- `http://ecab.fbb.local/index.php/apps/sgds_dossier/widget/actions`
- `http://ecab.fbb.local/index.php/apps/sgds_workflow/widget/circuit`

## Known Issues & Fixes

### "Call to undefined function exec()"
**Cause**: PHP `disable_functions` blocks `exec()`.
**Fix**: Remove `exec`, `proc_open`, `popen` from `disable_functions` in `/www/server/php/83/etc/php.ini`, restart PHP-FPM.

### "App sgds_ocr cannot be installed because appinfo file cannot be read"
**Cause**: `&` in `info.xml` name field (e.g., `OCR & Indexation`).
**Fix**: Replace `&` with `&amp;` in `apps/sgds_ocr/appinfo/info.xml`.

### "Table 'oc_sgds_dossier' doesn't exist"
**Cause**: Using QueryBuilder which adds `oc_` prefix to SGDS tables.
**Fix**: Use `$this->db->executeQuery("SELECT * FROM sgds_dossier WHERE ...")`.

### Collabora "Document loading failed due to timeout"
**Causes**: 
1. Backslash in `server_name` → CSP blocks WebSocket
2. Docker container can't resolve Nextcloud hostname → add `--add-host`
3. PHP can't reach Collabora → check `wopi_url` points to correct port

### Dashboard 500 error
**Cause**: `config_is_read_only = true` prevents OCC write operations.
**Fix**: Temporarily `chmod 644 config.php` before running OCC commands.

## Environment Details

- **Server**: Ubuntu/WSL, user `www` (uid 1001), `www-data` (uid 33)
- **Nginx**: aapanel, configs in `/www/server/panel/vhost/nginx/`
- **PHP-FPM**: 8.3, sock at `unix:/tmp/php-cgi-83.sock`
- **Docker**: v29.6.0, containers for Collabora + OnlyOffice
- **MySQL**: localhost, database `fbb_nextcloud`, user `fbb_nextcloud`
- **Domain**: `ecab.fbb.local` (resolves to 127.0.0.1)

## Common Tasks — Quick Reference

### Enable all SGDS apps
```bash
for app in sgds_metadata sgds_dossier sgds_workflow sgds_grille sgds_synthese sgds_mailgate sgds_kpi sgds_archives sgds_ocr; do
  sudo -u www php occ app:enable $app
done
```

### Create system tags
```bash
for tag in RLI DIRCOOP DCO DEP CAJ CABINET "Courrier entrant" Urgent Budget; do
  sudo -u www php occ tag:create "$tag" system
done
```

### Test Collabora connectivity
```bash
curl -s http://127.0.0.1:9981/hosting/discovery | head -5
curl -s http://ecab.fbb.local:9980/hosting/discovery | head -5
```

### Check Nextcloud logs
```bash
sudo tail -20 data/nextcloud.log | grep -o '"message":"[^"]*"'
```

### Restart after config changes
```bash
sudo -u www php occ app:disable sgds_dossier && sudo -u www php occ app:enable sgds_dossier
```
