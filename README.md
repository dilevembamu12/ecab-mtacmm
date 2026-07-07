# e-Cab MTACMM — Système de Gestion Documentaire Souverain

**Ministère des Transports, de l'Aviation Civile et de la Marine Marchande**
**République du Congo**

> 🇨🇬 Projet Zéro Papier — Dématérialisation complète du circuit administratif du Cabinet

---

## 📋 Circuit complet

```
📨 Courrier entrant
  → Scan OCR (Tesseract) → Extraction métadonnées
  → Création automatique dossier BROUILLON
  → Tag automatique (RLI / DIRCOOP / DCO / DEP / CAJ)
  → Workflow Pôle 5 (8 étapes)
  → Édition collaborative (Collabora Online)
  → Signature numérique (LibreSign)
  → Archivage SHA-256 (scellement probant)
  → Conservation permanente
```

---

## 🏗️ Stack

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Base | Nextcloud | 34.0.1 |
| PHP | FPM | 8.3 |
| DB | MySQL / MariaDB | — |
| Web | Nginx | 1.24 |
| Édition | Collabora Online (Docker) | 26.04.2.1 |
| OCR | Tesseract + poppler-utils | 5.3.4 |
| Signature | LibreSign | 14.0.2 |

---

## 📦 Apps SGDS (9 apps sur mesure)

| App | Rôle | Fichiers | Tables DB |
|-----|------|----------|-----------|
| `sgds_metadata` | Métadonnées (111 champs, 12 types) | 13 | 2 |
| `sgds_dossier` | Dossier composite + widgets | 14 | 2 |
| `sgds_workflow` | Circuit validation 8 étapes | 10 | 1 |
| `sgds_grille` | Évaluation 4 piliers (/20) | 5 | 1 |
| `sgds_synthese` | Synthèse HTML/PDF | 4 | — |
| `sgds_mailgate` | Passerelle IMAP | 5 | 1 |
| `sgds_kpi` | KPIs + Thème Congo 🇨🇬 | 7 | — |
| `sgds_archives` | Archivage SHA-256 | 5 | 2 |
| `sgds_ocr` | OCR + création auto dossier | 5 | 1 |

---

## 🚀 Installation

```bash
# 1. Cloner
git clone git@github.com:dilevembamu12/ecab-mtacmm.git /www/wwwroot/ecab/
cd /www/wwwroot/ecab/

# 2. Prérequis
apt install php8.3 php8.3-fpm php8.3-mysql php8.3-mbstring php8.3-xml php8.3-zip php8.3-gd php8.3-curl tesseract-ocr tesseract-ocr-fra poppler-utils docker.io

# 3. Configurer
cp config/config.sample.php config/config.php
nano config/config.php  # Éditer identifiants DB

# 4. Permissions
chown -R www-data:www-data . && chmod 770 data/

# 5. Installer Nextcloud 34.0.1
wget https://download.nextcloud.com/server/releases/nextcloud-34.0.1.tar.bz2
tar xfj nextcloud-34.0.1.tar.bz2 --strip-components=1
sudo -u www php occ maintenance:install --database mysql --database-name fbb_nextcloud --database-user root --database-pass VOTRE_MDP --admin-user admin --admin-pass VOTRE_MDP

# 6. Importer SGDS
mysql -u root -p fbb_nextcloud < seed/sgds-schema.sql
mysql -u root -p fbb_nextcloud < seed/sgds-data.sql    # Optionnel: données démo
bash seed/setup.sh                                      # Users + circles + tags + apps

# 7. Collabora
bash docker/collabora-setup.sh ecab.fbb.local
sudo -u www php occ app:enable richdocuments
sudo -u www php occ config:app:set richdocuments wopi_url --value="http://127.0.0.1:9981/"
sudo -u www php occ config:app:set richdocuments public_wopi_url --value="http://ecab.fbb.local:9980/"
sudo -u www php occ richdocuments:setup

# 8. Proxy Nginx
cp config/nginx-collabora-proxy.conf /etc/nginx/conf.d/collabora.conf
nginx -t && nginx -s reload
```

---

## 👥 Utilisateurs démo

| Login | Rôle | Circle Pôle 5 |
|-------|------|---------------|
| `ministre` | Ministre | Admin |
| `dircab` | Directeur de Cabinet | Owner |
| `conseiller.caj` | Conseiller CAJ | Moderator |
| `assistante.cab`, `attache.cab`, `dep.cab`, `rli.cab`, `dircoop.cab`, `dco.cab` | Agents | Member |
| `fbb` | Administrateur SI | Member |

> 🔑 Tous : `CongoMTACMM-2026-Secure!`

---

## 🔧 Commandes OCC

```bash
sudo -u www php occ [commande]   # ⚠️ Toujours avec www, pas www-data

sudo -u www php occ app:list
sudo -u www php occ app:enable sgds_dossier
sudo -u www php occ tag:create "RLI" system
sudo -u www php occ richdocuments:setup
sudo -u www php occ user:add --display-name="Nom" login
```

---

## ⚠️ Points critiques

1. **`occ` = `sudo -u www`** (pas `www-data`)
2. **`config.php`** → `chmod 444` root:root après modif
3. **`data/`** → `chmod 770`
4. **PHP `disable_functions`** → `exec`, `proc_open`, `popen` doivent être **autorisés**
5. **Collabora `server_name`** → sans backslash (`ecab.fbb.local`, pas `ecab\.fbb\.local`)
6. **Tables SGDS** → pas de préfixe `oc_`, nom brut (`sgds_dossier`)

---

## 📄 Licence

AGPL-3.0 — République du Congo / MTACMM — Pôle 5
