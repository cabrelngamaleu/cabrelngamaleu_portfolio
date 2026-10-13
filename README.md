# Portfolio Cabrel Ngamaleu

Portfolio full-stack moderne avec React et Node.js.

## Structure du projet

```
cabrelngamaleu_portfolio/
├── client/          # Application React (frontend)
├── server/          # API Express (backend)
├── .github/         # CI/CD workflows
└── package.json     # Configuration workspace npm
```

## Technologies

### Frontend (client/)
- React 18
- Tailwind CSS
- Framer Motion
- Axios

### Backend (server/)
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (images)
- Nodemailer (emails)

## Installation

```bash
# Installer toutes les dépendances (client + server)
npm run install:all
```

## Configuration

1. **Server** : Créer `server/.env` basé sur `server/.env.example`
2. **Client** : Créer `client/.env` si nécessaire

## Démarrage

```bash
# Démarrer client et server simultanément
npm run start:all

# Ou séparément
npm run start:client  # Port 3000
npm run start:server  # Port 5000
```

## Build

```bash
# Build client et server
npm run build:all

# Ou séparément
npm run build:client
npm run build:server
```

## Tests

```bash
# Lancer tous les tests
npm run test:all

# Ou séparément
npm run test:client
npm run test:server
```

## Scripts utiles

```bash
# Initialiser la base de données
npm run seed --workspace=server

# Créer un utilisateur admin
npm run create-admin --workspace=server
```

## Développement

Le projet utilise npm workspaces pour gérer le monorepo. Toutes les commandes peuvent être exécutées depuis la racine.

## License

MIT
