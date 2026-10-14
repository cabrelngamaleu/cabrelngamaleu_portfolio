# 🚀 Déploiement sur Vercel - Guide Complet

## ✅ Tout est GRATUIT

- **Vercel** : Gratuit (déploiements illimités)
- **MongoDB Atlas** : Gratuit (512 MB)
- **Cloudinary** : Gratuit (25 GB/mois)
- **Email Gmail** : Gratuit (si tu as déjà Gmail)

---

## 📋 Ton Projet Vercel Existant

Tu as déjà un projet Vercel connecté à ton GitHub :

- **URL** : https://cabrelngamaleu-portfolio.vercel.app/
- **Repo** : https://github.com/cabrelngamaleu/cabrelngamaleu_portfolio

✨ **Bonne nouvelle** : Il va se mettre à jour automatiquement quand tu pushes !

---

## 🎯 Configuration Étape par Étape

### Étape 1 : Configurer MongoDB Atlas (Gratuit)

1. Va sur https://www.mongodb.com/cloud/atlas/register
2. Créer un compte (Google ou email)
3. Créer un cluster :
   - Choisis **FREE M0** (512 MB gratuit)
   - Choisis une région proche (ex: Paris ou Francfort)
   - Nomme ton cluster : `PortfolioCluster`

4. Créer un utilisateur de base de données :
   - Onglet "Database Access"
   - "Add New Database User"
   - Username : `cabrel`
   - Password : Génère un mot de passe fort (copie-le !)
   - Permissions : "Atlas admin"

5. Autoriser l'accès réseau :
   - Onglet "Network Access"
   - "Add IP Address"
   - Clique "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirme

6. Obtenir la connection string :
   - Onglet "Database"
   - Clique "Connect" sur ton cluster
   - Choisis "Connect your application"
   - Copie la string (ressemble à ça) :
   ```
   mongodb+srv://cabrel:<password>@portfoliocluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Remplace `<password>` par ton vrai mot de passe

### Étape 2 : Configurer Cloudinary (Gratuit)

1. Va sur https://cloudinary.com/users/register/free
2. Créer un compte
3. Une fois connecté, va sur le Dashboard
4. Tu verras ces informations :
   - **Cloud Name** : `dxxxxxxxxx`
   - **API Key** : `123456789012345`
   - **API Secret** : `xxxx-xxxxxxxxxxxxxx`

5. Copie ces 3 valeurs (tu en auras besoin)

### Étape 3 : Configurer Gmail pour les Emails (Gratuit)

1. Va sur ton compte Google : https://myaccount.google.com/
2. Active la validation en 2 étapes si ce n'est pas déjà fait
3. Va sur https://myaccount.google.com/apppasswords
4. Créer un mot de passe d'application :
   - App : "Mail"
   - Appareil : "Ordinateur Windows"
   - Clique "Générer"
   - Copie le mot de passe de 16 caractères (ex: `abcd efgh ijkl mnop`)

### Étape 4 : Générer JWT Secret

Ouvre PowerShell ou CMD et exécute :

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copie la longue chaîne générée (ex: `a7f8e9d6c5b4a3f2e1d0c9b8a7f6e5d4...`)

### Étape 5 : Configurer Vercel

1. Va sur https://vercel.com/dashboard
2. Clique sur ton projet : `cabrelngamaleu-portfolio`
3. Va dans **Settings** → **Environment Variables**
4. Ajoute TOUTES ces variables (clique "Add" pour chacune) :

#### Variables d'Environnement :

| Name                    | Value                                                                                                            | Environment |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------- |
| `NODE_ENV`              | `production`                                                                                                     | Production  |
| `MONGODB_URI`           | `mongodb+srv://cabrel:TON_MOT_DE_PASSE@portfoliocluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority` | Production  |
| `JWT_SECRET`            | La clé que tu as générée avec Node                                                                               | Production  |
| `JWT_EXPIRE`            | `24h`                                                                                                            | Production  |
| `CLOUDINARY_CLOUD_NAME` | Ton Cloud Name de Cloudinary                                                                                     | Production  |
| `CLOUDINARY_API_KEY`    | Ton API Key de Cloudinary                                                                                        | Production  |
| `CLOUDINARY_API_SECRET` | Ton API Secret de Cloudinary                                                                                     | Production  |
| `EMAIL_HOST`            | `smtp.gmail.com`                                                                                                 | Production  |
| `EMAIL_PORT`            | `587`                                                                                                            | Production  |
| `EMAIL_USER`            | `ton_email@gmail.com`                                                                                            | Production  |
| `EMAIL_PASS`            | Le mot de passe d'application de 16 caractères                                                                   | Production  |
| `EMAIL_FROM`            | `noreply@cabrelngamaleu.com`                                                                                     | Production  |
| `ADMIN_EMAIL`           | `ton_email@gmail.com`                                                                                            | Production  |
| `FRONTEND_URL`          | `https://cabrelngamaleu-portfolio.vercel.app`                                                                    | Production  |
| `REACT_APP_API_URL`     | `https://cabrelngamaleu-portfolio.vercel.app/api`                                                                | Production  |

5. Sauvegarde tout

### Étape 6 : Configurer les Settings Vercel

Dans **Settings** :

1. **General** :
   - Framework Preset : `Other`
   - Root Directory : `.` (laisser vide)
   - Build Command : Laisser auto-détecté ou `npm run build`
   - Output Directory : Laisser auto-détecté
   - Install Command : `npm install`

2. **Git** :
   - Production Branch : `main` ✅ (déjà configuré)

### Étape 7 : Push vers GitHub et Déploiement Auto

1. Commit et push ton code :

   ```bash
   git add vercel.json VERCEL_DEPLOYMENT.md client/package.json
   git commit -m "feat: configure Vercel deployment with serverless backend"
   git push origin main
   ```

2. Vercel va **automatiquement détecter le push** et déployer !

3. Attends 2-3 minutes

4. Ton site sera en ligne sur : https://cabrelngamaleu-portfolio.vercel.app/ 🎉

---

## 🧪 Test de Ton Déploiement

### Test Frontend

Visite : https://cabrelngamaleu-portfolio.vercel.app/

Tu devrais voir :

- ✅ Ton portfolio avec le nouveau design glassmorphism
- ✅ Toutes les sections (Hero, About, Skills, Projects, Blog, Contact)
- ✅ Animations fonctionnelles

### Test Backend API

Teste l'API dans le navigateur :

- https://cabrelngamaleu-portfolio.vercel.app/api/projects
- https://cabrelngamaleu-portfolio.vercel.app/api/blog

Tu devrais voir `[]` (liste vide) ou des données JSON.

### Test Dashboard Admin

1. Va sur : https://cabrelngamaleu-portfolio.vercel.app/dashboard
2. Tu devrais voir la page de login

### Créer ton Compte Admin

Utilise l'API pour créer un admin :

```bash
curl -X POST https://cabrelngamaleu-portfolio.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "cabrel",
    "email": "ton_email@gmail.com",
    "password": "MotDePasseSecurise123!"
  }'
```

Ou utilise **Postman** :

- URL : `POST https://cabrelngamaleu-portfolio.vercel.app/api/auth/register`
- Headers : `Content-Type: application/json`
- Body (raw JSON) :
  ```json
  {
    "username": "cabrel",
    "email": "ton_email@gmail.com",
    "password": "MotDePasseSecurise123!"
  }
  ```

Maintenant connecte-toi sur `/dashboard` avec ces identifiants !

---

## 🔧 Si Tu As des Problèmes

### Erreur 500 ou API qui ne répond pas

1. Va sur https://vercel.com/dashboard
2. Clique sur ton projet
3. Va dans "Deployments"
4. Clique sur le dernier déploiement
5. Vérifie les logs ("Runtime Logs" ou "Build Logs")
6. Cherche les erreurs

### Variables d'environnement manquantes

Retourne dans **Settings** → **Environment Variables** et vérifie que TOUTES les variables sont présentes.

### Redéployer Manuellement

1. Va sur https://vercel.com/dashboard
2. Clique sur ton projet
3. Va dans "Deployments"
4. Clique sur les 3 points du dernier déploiement
5. "Redeploy"

---

## 📊 Surveiller Ton Site

### Analytics Vercel (Gratuit)

- Va dans l'onglet "Analytics" de ton projet Vercel
- Tu verras : visiteurs, pages populaires, performance

### Logs en Temps Réel

- Onglet "Logs" : Voir les requêtes API en temps réel
- Onglet "Insights" : Performance de ton site

---

## 💡 Astuces

### Domaine Personnalisé (Optionnel)

Si tu veux ton propre domaine (ex: cabrelngamaleu.com) :

1. Achète un domaine (Namecheap, Google Domains)
2. Dans Vercel : **Settings** → **Domains**
3. Ajoute ton domaine
4. Suis les instructions DNS

### Prévisualisation des PR

Quand tu créeras des Pull Requests sur GitHub :

- Vercel créera automatiquement une prévisualisation
- URL unique pour tester avant de merger

### Rollback Rapide

Si une version a un bug :

1. Va dans "Deployments"
2. Trouve une version qui marchait
3. Clique sur les 3 points → "Promote to Production"

---

## ✅ Checklist Finale

- [ ] MongoDB Atlas configuré (gratuit)
- [ ] Cloudinary configuré (gratuit)
- [ ] Gmail App Password créé (gratuit)
- [ ] JWT Secret généré
- [ ] Toutes les variables ajoutées sur Vercel
- [ ] Code pushé sur GitHub
- [ ] Vercel a déployé automatiquement
- [ ] Site accessible sur https://cabrelngamaleu-portfolio.vercel.app/
- [ ] API fonctionne (`/api/projects`)
- [ ] Compte admin créé
- [ ] Dashboard accessible et fonctionnel

---

## 🎉 Félicitations !

Ton portfolio full-stack est en ligne avec :

- ✅ Frontend React moderne
- ✅ Backend Node.js serverless
- ✅ Base de données MongoDB cloud
- ✅ Upload d'images Cloudinary
- ✅ Dashboard admin complet
- ✅ 100% GRATUIT
- ✅ Déploiement automatique sur chaque push

**URL finale** : https://cabrelngamaleu-portfolio.vercel.app/

---

## 📞 Support

- Documentation Vercel : https://vercel.com/docs
- MongoDB Atlas Docs : https://www.mongodb.com/docs/atlas/
- Cloudinary Docs : https://cloudinary.com/documentation

Profite bien de ton portfolio ! 🚀
