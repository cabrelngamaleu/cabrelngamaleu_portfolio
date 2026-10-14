# Portfolio Cabrel Ngamaleu

Portfolio full-stack moderne avec dashboard d'administration complet pour la gestion de contenu.

![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Stack Technique](#stack-technique)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Développement](#développement)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Documentation API](#documentation-api)
- [Sécurité](#sécurité)
- [Contribuer](#contribuer)
- [License](#license)

## 🎯 Aperçu

Portfolio professionnel avec interface publique élégante et dashboard d'administration complet. Permet la gestion dynamique des projets, articles de blog, messages de contact, et analytics.

**🌐 Site en ligne** : [https://cabrelngamaleu-portfolio.vercel.app/](https://cabrelngamaleu-portfolio.vercel.app/)

### ✅ Tous les services utilisés sont 100% GRATUITS

- **Vercel** : Hébergement frontend + backend serverless (gratuit)
- **MongoDB Atlas** : Base de données 512 MB (gratuit)
- **Cloudinary** : Stockage images 25 GB/mois (gratuit)
- **Gmail SMTP** : Envoi d'emails (gratuit avec compte Gmail)

### Caractéristiques principales

- ✨ Interface utilisateur moderne avec animations fluides (Framer Motion)
- 🎨 Design glassmorphisme avec Tailwind CSS
- 🔐 Authentification sécurisée JWT
- 📊 Dashboard d'administration complet
- 🖼️ Gestion d'images via Cloudinary
- 📧 Système de contact avec email
- 📈 Analytics et statistiques
- 🌐 Responsive (320px - 1920px)
- 🐳 Conteneurisé avec Docker
- 🚀 CI/CD avec GitHub Actions

## 🚀 Fonctionnalités

### Interface Publique
- Page d'accueil avec sections : À propos, Compétences, Projets, Blog, Contact
- Visualisation des projets avec filtres par catégorie
- Articles de blog avec support Markdown
- Formulaire de contact avec validation
- Animations et transitions fluides

### Dashboard Administrateur
- **Vue d'ensemble** : Statistiques et graphiques (Chart.js)
- **Gestion des projets** : CRUD complet avec upload d'images et réorganisation drag & drop
- **Gestion du blog** : Éditeur Markdown avec prévisualisation en temps réel
- **Boîte de réception** : Gestion des messages de contact
- **Analytics** : Visualisation des visites et interactions
- **Profil** : Gestion du compte et changement de mot de passe
- **Paramètres** : Thème dark/light

## 🛠️ Stack Technique

### Frontend
| Technologie | Version | Usage |
|------------|---------|-------|
| React | 18.2 | Framework UI |
| Tailwind CSS | 3.2 | Styling |
| Framer Motion | 8.5 | Animations |
| React Router | 6.20 | Routing |
| Axios | 1.2 | Requêtes HTTP |
| Chart.js | 4.4 | Graphiques |
| React Hook Form | 7.49 | Gestion de formulaires |

### Backend
| Technologie | Version | Usage |
|------------|---------|-------|
| Node.js | 18+ | Runtime |
| Express | 4.18 | Framework serveur |
| MongoDB | Atlas | Base de données |
| Mongoose | 8.0 | ODM |
| JWT | 9.0 | Authentification |
| Bcrypt | 5.1 | Hashage mots de passe |

### DevOps & Sécurité
| Technologie | Usage |
|------------|-------|
| Docker | Conteneurisation |
| GitHub Actions | CI/CD |
| Helmet.js | Headers HTTP sécurisés |
| CORS | Politique CORS |
| Rate Limiter | Protection DDoS |
| Joi | Validation des entrées |
| Mongo Sanitize | Protection NoSQL injection |

### Services Externes
- **Cloudinary** : Stockage et optimisation d'images
- **Nodemailer** : Envoi d'emails
- **MongoDB Atlas** : Base de données cloud

## 🏗️ Architecture

```
cabrelngamaleu_portfolio/
├── client/                    # Application React (Frontend)
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   │   ├── layout/       # Layout (Header, Footer, Sidenav)
│   │   │   ├── hero/         # Section Hero
│   │   │   ├── about/        # Section À propos
│   │   │   ├── skills/       # Section Compétences
│   │   │   ├── projects/     # Section Projets
│   │   │   ├── blog/         # Section Blog
│   │   │   ├── contact/      # Section Contact
│   │   │   └── dashboard/    # Composants Dashboard
│   │   ├── pages/            # Pages de l'application
│   │   │   ├── Portfolio.jsx # Page publique
│   │   │   └── Dashboard/    # Pages admin
│   │   ├── context/          # Context API (AuthContext)
│   │   ├── services/         # Services API (axios)
│   │   ├── hooks/            # Custom hooks
│   │   └── assets/           # Images et ressources
│   └── public/
├── server/                    # API Express (Backend)
│   ├── config/               # Configuration (DB, Cloudinary)
│   ├── middleware/           # Middlewares Express
│   │   ├── auth.js           # Authentification JWT
│   │   ├── validate.js       # Validation Joi
│   │   └── security.js       # Sécurité
│   ├── models/               # Modèles Mongoose
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── BlogPost.js
│   │   ├── Message.js
│   │   └── Analytics.js
│   ├── routes/               # Routes API
│   ├── controllers/          # Contrôleurs
│   ├── utils/                # Utilitaires
│   ├── scripts/              # Scripts (seed DB)
│   └── tests/                # Tests Jest
├── .github/
│   └── workflows/            # CI/CD Workflows
│       ├── ci.yml            # Tests et lint
│       ├── cd.yml            # Déploiement
│       └── dependency-review.yml
├── Dockerfile                # Image Docker multi-stage
├── docker-compose.yml        # Développement local
├── docker-compose.prod.yml   # Production
└── package.json              # Workspace npm
```

## 📦 Prérequis

- **Node.js** ≥ 18.0.0
- **npm** ≥ 8.0.0
- **MongoDB Atlas** (compte gratuit) ou MongoDB local
- **Compte Cloudinary** (gratuit - 25GB)
- **Provider SMTP** pour emails (Gmail, SendGrid, Mailgun)
- **Docker** (optionnel, pour développement conteneurisé)

## 🔧 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/cabrelngamaleu/cabrelngamaleu_portfolio.git
cd cabrelngamaleu_portfolio
```

### 2. Installer les dépendances

```bash
# Installe toutes les dépendances (client + server)
npm run install:all
```

## ⚙️ Configuration

### 1. Configuration Serveur

Créer `server/.env` basé sur `server/.env.example` :

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_db

# JWT
JWT_SECRET=your-super-secure-secret-minimum-32-characters
JWT_EXPIRE=24h

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com

# Admin
ADMIN_EMAIL=admin@yourdomain.com
```

### 2. Configuration Client (optionnel)

Créer `client/.env` si besoin :

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Initialiser la base de données

```bash
# Créer un utilisateur administrateur
npm run create-admin --workspace=server

# (Optionnel) Ajouter des données de démonstration
npm run seed --workspace=server
```

**Identifiants admin par défaut** (à changer après première connexion) :
- Username : `admin`
- Password : `admin123`

## 💻 Développement

### Démarrer l'application

```bash
# Démarrer client et serveur simultanément (recommandé)
npm run start:all

# Ou séparément
npm run start:client  # Démarre React sur http://localhost:3000
npm run start:server  # Démarre Express sur http://localhost:5000
```

### Avec Docker

```bash
# Démarrer avec Docker Compose
docker-compose up --build

# En arrière-plan
docker-compose up -d

# Arrêter les conteneurs
docker-compose down

# Supprimer les volumes (data MongoDB)
docker-compose down -v
```

### Scripts disponibles

```bash
# Installation
npm run install:all          # Installe toutes les dépendances

# Développement
npm run start:all           # Démarre client + server
npm run start:client        # Démarre React (port 3000)
npm run start:server        # Démarre Express (port 5000)

# Build
npm run build:all           # Build client + server
npm run build:client        # Build React
npm run build:server        # Build server (si applicable)

# Tests
npm run test:all            # Lance tous les tests
npm run test:client         # Tests client
npm run test:server         # Tests server avec coverage

# Qualité de code
npm run lint                # Lint client + server
npm run lint:client         # Lint React
npm run lint:server         # Lint Express
npm run format              # Format avec Prettier

# Base de données
npm run create-admin --workspace=server  # Crée admin
npm run seed --workspace=server          # Seed données démo
```

## 🧪 Tests

### Lancer tous les tests

```bash
npm run test:all
```

### Tests unitaires et d'intégration

```bash
# Client (React Testing Library)
npm run test:client

# Server (Jest + Supertest) avec coverage
npm run test:server -- --coverage

# Coverage minimum requis : 70%
```

### Coverage

```bash
cd server
npm test -- --coverage
open coverage/lcov-report/index.html  # Ouvrir le rapport
```

## 🚀 Déploiement

### 🎯 Option Recommandée : Vercel (100% Gratuit)

**Site actuel** : [https://cabrelngamaleu-portfolio.vercel.app/](https://cabrelngamaleu-portfolio.vercel.app/)

Vercel héberge automatiquement le frontend ET le backend (serverless) gratuitement !

#### 📖 Guide Complet de Déploiement Vercel

**Consulte le guide détaillé** : [`VERCEL_DEPLOYMENT.md`](./VERCEL_DEPLOYMENT.md)

#### 🚀 Déploiement Rapide

1. **Configuration automatique** : Le projet est déjà connecté à Vercel
2. **Push vers GitHub** : Vercel détecte automatiquement et déploie
3. **Configure les variables d'environnement** sur Vercel Dashboard :
   - Va sur https://vercel.com/dashboard
   - Sélectionne ton projet `cabrelngamaleu-portfolio`
   - Settings → Environment Variables
   - Ajoute toutes les variables (voir VERCEL_DEPLOYMENT.md)

4. **Services Gratuits à configurer** :
   - **MongoDB Atlas** (512 MB gratuit) : https://www.mongodb.com/cloud/atlas/register
   - **Cloudinary** (25 GB/mois gratuit) : https://cloudinary.com/users/register/free
   - **Gmail SMTP** (gratuit avec ton Gmail existant)

5. **Push et c'est en ligne !**
   ```bash
   git push origin main
   ```

Vercel redéploie automatiquement à chaque push sur `main`. 🎉

---

### Option 1 : Docker Production

```bash
# Build et démarrer en production
docker-compose -f docker-compose.prod.yml up -d --build

# Vérifier les conteneurs
docker ps

# Voir les logs
docker logs <container-id>

# Arrêter
docker-compose -f docker-compose.prod.yml down
```

### Option 2 : Railway

1. Créer un compte sur [Railway.app](https://railway.app)
2. Créer un nouveau projet
3. Connecter votre dépôt GitHub
4. Configurer les variables d'environnement :
   - Copier toutes les variables de `.env.production.example`
   - `MONGODB_URI` : Utiliser MongoDB Atlas
   - `JWT_SECRET` : Générer une clé sécurisée (32+ caractères)
   - `CLOUDINARY_*` : Vos identifiants Cloudinary
   - `EMAIL_*` : Configuration SMTP
   - `FRONTEND_URL` : URL Railway fournie
5. Configurer le build :
   - Build Command : `npm run install:all && npm run build:all`
   - Start Command : `node server/server.js`
6. Déployer automatiquement à chaque push sur `main`

### Option 3 : Render

1. Créer un compte sur [Render.com](https://render.com)
2. Créer un nouveau Web Service
3. Connecter votre dépôt GitHub
4. Configuration :
   - Environment : `Node`
   - Build Command : `npm run install:all && npm run build:all`
   - Start Command : `node server/server.js`
   - Branch : `main`
5. Ajouter les variables d'environnement (comme Railway)
6. Déployer

### Variables d'environnement essentielles

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<generate-secure-32-char-secret>
FRONTEND_URL=<your-production-url>
CLOUDINARY_CLOUD_NAME=<cloudinary-name>
CLOUDINARY_API_KEY=<cloudinary-key>
CLOUDINARY_API_SECRET=<cloudinary-secret>
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=<your-email>
EMAIL_PASSWORD=<app-password>
```

### CI/CD avec GitHub Actions

Le projet inclut 3 workflows automatiques :

1. **CI** (`ci.yml`) - Sur chaque Pull Request :
   - Lint du code (ESLint + Prettier)
   - Tests client avec coverage
   - Tests server avec coverage ≥70%
   - Audit de sécurité (npm audit + Snyk)
   - Build de l'application

2. **CD** (`cd.yml`) - Sur push vers `main` :
   - Build et push de l'image Docker
   - Déploiement automatique (Railway/Render)

3. **Dependency Review** (`dependency-review.yml`) :
   - Scan des vulnérabilités dans les dépendances
   - Bloque les PR avec vulnérabilités critiques

**Configuration des secrets GitHub** :
- `DOCKER_USERNAME` : Nom d'utilisateur Docker Hub
- `DOCKER_PASSWORD` : Token Docker Hub
- `SNYK_TOKEN` : Token Snyk (optionnel)
- `RAILWAY_WEBHOOK_URL` : Webhook Railway (si utilisé)
- `RENDER_DEPLOY_HOOK_URL` : Hook Render (si utilisé)

## 📚 Documentation API

### Endpoints principaux

#### Authentification
```
POST   /api/auth/register      # Inscription (admin uniquement)
POST   /api/auth/login         # Connexion
POST   /api/auth/logout        # Déconnexion
POST   /api/auth/change-password  # Changer mot de passe
GET    /api/auth/me            # Profil utilisateur
```

#### Projets
```
GET    /api/projects           # Liste des projets
GET    /api/projects/:id       # Détails projet
POST   /api/projects           # Créer projet (auth requis)
PUT    /api/projects/:id       # Modifier projet (auth requis)
DELETE /api/projects/:id       # Supprimer projet (auth requis)
```

#### Blog
```
GET    /api/blog               # Liste des articles
GET    /api/blog/:slug         # Détails article
POST   /api/blog               # Créer article (auth requis)
PUT    /api/blog/:id           # Modifier article (auth requis)
DELETE /api/blog/:id           # Supprimer article (auth requis)
```

#### Messages
```
GET    /api/messages           # Liste messages (auth requis)
POST   /api/messages           # Envoyer message (public)
PATCH  /api/messages/:id/read  # Marquer lu (auth requis)
DELETE /api/messages/:id       # Supprimer message (auth requis)
```

#### Upload
```
POST   /api/upload             # Upload image Cloudinary (auth requis)
```

#### Analytics
```
GET    /api/analytics/dashboard  # Stats dashboard (auth requis)
POST   /api/analytics/event      # Enregistrer événement
```

### Authentification

Toutes les routes protégées nécessitent un header :
```
Authorization: Bearer <token-jwt>
```

Le token est obtenu lors de la connexion et valide 24h.

## 🔒 Sécurité

### Mesures de sécurité implémentées

- ✅ **Helmet.js** : Headers HTTP sécurisés
- ✅ **CORS** : Restriction d'origine (whitelist)
- ✅ **Rate Limiting** : 100 requêtes / 15 minutes
- ✅ **JWT** : Authentification sécurisée (expiration 24h)
- ✅ **Bcrypt** : Hash des mots de passe (12 rounds)
- ✅ **Joi** : Validation stricte des entrées
- ✅ **Mongo Sanitize** : Prévention injection NoSQL
- ✅ **HPP** : Protection pollution de paramètres
- ✅ **Cloudinary** : Upload sécurisé (restrictions de type)
- ✅ **HTTPS** : Requis en production

### Bonnes pratiques

- Les variables sensibles sont dans `.env` (jamais committées)
- `JWT_SECRET` minimum 32 caractères aléatoires
- MongoDB Atlas avec whitelist IP
- HTTPS obligatoire en production (via Nginx ou plateforme)
- Scans réguliers : `npm audit` et Snyk
- Mises à jour régulières des dépendances

### Signaler une vulnérabilité

Consultez [SECURITY.md](./SECURITY.md) pour les instructions.

## 🤝 Contribuer

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'feat: Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Guidelines

- Suivre les conventions de code (ESLint + Prettier)
- Écrire des tests pour les nouvelles fonctionnalités
- Maintenir la coverage ≥70%
- Documenter les changements dans la PR

## 📄 License

Ce projet est sous licence MIT. Voir [LICENSE](./LICENSE) pour plus d'informations.

---

**Développé avec ❤️ par Cabrel Ngamaleu**

🔗 [Portfolio](https://cabrelngamaleu.com) • 💼 [LinkedIn](https://linkedin.com/in/cabrelngamaleu) • 🐙 [GitHub](https://github.com/cabrelngamaleu)
