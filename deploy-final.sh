#!/bin/bash
# e-Cab MTACMM — Production Deployment Script
# Server: fiscalblackbox.com

set -e
echo "========================================="
echo " e-Cab MTACMM — Déploiement Production"
echo " $(date)"
echo "========================================="

TARGET=/var/www/ecab
DOMAIN=fiscalblackbox.com
DB_NAME=ecab_prod
DB_USER=ecab_user
DB_PASS=$(openssl rand -base64 12 | tr -d '/+='  | head -c 16)
ADMIN_PASS=$(openssl rand -base64 12 | tr -d '/+='  | head -c 12)

# === 1. Répertoire ===
echo "📁 1/7 Préparation répertoire..."
sudo mkdir -p $TARGET
sudo chown ubuntu:www-data $TARGET
cd $TARGET

# === 2. Git clone ===
echo "📥 2/7 Code source..."
if [ -d .git ]; then git pull origin main; else git clone https://github.com/dilevembamu12/ecab-mtacmm.git . ; fi

# === 3. Nextcloud ===
echo "☁️ 3/7 Nextcloud 34.0.1..."
if [ ! -f nextcloud-34.0.1.tar.bz2 ]; then
  wget -q https://download.nextcloud.com/server/releases/nextcloud-34.0.1.tar.bz2
fi
tar xfj nextcloud-34.0.1.tar.bz2 --strip-components=1 --skip-old-files 2>/dev/null || true
rm -f nextcloud-34.0.1.tar.bz2

# === 4. MySQL (find socket or use TCP) ===
echo "🗄️ 4/7 Base de données..."
# Try socket first, then TCP
mysql -u root -e "SELECT 1" 2>/dev/null || mysql -u root -h 127.0.0.1 -e "SELECT 1" 2>/dev/null || {
  # Try via socat proxy
  mysql -u root -h 127.0.0.1 -P 3306 -e "SELECT 1" 2>/dev/null || {
    echo "⚠️  MySQL introuvable — skip DB setup"
  }
}

MYSQL_CMD="mysql -u root"
$MYSQL_CMD -e "SELECT 1" 2>/dev/null && {
  echo "   ✅ MySQL OK"
  $MYSQL_CMD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
  $MYSQL_CMD -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS'"
  $MYSQL_CMD -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost'; FLUSH PRIVILEGES"
  $MYSQL_CMD $DB_NAME < seed/sgds-schema.sql 2>/dev/null || echo "   ⚠️ schema import skipped"
  $MYSQL_CMD $DB_NAME < seed/sgds-data.sql 2>/dev/null || echo "   ⚠️ data import skipped"
} || echo "   ⚠️ MySQL not accessible, skipping DB"

# === 5. Config ===
echo "⚙️ 5/7 Configuration..."
cp -n config/config.sample.php config/config.php 2>/dev/null || true
sudo sed -i "s|'dbname' => '.*'|'dbname' => '$DB_NAME'|" config/config.php
sudo sed -i "s|'dbuser' => '.*'|'dbuser' => '$DB_USER'|" config/config.php
sudo sed -i "s|'dbpassword' => '.*'|'dbpassword' => '$DB_PASS'|" config/config.php
sudo sed -i "s|'dbhost' => '.*'|'dbhost' => 'localhost'|" config/config.php
echo "'config_is_read_only' => true," | sudo tee -a config/config.php
sudo chown www-data:www-data config/config.php
sudo chmod 444 config/config.php

# === 6. Nginx ===
echo "🌐 6/7 Nginx..."
sudo tee /www/server/panel/vhost/nginx/ecab.conf <<NGINX
server {
    listen 80;
    server_name $DOMAIN;
    root $TARGET;
    index index.php;
    client_max_body_size 512M;
    location / { try_files \$uri \$uri/ /index.php\$request_uri; }
    location ~ \.php\$ {
        include enable-php-83.conf;
        fastcgi_pass 127.0.0.1:9000;
    }
    location ~ /\. { deny all; }
}
NGINX
sudo nginx -t && sudo nginx -s reload

# === 7. Permissions ===
echo "🔐 7/7 Permissions..."
sudo chown -R www-data:www-data $TARGET
sudo chmod 770 $TARGET/data 2>/dev/null || mkdir -p $TARGET/data && sudo chmod 770 $TARGET/data

# === Résumé ===
echo ""
echo "========================================="
echo " ✅ Déploiement terminé"
echo "========================================="
echo "📍 URL     : http://$DOMAIN"
echo "🗄️  DB      : $DB_NAME / $DB_USER / $DB_PASS"
echo "🔑 Admin   : $ADMIN_PASS"
echo ""
echo "📋 Post-installation (à faire manuellement) :"
echo "   cd $TARGET"
echo "   sudo -u www-data php occ maintenance:install --database mysql --database-name $DB_NAME --database-user $DB_USER --database-pass '$DB_PASS' --admin-user admin --admin-pass '$ADMIN_PASS'"
echo "========================================="
