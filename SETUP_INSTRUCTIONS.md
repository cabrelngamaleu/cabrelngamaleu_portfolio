# 🚀 Instructions de Configuration - Portfolio Full-Stack

## Configuration Requise

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer MongoDB Atlas (Base de données)

1. Créer un compte gratuit sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Créer un nouveau cluster (tier gratuit 512MB)
3. Configurer l'accès réseau : Autoriser l'accès depuis n'importe où (0.0.0.0/0) pour le dev
4. Créer un utilisateur de base de données
5. Obtenir la chaîne de connexion
6. Modifier `server/.env` :
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

### 3. Configurer Cloudinary (Upload d'images)

1. Créer un compte gratuit sur [Cloudinary](https://cloudinary.com/users/register/free)
2. Aller dans Dashboard → Account Details
3. Copier : Cloud Name, API Key, API Secret
4. Modifier `server/.env` :
   ```
   CLOUDINARY_CLOUD_NAME=votre_cloud_name
   CLOUDINARY_API_KEY=votre_api_key
   CLOUDINARY_API_SECRET=votre_api_secret
   ```

### 4. Configurer Email (Formulaire de contact)

**Option Gmail (recommandé) :**

1. Activer la validation en 2 étapes sur votre compte Google
2. Générer un mot de passe d'application : https://myaccount.google.com/apppasswords
3. Modifier `server/.env` :
   ```
   EMAIL_USER=votre_email@gmail.com
   EMAIL_PASS=mot_de_passe_application_16_caracteres
   EMAIL_FROM=noreply@cabrelngamaleu.com
   ADMIN_EMAIL=votre_email@gmail.com
   ```

### 5. Sécuriser le JWT Secret

Modifier `server/.env` avec une clé aléatoire sécurisée :
```
JWT_SECRET=votre_cle_secrete_aleatoire_tres_longue_et_complexe
```

Générer une clé aléatoire avec Node.js :
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🏃 Démarrage

### Développement Local

**Terminal 1 - Backend :**
```bash
npm run dev:server
```
Le serveur démarre sur http://localhost:5000

**Terminal 2 - Frontend :**
```bash
npm run dev:client
```
Le portfolio s'ouvre sur http://localhost:3000

### Développement avec Docker

```bash
docker-compose up
```

Accéder à :
- Frontend : http://localhost:3000
- Backend API : http://localhost:5000/api

## 🔐 Créer un Compte Admin

Une fois le serveur démarré, créer un compte admin :

```bash
cd server
node scripts/createAdmin.js
```

Ou utiliser directement l'API :
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@cabrelngamaleu.com",
    "password": "VotreMotDePasseSecurise123!"
  }'
```

## 📝 Accès au Dashboard Admin

1. Aller sur http://localhost:3000/dashboard
2. Se connecter avec les identifiants admin créés
3. Gérer projets, blog, messages, analytics

## 🚀 Déploiement

### Option 1 : Railway (Recommandé - Gratuit)

1. Créer un compte sur [Railway](https://railway.app)
2. Installer Railway CLI : `npm i -g @railway/cli`
3. Se connecter : `railway login`
4. Créer un nouveau projet : `railway init`
5. Ajouter MongoDB : `railway add` → Choisir MongoDB
6. Déployer : `railway up`
7. Configurer les variables d'environnement sur le dashboard Railway

### Option 2 : Render (Gratuit)

1. Créer un compte sur [Render](https://render.com)
2. Connecter votre repo GitHub
3. Créer un "Web Service" :
   - Build Command : `npm install && npm run build:client`
   - Start Command : `npm start`
4. Ajouter les variables d'environnement depuis `server/.env.example`
5. Créer une base MongoDB sur Render ou utiliser MongoDB Atlas

### Option 3 : Vercel + MongoDB Atlas

**Frontend (Vercel) :**
```bash
cd client
npm install -g vercel
vercel
```

**Backend (Render/Railway/Heroku)**

## 🧪 Tests

```bash
# Tests backend
npm run test:server

# Tests frontend
npm run test:client

# Coverage
npm run test:coverage
```

## 📦 Structure du Projet

```
cabrelngamaleu_portfolio/
├── client/               # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/  # Composants UI
│   │   ├── pages/       # Pages (Portfolio, Dashboard)
│   │   ├── services/    # API client
│   │   └── context/     # État global
│   └── package.json
├── server/              # Express Backend
│   ├── config/          # Configuration
│   ├── controllers/     # Logique métier
│   ├── middleware/      # Middleware
│   ├── models/          # Modèles MongoDB
│   ├── routes/          # Routes API
│   └── package.json
├── .github/workflows/   # CI/CD
├── docker-compose.yml   # Docker dev
└── package.json         # Scripts monorepo
```

## 🔧 Scripts NPM Disponibles

```bash
npm run dev:client          # Démarrer frontend
npm run dev:server          # Démarrer backend
npm run dev                 # Démarrer les deux en parallèle
npm run build:client        # Build production frontend
npm run test:server         # Tests backend
npm run test:client         # Tests frontend
npm run lint                # Linter
npm run format              # Formater le code
```

## 🛡️ Sécurité

- ✅ Ne jamais committer les fichiers `.env`
- ✅ Utiliser des mots de passe forts
- ✅ Activer HTTPS en production
- ✅ Configurer CORS correctement
- ✅ Mettre à jour les dépendances régulièrement : `npm audit fix`

## 📞 Support

Pour toute question :
- Email : cabrel.ngamaleu@example.com
- GitHub Issues : https://github.com/cabrelngamaleu/cabrelngamaleu_portfolio/issues

---

**Bon développement ! 🚀**
