# Portfolio Server API

Backend API pour le portfolio de Cabrel Ngamaleu.

## Technologies

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (images)
- Nodemailer (emails)

## Installation

```bash
# Depuis le dossier racine
npm run install:all

# Ou depuis le dossier server
npm install
```

## Configuration

1. Créer un fichier `.env` basé sur `.env.example`
2. Configurer les variables d'environnement :
   - MongoDB URI
   - JWT Secret
   - Cloudinary credentials
   - Email SMTP configuration

## Démarrage

```bash
# Développement
npm run dev

# Production
npm start
```

## Scripts

- `npm run dev` - Démarre le serveur en mode développement avec nodemon
- `npm test` - Lance les tests Jest
- `npm run test:coverage` - Tests avec rapport de couverture
- `npm run seed` - Initialise la base de données avec des données de test
- `npm run create-admin` - Crée un utilisateur admin par défaut

## API Endpoints

### Authentication

- `POST /api/auth/login` - Connexion
- `PUT /api/auth/change-password` - Changement de mot de passe (protégé)

### Projects

- `GET /api/projects` - Liste des projets (public)
- `GET /api/projects/:id` - Détail d'un projet (public)
- `POST /api/projects` - Créer un projet (admin)
- `PUT /api/projects/:id` - Modifier un projet (admin)
- `DELETE /api/projects/:id` - Supprimer un projet (admin)

### Blog

- `GET /api/blog` - Liste des articles (public)
- `GET /api/blog/:slug` - Détail d'un article (public)
- `POST /api/blog` - Créer un article (admin)
- `PUT /api/blog/:id` - Modifier un article (admin)
- `DELETE /api/blog/:id` - Supprimer un article (admin)

### Messages

- `POST /api/messages` - Envoyer un message (public)
- `GET /api/messages` - Liste des messages (admin)
- `PATCH /api/messages/:id/read` - Marquer comme lu/non lu (admin)
- `DELETE /api/messages/:id` - Supprimer un message (admin)

### Analytics

- `POST /api/analytics/event` - Créer un événement (public)
- `GET /api/analytics/dashboard` - Tableau de bord analytics (admin)

## Sécurité

- Helmet pour les en-têtes HTTP sécurisés
- CORS configuré pour le frontend uniquement
- Rate limiting (100 req/15min général, 10 req/15min pour contact)
- Validation des données avec Joi
- Protection NoSQL injection
- HPP (HTTP Parameter Pollution)
- Mots de passe hashés avec bcrypt (12 rounds)

## Tests

```bash
# Lancer tous les tests
npm test

# Tests avec couverture
npm run test:coverage
```

Couverture minimum requise : 70%
