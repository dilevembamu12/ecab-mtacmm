#!/bin/bash
# ============================================
# e-Cab MTACMM — Déploiement Production
# Serveur : fiscalblackbox.com
# Cible  : /var/www/ecab/
# ============================================
set -e

GIT_REPO="git@github.com:dilevembamu12/ecab-mtacmm.git"
NC_VERSION="34.0.1"
NC_URL="https://download.nextcloud.com/server/releases/nextcloud-${NC_VERSION}.tar.bz2"
TARGET_DIR="/var/www/ecab"
DOMAIN="ecab.fiscalblackbox.com"
DB_NAME="ecab_prod"
DB_USER="ecab_user"
DB_PASS=$(openssl rand -base64 16)
ADMIN_PASS=$(openssl rand -base64 12)

echo "========================================="
echo " e-Cab MTACMM — Déploiement Production"
echo " fiscalblackbox.com"
echo "========================================="
echo ""

# ============================================
# 1. PHP 8.3
# ============================================
echo "📦 1/8 Installation PHP 8.3..."
if ! command -v php8.3 &>/dev/null; then
    sudo add-apt-repository -y ppa:ondrej/php 2>/dev/null || true
    sudo apt update -qq 2>/dev/null
    sudo apt install -y php8.3-cli php8.3-fpm php8.3-mysql php8.3-mbstring \
      php8.3-xml php8.3-zip php8.3-gd php8.3-curl php8.3-bcmath php8.3-intl 2>/dev/null || {
        echo "⚠️  PHP 8.3 non disponible via apt. Vérifiez le PPA ondrej."
        echo "   Tentative avec PHP 8.2..."
        sudo apt install -y php8.2-cli php8.2-fpm php8.2-mysql php8.2-mbstring \
          php8.2-xml php8.2-zip php8.2-gd php8.2-curl php8.2-bcmath php8.2-intl 2>/dev/null || {
            echo "❌ Aucune version PHP 8.x trouvée. Abandon."
            exit 1
        }
    }
fi
PHP_VERSION=$(php8.3 -v 2>/dev/null | head -1 || php8.2 -v 2>/dev/null | head -1)
echo "   ✅ $PHP_VERSION"

# Désactiver les fonctions dangereuses SAUF exec/proc_open
PHP_INI=$(php8.3 -i 2>/dev/null | grep "Loaded Configuration File" | awk '{print $NF}' || php8.2 -i 2>/dev/null | grep "Loaded Configuration File" | awk '{print $NF}')
if [ -f "$PHP_INI" ]; then
    sudo sed -i 's/disable_functions = .*/disable_functions = passthru,system,putenv,chroot,chgrp,chown,ini_alter,ini_restore,dl,openlog,syslog,readlink,symlink,imap_open,apache_setenv/' "$PHP_INI"
fi

# ============================================
# 2. Répertoire cible
# ============================================
echo "📁 2/8 Création répertoire..."
sudo mkdir -p "$TARGET_DIR"
sudo chown -R ubuntu:www-data "$TARGET_DIR"

# ============================================
# 3. Cloner le dépôt
# ============================================
echo "📥 3/8 Clonage du dépôt..."
cd "$TARGET_DIR"
if [ -d ".git" ]; then
    git pull origin main 2>/dev/null || true
else
    git clone "$GIT_REPO" "$TARGET_DIR" 2>/dev/null || {
        echo "⚠️  Git SSH échoué, tentative HTTPS..."
        git clone "https://github.com/dilevembamu12/ecab-mtacmm.git" "$TARGET_DIR"
    }
fi

# ============================================
# 4. Télécharger Nextcloud
# ============================================
echo "☁️  4/8 Téléchargement Nextcloud ${NC_VERSION}..."
if [ ! -f "nextcloud-${NC_VERSION}.tar.bz2" ]; then
    wget -q "$NC_URL" -O "nextcloud-${NC_VERSION}.tar.bz2"
fi
tar xfj "nextcloud-${NC_VERSION}.tar.bz2" --strip-components=1 --skip-old-files 2>/dev/null || true

# ============================================
# 5. Base de données
# ============================================
echo "🗄️  5/8 Configuration base de données..."
echo "   DB: $DB_NAME / $DB_USER / $DB_PASS"

mysql -u root -p"$MYSQL_ROOT_PASS" <<SQL 2>/dev/null || {
    echo "⚠️  MySQL root password needed. Enter it now:"
    read -s MYSQL_ROOT_PASS
    mysql -u root -p"$MYSQL_ROOT_PASS" <<SQL
CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
SQL
}

# Importer le schéma SGDS
mysql -u root -p"$MYSQL_ROOT_PASS" "$DB_NAME" < seed/sgds-schema.sql 2>/dev/null
mysql -u root -p"$MYSQL_ROOT_PASS" "$DB_NAME" < seed/sgds-data.sql 2>/dev/null

# ============================================
# 6. Configuration Nextcloud
# ============================================
echo "⚙️  6/8 Configuration Nextcloud..."
cp config/config.sample.php config/config.php
sed -i "s/'dbname' => '.*'/'dbname' => '$DB_NAME'/" config/config.php
sed -i "s/'dbuser' => '.*'/'dbuser' => '$DB_USER'/" config/config.php
sed -i "s/'dbpassword' => '.*'/'dbpassword' => '$DB_PASS'/" config/config.php
sed -i "s/'dbhost' => '.*'/'dbhost' => 'localhost'/" config/config.php
sed -i "s|'overwrite.cli.url' => '.*'|'overwrite.cli.url' => 'https://$DOMAIN'|" config/config.php
echo "'config_is_read_only' => true," >> config/config.php

# Permissions
sudo chown -R www-data:www-data "$TARGET_DIR"
sudo chmod 770 "$TARGET_DIR/data"
sudo chown www-data:www-data "$TARGET_DIR/config/config.php"
sudo chmod 444 "$TARGET_DIR/config/config.php"

# ============================================
# 7. Nginx
# ============================================
echo "🌐 7/8 Configuration Nginx..."

sudo tee /etc/nginx/sites-available/ecab <<NGINX
server {
    listen 80;
    server_name $DOMAIN;

    root $TARGET_DIR;
    index index.php index.html;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    location / {
        try_files \$uri \$uri/ /index.php\$request_uri;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
    }

    location ~ /\.(?!well-known) {
        deny all;
    }

    client_max_body_size 512M;
}
NGINX

sudo ln -sf /etc/nginx/sites-available/ecab /etc/nginx/sites-enabled/ 2>/dev/null
sudo nginx -t && sudo systemctl reload nginx

# Proxy Collabora
if [ -f "config/nginx-collabora-proxy.conf" ]; then
    sudo cp config/nginx-collabora-proxy.conf /etc/nginx/conf.d/ecab-collabora.conf
    sudo sed -i "s/ecab\.fbb\.local/$DOMAIN/g" /etc/nginx/conf.d/ecab-collabora.conf
    sudo nginx -t && sudo systemctl reload nginx
fi

# ============================================
# 8. Collabora Docker
# ============================================
echo "🐳 8/8 Déploiement Collabora Online..."
docker rm -f collabora-code 2>/dev/null || true
docker run -d --name collabora-code \
  --restart unless-stopped \
  -p 127.0.0.1:9981:9980 \
  --add-host=${DOMAIN}:172.17.0.1 \
  -e "extra_params=--o:ssl.enable=false --o:ssl.termination=false" \
  -e "domain=${DOMAIN}" \
  -e "server_name=${DOMAIN}:9980" \
  -e "username=admin" \
  -e "password=${ADMIN_PASS}" \
  collabora/code:latest

# ============================================
# Résumé
# ============================================
echo ""
echo "========================================="
echo " ✅ Déploiement terminé !"
echo "========================================="
echo ""
echo "📍 URL      : https://$DOMAIN"
echo "🗄️  DB Name  : $DB_NAME"
echo "🗄️  DB User  : $DB_USER"
echo "🗄️  DB Pass  : $DB_PASS"
echo "🔑 Admin    : $ADMIN_PASS"
echo ""
echo "📋 Post-installation :"
echo "   cd $TARGET_DIR"
echo "   sudo -u www-data php occ maintenance:install \\"
echo "     --database mysql --database-name $DB_NAME \\"
echo "     --database-user $DB_USER --database-pass '$DB_PASS' \\"
echo "     --admin-user admin --admin-pass '$ADMIN_PASS'"
echo ""
echo "   sudo -u www-data php occ app:enable sgds_dossier sgds_workflow sgds_kpi sgds_metadata sgds_grille sgds_synthese sgds_mailgate sgds_archives sgds_ocr"
echo ""
echo "   sudo -u www-data php occ config:app:set richdocuments wopi_url --value='http://127.0.0.1:9981/'"
echo "   sudo -u www-data php occ config:app:set richdocuments public_wopi_url --value='http://${DOMAIN}:9980/'"
echo "   sudo -u www-data php occ richdocuments:setup"
echo ""
echo "   bash seed/setup.sh"
echo "========================================="
