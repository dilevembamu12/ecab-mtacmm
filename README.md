# e-Cab MTACMM — Système de Gestion Documentaire Souverain

**Ministère des Transports, de l'Aviation Civile et de la Marine Marchande**
**République du Congo**

---

## 📋 Présentation

e-Cab MTACMM est le système de gestion électronique du Cabinet du Ministère. 
Il remplace le circuit papier traditionnel par un workflow numérique complet :

```
📨 Courrier entrant → Scan OCR → Dossier BROUILLON
  → Workflow Pôle 5 → Édition Collabora → Signature numérique
  → Archivage SHA-256 → Conservation permanente
```

## 🏗️ Stack technique

| Composant | Technologie |
|-----------|-------------|
| Base | Nextcloud 34.0.1 |
| PHP | 8.3 (FPM) |
| Base de données | MySQL/MariaDB |
| Serveur web | Nginx 1.24 |
| Édition collaborative | Collabora Online (Docker) |
| OCR | Tesseract 5.3 + poppler-utils |
| Signature | LibreSign 14.0 (certificats numériques) |

## 📦 Applications SGDS (9 apps)

| App | Rôle | Version |
|-----|------|---------|
| `sgds_metadata` | Schéma de métadonnées (111 champs, 12 types) | 1.0.0 |
| `sgds_dossier` | Conteneur de dossier composite | 1.0.0 |
| `sgds_workflow` | Machine d'état (8 transitions) | 1.0.0 |
| `sgds_grille` | Grille d'évaluation 4 piliers | 1.0.0 |
| `sgds_synthese` | Génération synthèse HTML/PDF | 1.0.0 |
| `sgds_mailgate` | Passerelle IMAP (courriel → dossier) | 1.0.0 |
| `sgds_kpi` | Tableau de bord stratégique + thème | 1.0.2 |
| `sgds_archives` | Archivage SHA-256 + gel | 1.0.0 |
| `sgds_ocr` | OCR Tesseract + indexation auto | 1.0.0 |

## 🚀 Installation rapide

### Prérequis
- Ubuntu 24.04 / Debian 12
- PHP 8.2-8.5 + extensions : `mysql mbstring xml zip gd curl imagick`
- MySQL/MariaDB
- Nginx
- Docker (pour Collabora)
- Tesseract OCR : `apt install tesseract-ocr tesseract-ocr-fra poppler-utils`

### Déploiement

```bash
# 1. Cloner
git clone <repo-url> /www/wwwroot/ecab/
cd /www/wwwroot/ecab/

# 2. Configurer
cp config/config.sample.php config/config.php
# Éditer config/config.php avec vos identifiants DB

# 3. Permissions
chown -R www-data:www-data .
chmod 770 data/
chmod 444 config/config.php

# 4. Installer Nextcloud
sudo -u www php occ maintenance:install \
  --database mysql --database-name ecab \
  --database-user root --database-pass <password> \
  --admin-user admin --admin-pass <password>

# 5. Activer les apps SGDS
sudo -u www php occ app:enable sgds_metadata
sudo -u www php occ app:enable sgds_dossier
sudo -u www php occ app:enable sgds_workflow
sudo -u www php occ app:enable sgds_grille
sudo -u www php occ app:enable sgds_synthese
sudo -u www php occ app:enable sgds_mailgate
sudo -u www php occ app:enable sgds_kpi
sudo -u www php occ app:enable sgds_archives
sudo -u www php occ app:enable sgds_ocr

# 6. Déployer Collabora
docker run -d --name collabora-code \
  --restart unless-stopped \
  -p 127.0.0.1:9981:9980 \
  --add-host=ecab.fbb.local:172.17.0.1 \
  -e "extra_params=--o:ssl.enable=false --o:ssl.termination=false" \
  -e "domain=votre-domaine.local" \
  -e "server_name=votre-domaine.local:9980" \
  collabora/code:latest

# 7. Configurer Collabora dans Nextcloud
sudo -u www php occ app:enable richdocuments
sudo -u www php occ config:app:set richdocuments wopi_url --value="http://127.0.0.1:9981/"
sudo -u www php occ config:app:set richdocuments public_wopi_url --value="http://votre-domaine.local:9980/"
sudo -u www php occ richdocuments:setup

# 8. Configurer le proxy Nginx (port 9980 → Collabora)
# Voir config/nginx-collabora-proxy.conf
```

## 📂 Structure du dépôt

```
├── apps/
│   ├── sgds_archives/    # Archivage légal
│   ├── sgds_dossier/     # Gestion des dossiers
│   ├── sgds_grille/      # Grille d'évaluation
│   ├── sgds_kpi/         # KPIs + Thème institutionnel
│   ├── sgds_mailgate/    # Passerelle email
│   ├── sgds_metadata/    # Métadonnées
│   ├── sgds_ocr/         # OCR & Indexation
│   ├── sgds_synthese/    # Synthèse PDF
│   └── sgds_workflow/    # Circuit de validation
├── config/
│   ├── config.sample.php
│   └── nginx-collabora-proxy.conf
├── docker/
│   └── collabora-setup.sh
├── docs/
│   └── architecture.md
├── .gitignore
└── README.md
```

## 🔐 Sécurité

- Double authentification (TOTP) activée
- Chiffrement au repos disponible (encryption)
- Détection de connexions suspectes (suspicious_login)
- Marquage confidentiel (files_confidential)
- Configuration verrouillée en production (`config_is_read_only=true`)

## 📄 Licence

AGPL-3.0 — République du Congo / MTACMM
