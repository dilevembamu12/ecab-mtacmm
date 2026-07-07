# 🇨🇬 SGDS — Déploiement Multi-Ministères
## Guide de configuration pour réplication

### Architecture recommandée

```
                    ┌─────────────────┐
                    │  Nextcloud Hub   │  ← Instance centrale (MTACMM)
                    │  (ecab.fbb.local)│
                    └───────┬─────────┘
                            │ Federation (OCM)
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │  Ministère A │ │  Ministère B │ │  Ministère C │
    │  Instance NC │ │  Instance NC │ │  Instance NC │
    └──────────────┘ └──────────────┘ └──────────────┘
```

### Configuration par ministère

Pour déployer un nouveau ministère :

```bash
# 1. Cloner l'instance Nextcloud
rsync -avz /www/.../nextcloud/ new-server:/www/.../nextcloud/

# 2. Copier les apps SGDS
scp -r apps/sgds_* new-server:/www/.../nextcloud/apps/

# 3. Créer la nouvelle DB
mysql -e "CREATE DATABASE mtacmm_${MINISTRY}; GRANT ALL ON mtacmm_${MINISTRY}.* TO 'nextcloud'@'localhost';"

# 4. Configurer config.php
#   - Changer 'instanceid'
#   - Changer 'dbname'
#   - Changer 'trusted_domains'

# 5. Activer les apps
sudo -u www php occ app:enable sgds_dossier sgds_workflow sgds_grille sgds_kpi sgds_metadata sgds_archives sgds_ocr

# 6. Créer les utilisateurs
sudo -u www php occ user:add --password-from-env assistante.cab
sudo -u www php occ user:add --password-from-env attache.cab
# ... etc.

# 7. Activer la fédération
sudo -u www php occ app:enable federation federatedfilesharing
```

### Circles inter-ministériels

```bash
# Créer un circle partagé entre ministères
sudo -u www php occ circles:manage:create ${SINGLE_ID} "Coordination Inter-Ministérielle"

# Ajouter des membres distants
sudo -u www php occ circles:members:add ${CIRCLE_ID} ${REMOTE_SINGLE_ID} --type=single
```

### Structure recommandée des dossiers

```
Ministère/
├── Cabinet/
│   ├── Courriers_Arrivee/
│   ├── Courriers_Depart/
│   ├── Arretes/
│   ├── Decisions/
│   └── Notes_Techniques/
├── DEP/
├── RLI/
├── DIRCOOP/
└── DCO/
```
