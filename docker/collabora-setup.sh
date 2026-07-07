#!/bin/bash
# ============================================
# e-Cab MTACMM — Déploiement Collabora Online
# ============================================

DOMAIN="${1:-ecab.fbb.local}"
PASSWORD="${2:-ChangeMe2026!}"

echo "🚀 Déploiement Collabora Online pour e-Cab MTACMM"
echo "   Domaine : $DOMAIN"
echo ""

# Arrêter l'ancien conteneur s'il existe
docker rm -f collabora-code 2>/dev/null

# Démarrer Collabora CODE
docker run -d --name collabora-code \
  --restart unless-stopped \
  -p 127.0.0.1:9981:9980 \
  --add-host=${DOMAIN}:172.17.0.1 \
  -e "extra_params=--o:ssl.enable=false --o:ssl.termination=false" \
  -e "domain=${DOMAIN}" \
  -e "server_name=${DOMAIN}:9980" \
  -e "username=admin" \
  -e "password=${PASSWORD}" \
  collabora/code:latest

echo "⏳ Attente du démarrage..."
sleep 15

# Vérifier que Collabora répond
if curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:9981/hosting/discovery | grep -q 200; then
    echo "✅ Collabora Online est prêt !"
    echo ""
    echo "📋 Étapes suivantes :"
    echo "1. Configurer le proxy Nginx (config/nginx-collabora-proxy.conf)"
    echo "2. Dans Nextcloud : occ config:app:set richdocuments wopi_url --value=\"http://127.0.0.1:9981/\""
    echo "3. Dans Nextcloud : occ config:app:set richdocuments public_wopi_url --value=\"http://${DOMAIN}:9980/\""
    echo "4. Dans Nextcloud : occ richdocuments:setup"
else
    echo "❌ Échec : Collabora ne répond pas. Vérifiez les logs :"
    echo "   docker logs collabora-code"
fi
