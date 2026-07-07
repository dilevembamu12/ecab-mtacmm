# 🇨🇬 SGDS — Système de Gestion Documentaire Souverain
## Ministère des Transports, de l'Aviation Civile et de la Marine Marchande (MTACMM)

**Version :** 1.0.0 | **Date :** 2026-07-06 | **Instance :** Nextcloud v34.0.1

---

## 1. ARCHITECTURE TECHNIQUE

### 1.1 Plateforme

| Composant | Version |
|---|---|
| Nextcloud Server | 34.0.1 |
| PHP | 8.2+ (8.3 recommandé) |
| Base de données | MySQL/MariaDB (fbb_nextcloud) |
| Serveur Web | Nginx 1.24 + PHP-FPM |
| Authentification | 2FA TOTP obligatoire |

### 1.2 Applications SGDS (7 apps)

| App | Rôle | Tables DB |
|---|---|---|
| `sgds_metadata` | Métadonnées structurées (111 champs, 12 types) | 2 |
| `sgds_dossier` | Dossiers documentaires composites | 2 |
| `sgds_workflow` | Circuit de validation Pôle 5 | 1 |
| `sgds_grille` | Grille d'analyse 4 piliers | 1 |
| `sgds_synthese` | Fiches de synthèse HTML/PDF | 0 |
| `sgds_mailgate` | Capture emails IMAP | 1 |
| `sgds_kpi` | Dashboard stratégique | 0 |

### 1.3 Base de données — 7 tables

```
sgds_metadata_schema     → 111 champs de métadonnées
sgds_metadata_value      → Valeurs par fichier
sgds_dossier              → Dossiers (9 statuts)
sgds_dossier_file         → Liens fichier↔dossier (6 rôles)
sgds_workflow_log         → Historique des transitions
sgds_grille_pilier        → Évaluations 4 piliers
sgds_mailgate_config      → Configuration IMAP
```

### 1.4 API REST — 14 endpoints

| App | Endpoint | Méthode |
|---|---|---|
| dossier | `/apps/sgds_dossier/api/dossiers` | GET, POST |
| dossier | `/apps/sgds_dossier/api/dossiers/{id}` | GET |
| workflow | `/apps/sgds_workflow/api/transition` | POST |
| workflow | `/apps/sgds_workflow/api/next-states/{id}` | GET |
| grille | `/apps/sgds_grille/api/evaluate` | POST |
| grille | `/apps/sgds_grille/api/evaluations/{id}` | GET |
| grille | `/apps/sgds_grille/api/pillars` | GET |
| synthese | `/apps/sgds_synthese/api/synthese/{id}` | GET |
| mailgate | `/apps/sgds_mailgate/api/poll` | POST |
| mailgate | `/apps/sgds_mailgate/api/status` | GET |
| kpi | `/apps/sgds_kpi/api/dashboard` | GET |
| kpi | `/apps/sgds_kpi/api/overdue` | GET |
| metadata | `/apps/sgds_metadata/api/file/{id}` | GET, POST, DELETE |
| metadata | `/apps/sgds_metadata/api/schemas/{type}` | GET |

---

## 2. CIRCUIT DE VALIDATION (Machine d'état)

```
BROUILLON ──→ SOUMIS ──→ EXAMEN_FORME ──→ ANALYSE_FOND
   ↑              │              │                │
   │              │              │                ├──→ AVIS_FAVORABLE ──→ PRET_VISA ──→ VISE ──→ SIGNE
   │              │              │                │
   └──────────────┴──────────────┴────────────────┴──→ AVIS_DEFAVORABLE ──→ BROUILLON (retour)
                                                      │
                                                      └──→ REJETE (classé)
```

### Acteurs par état

| État | Responsable | Compte |
|---|---|---|
| SOUMIS | Assistante technique | `assistante.cab` |
| EXAMEN_FORME | Attaché admin/juridique | `attache.cab` |
| ANALYSE_FOND | Conseiller CAJ | `conseiller.caj` |
| AVIS_FAVORABLE/DEFAVORABLE | Conseiller CAJ (+DEP, +RLI si budgétaire) | `conseiller.caj` |
| PRET_VISA | Directeur de Cabinet | `dircab` |
| VISE | Directeur de Cabinet | `dircab` |
| SIGNE | Ministre | `ministre` |

---

## 3. GRILLE 4 PILIERS

| Pilier | Poids | Score max |
|---|---|---|
| Opportunité | 30% | 5 |
| Conformité | 30% | 5 |
| Forme | 20% | 5 |
| Fond | 20% | 5 |
| **Score pondéré** | **100%** | **/20** |

---

## 4. ADMINISTRATION

### 4.1 Commandes CLI

```bash
# Créer un dossier
sudo -u www php occ sgds:dossier-create "Titre" courrier_arrivee

# Consulter les dossiers en retard
sudo -u www php occ sgds:check-overdue

# Relever les emails
sudo -u www php occ sgds:mailgate-poll -p "motdepasse"

# Lister les apps
sudo -u www php occ app:list | grep sgds

# Initialiser les schémas
sudo -u www php occ sgds:init-schemas
```

### 4.2 Sauvegarde

```bash
# Base de données
mysqldump -u fbb_nextcloud -p fbb_nextcloud sgds_* > sgds_backup.sql

# Fichiers
rsync -avz /www/.../nextcloud/data/ backup@server:/backup/
```

### 4.3 Résolution des problèmes

| Problème | Solution |
|---|---|
| `occ` ne fonctionne pas | `sudo chown www:www config/config.php` |
| `Environment not properly prepared` | `sudo chmod 770 data/` |
| App non reconnue | `sudo chown -R www-data:www-data apps/sgds_*/` |
| Namespace error | Utiliser `OCA\AppName\` (pas `AppName\`) |

---

## 5. SÉCURITÉ

- ✅ HTTPS activé (certificat auto-signé)
- ✅ 2FA TOTP obligatoire
- ✅ Password Policy (mots de passe forts)
- ✅ CSP (Content Security Policy)
- ✅ Rate limiting
- ✅ CSRF protection
- ✅ Brute force protection
- ✅ Data directory 770
- ✅ Config file owned by www

---

## 6. DÉPENDANCES

- PHP extensions : apcu, ctype, curl, dom, fileinfo, gd, json, libxml, mbstring, openssl, pdo, posix, session, simplexml, xml, xmlreader, xmlwriter, zip, zlib, imap (mailgate)
- Symfony 6.4 (Console, Routing, Events)
- Doctrine DBAL 3
- Sabre/DAV 4
- Pimple 3 (DI Container)
