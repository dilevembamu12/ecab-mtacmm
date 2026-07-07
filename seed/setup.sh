#!/bin/bash
# ============================================
# e-Cab MTACMM — Script de Seed (Données de démo)
# République du Congo — Ministère des Transports
# ============================================
#
# Ce script recrée l'environnement de démonstration :
#   - Tables SGDS (structure + données)
#   - Utilisateurs Pôle 5
#   - Circle hiérarchique
#   - Tags système
#
# Usage :
#   bash seed/setup.sh
#
# Prérequis :
#   - Nextcloud installé
#   - occ accessible (sudo -u www php occ)
# ============================================

set -e
NEXTCLOUD_DIR="/www/wwwroot/EXTERNE/FBB/MINISTERE-PROJET-ZERO-PAPIER/app_developpement/others_app_for_inspiration/nextcloud"
OCC="sudo -u www php $NEXTCLOUD_DIR/occ"
DB_NAME="fbb_nextcloud"
DB_USER="fbb_nextcloud"
DB_PASS="fbb_nextcloud"

echo "🚀 e-Cab MTACMM — Seed de démonstration"
echo "========================================"
echo ""

# ============================================
# 1. Importer les données SGDS
# ============================================
echo "📦 1/5 Import des données SGDS..."
mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < seed/sgds-data.sql 2>/dev/null
echo "   ✅ Tables: sgds_dossier, sgds_workflow_log, sgds_metadata_schema..."
echo ""

# ============================================
# 2. Créer les utilisateurs Pôle 5
# ============================================
echo "👥 2/5 Création des utilisateurs Pôle 5..."

PASSWORD="CongoMTACMM-2026-Secure!"

create_user() {
    local uid=$1 name=$2 email=$3
    if $OCC user:info "$uid" 2>/dev/null | grep -q "user_id"; then
        echo "   ⏭️  $uid existe déjà"
    else
        OC_PASS="$PASSWORD" $OCC user:add "$uid" --password-from-env --display-name="$name" --email="$email" 2>/dev/null
        echo "   ✅ $uid ($name)"
    fi
}

create_user "ministre"       "Ministre"                "ministre@mtacmm.gouv.cg"
create_user "dircab"         "Directeur de Cabinet"    "dircab@mtacmm.gouv.cg"
create_user "conseiller.caj" "Conseiller CAJ"          "caj@mtacmm.gouv.cg"
create_user "assistante.cab" "Assistante Cabinet"      "assistante@mtacmm.gouv.cg"
create_user "attache.cab"    "Attaché Cabinet"         "attache@mtacmm.gouv.cg"
create_user "dep.cab"        "DEP Cabinet"             "dep@mtacmm.gouv.cg"
create_user "rli.cab"        "RLI Cabinet"             "rli@mtacmm.gouv.cg"
create_user "dircoop.cab"    "DIRCOOP Cabinet"         "dircoop@mtacmm.gouv.cg"
create_user "dco.cab"        "DCO Cabinet"             "dco@mtacmm.gouv.cg"
create_user "fbb"            "Administrateur SI"       "admin@mtacmm.gouv.cg"
echo ""

# ============================================
# 3. Créer le Circle Pôle 5
# ============================================
echo "🔄 3/5 Création du Circle Pôle 5..."

CIRCLE_NAME="Pole 5 - Validation Documentaire"

# Vérifier si le circle existe déjà
if $OCC circles:list 2>/dev/null | grep -q "$CIRCLE_NAME"; then
    echo "   ⏭️  Circle existe déjà"
else
    $OCC circles:create "$CIRCLE_NAME" --owner dircab --type closed 2>/dev/null || true
    echo "   ✅ Circle créé: $CIRCLE_NAME"
fi

# Ajouter les membres (best effort, ignore si déjà membres)
$OCC circles:add "$CIRCLE_NAME" ministre       --role admin  2>/dev/null || true
$OCC circles:add "$CIRCLE_NAME" conseiller.caj --role moderator 2>/dev/null || true
$OCC circles:add "$CIRCLE_NAME" assistante.cab --role member 2>/dev/null || true
$OCC circles:add "$CIRCLE_NAME" attache.cab    --role member 2>/dev/null || true
$OCC circles:add "$CIRCLE_NAME" dep.cab        --role member 2>/dev/null || true
$OCC circles:add "$CIRCLE_NAME" rli.cab        --role member 2>/dev/null || true
$OCC circles:add "$CIRCLE_NAME" dircoop.cab    --role member 2>/dev/null || true
$OCC circles:add "$CIRCLE_NAME" dco.cab        --role member 2>/dev/null || true
$OCC circles:add "$CIRCLE_NAME" fbb            --role member 2>/dev/null || true
echo "   ✅ 10 membres ajoutés"
echo ""

# ============================================
# 4. Créer les tags système
# ============================================
echo "🏷️  4/5 Création des tags système..."

TAGS=("RLI" "DIRCOOP" "DCO" "DEP" "CAJ" "CABINET" "Courrier entrant" "Courrier sortant" "Tableau" "Document texte" "PDF" "Urgent" "Brouillon" "Archives" "SIGNE" "Confidentiel" "Secret" "Budget" "Marché public" "Ressources humaines")

for TAG in "${TAGS[@]}"; do
    $OCC tag:create "$TAG" system 2>/dev/null && echo "   ✅ $TAG" || echo "   ⏭️  $TAG (existe)"
done
echo ""

# ============================================
# 5. Activer les apps SGDS
# ============================================
echo "📱 5/5 Activation des apps SGDS..."

APPS=("sgds_metadata" "sgds_dossier" "sgds_workflow" "sgds_grille" "sgds_synthese" "sgds_mailgate" "sgds_kpi" "sgds_archives" "sgds_ocr")

for APP in "${APPS[@]}"; do
    $OCC app:enable "$APP" 2>/dev/null && echo "   ✅ $APP" || echo "   ⏭️  $APP (déjà actif)"
done

echo ""
echo "========================================"
echo "✅ Seed terminé !"
echo ""
echo "🔑 Connexion :"
echo "   URL    : http://ecab.fbb.local"
echo "   Admin  : fbb / $PASSWORD"
echo "   Ministre: ministre / $PASSWORD"
echo "========================================"
