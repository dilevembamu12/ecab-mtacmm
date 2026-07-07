# 🇨🇬 SGDS — Guide Utilisateur Pôle 5
## Ministère des Transports, de l'Aviation Civile et de la Marine Marchande

---

## 🔐 PREMIÈRE CONNEXION

### Étape 1 : Accéder à la plateforme
```
URL : https://ecab.fbb.local
```

### Étape 2 : Saisir vos identifiants
| Vous êtes | Identifiant | Mot de passe initial |
|---|---|---|
| Assistante technique | `assistante.cab` | CongoMTACMM-2026-Secure! |
| Attaché admin/juridique | `attache.cab` | CongoMTACMM-2026-Secure! |
| Conseiller CAJ | `conseiller.caj` | CongoMTACMM-2026-Secure! |
| DEP | `dep.cab` | CongoMTACMM-2026-Secure! |
| RLI | `rli.cab` | CongoMTACMM-2026-Secure! |
| DIRCOOP | `dircoop.cab` | CongoMTACMM-2026-Secure! |
| DCO | `dco.cab` | CongoMTACMM-2026-Secure! |
| Directeur de Cabinet | `dircab` | CongoMTACMM-2026-Secure! |
| Ministre | `ministre` | CongoMTACMM-2026-Secure! |

### Étape 3 : Configurer la 2FA
1. Installer **Google Authenticator** (ou FreeOTP, Authy) sur votre téléphone
2. Scanner le QR code affiché à l'écran
3. Saisir le code à 6 chiffres pour confirmer

### Étape 4 : Changer votre mot de passe
```
Menu (icône en haut à droite) → Paramètres personnels → Sécurité
→ Changer le mot de passe
```
⚠️ **IMPORTANT : Changez votre mot de passe immédiatement !**

---

## 📋 VOTRE RÔLE DANS LE CIRCUIT

### 👩‍💼 Assistante technique (`assistante.cab`)
**Étape : Réception & Filtrage**

1. Le document arrive (email, dépôt physique, guichet)
2. **Créer un dossier** dans SGDS :
   - Titre : objet du document
   - Type : courrier_arrivee, arrete, rapport, etc.
   - Ajouter les pièces jointes numérisées
3. **Vérifier la complétude** :
   - Document principal présent ?
   - Annexes mentionnées présentes ?
   - Consultations transversales faites ?
4. **Transmettre** → Statut : SOUMIS → assigné à `attache.cab`

### ⚖️ Attaché admin/juridique (`attache.cab`)
**Étape : Examen de Forme**

1. Ouvrir le dossier dans SGDS
2. Vérifier :
   - ✅ Structure du document conforme au protocole
   - ✅ Orthographe et grammaire
   - ✅ Références légales citées
   - ✅ Formatage standard
3. **Rédiger un commentaire** avec votre avis
4. **Transmettre** :
   - Si OK → ANALYSE_FOND
   - Si non conforme → REJETE (retour à l'assistante)

### 🎓 Conseiller CAJ (`conseiller.caj`)
**Étape : Analyse de Fond & Opportunité**

1. Ouvrir le dossier et les commentaires précédents
2. **Remplir la GRILLE 4 PILIERS** (obligatoire) :

| Pilier | Question | Note (0-5) |
|---|---|---|
| **Opportunité** | Le document est-il pertinent/urgent ? | ___/5 |
| **Conformité** | Respecte-t-il les textes légaux ? | ___/5 |
| **Forme** | Rédaction, structure, protocole ? | ___/5 |
| **Fond** | Exactitude technique, cohérence ? | ___/5 |

3. **Commentaire obligatoire** pour chaque pilier
4. **Si impact budgétaire** → Notifier `dep.cab` et `rli.cab`
5. **Émettre l'avis** :
   - Score ≥ 12/20 → AVIS_FAVORABLE
   - Score < 12/20 → AVIS_DEFAVORABLE (retour)

### 📊 DEP / RLI (`dep.cab`, `rli.cab`)
**Rôle : Surveillance budgétaire transversale**

- Intervenir sur les dossiers à impact budgétaire
- Vérifier l'alignement avec le budget
- Identifier les coûts cachés
- Ajouter un commentaire d'analyse financière

### 👔 Directeur de Cabinet (`dircab`)
**Étape : Visa**

1. Consulter le dossier complet :
   - Document principal
   - Tous les commentaires
   - Grille 4 piliers
   - **Fiche de synthèse** (générée automatiquement)
2. Décider :
   - ✅ **Viser** → VISE → transmis au Ministre
   - ❌ **Rejeter** → REJETE (retour)

### 🏛️ Ministre (`ministre`)
**Étape : Signature**

1. Consulter le dossier complet + fiche de synthèse
2. Décision finale :
   - ✅ **Signer** → SIGNE (le document physique est imprimé pour signature)
   - ❌ **Rejeter** → REJETE

---

## 🖥️ UTILISATION QUOTIDIENNE

### Créer un dossier
```
1. Ouvrir l'app « SGDS Dossiers »
2. Cliquer « Nouveau dossier »
3. Remplir : Titre, Type de document, Description
4. Ajouter les fichiers (glisser-déposer)
5. Cliquer « Créer »
```

### Faire avancer un dossier
```
1. Ouvrir le dossier
2. Cliquer « Actions » → « Transmettre »
3. Sélectionner le prochain statut
4. Ajouter un commentaire (obligatoire)
5. Si analyse de fond : remplir la grille 4 piliers
6. Confirmer
```

### Consulter le tableau de bord
```
1. Tableau de bord (icône maison 🏠)
2. Widget « SGDS KPIs » :
   - Dossiers par statut
   - Dossiers en retard (>7 jours)
   - Taux d'approbation
   - Charge par agent
```

### Rechercher un dossier
```
Barre de recherche en haut → Saisir le titre ou N° enregistrement
```

---

## 📱 ASTUCES

| Conseil | Pourquoi |
|---|---|
| **Commenter chaque action** | Traçabilité complète pour l'audit |
| **Ne pas supprimer les anciennes versions** | Historique préservé |
| **Vérifier vos notifications** 🔔 | Ne manquez aucun dossier assigné |
| **Utiliser les tags** | Pour classer : « Urgent », « Confidentiel » |
| **Se déconnecter** après usage | Sécurité sur poste partagé |

---

## ⚠️ RÈGLES D'OR

1. **Zéro Papier en phase de traitement** — Le papier n'intervient qu'au Visa et à la Signature
2. **Toujours motiver son avis par écrit** — Pas de validation sans commentaire
3. **Respecter le circuit** — Ne pas court-circuiter une étape
4. **Confidentialité** — Ne pas partager les documents en dehors du Pôle 5
5. **Délai de traitement** — Viser < 48h par étape

---

## 🆘 SUPPORT

En cas de problème :
1. Vérifier votre connexion internet
2. Vider le cache du navigateur (Ctrl+Shift+Del)
3. Contacter l'administrateur : `fbb`
