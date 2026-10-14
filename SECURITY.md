# Security Policy

## Supported Versions

Les versions suivantes du portfolio de Cabrel Ngamaleu reçoivent des mises à jour de sécurité :

| Version | Prise en charge    |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

### Comment signaler une vulnérabilité

La sécurité de ce projet est prise très au sérieux. Si vous découvrez une vulnérabilité de sécurité, veuillez **ne pas** créer une issue publique.

**Méthodes de signalement :**

1. **GitHub Security Advisories (recommandé)** :
   - Aller sur [Security Advisories](https://github.com/cabrelngamaleu/cabrelngamaleu_portfolio/security/advisories)
   - Cliquer sur "Report a vulnerability"
   - Remplir le formulaire avec les détails

2. **Email privé** :
   - Envoyer un email à : **security@cabrelngamaleu.com**
   - Sujet : `[SECURITY] Titre de la vulnérabilité`
   - Inclure les détails techniques et les étapes de reproduction

### Informations à inclure

Pour nous aider à résoudre rapidement la vulnérabilité, veuillez inclure :

- Type de vulnérabilité (injection, XSS, CSRF, etc.)
- Composant affecté (frontend, backend, API, etc.)
- Étapes de reproduction détaillées
- Impact potentiel
- Suggestions de correction (si possible)
- Votre nom/pseudo si vous souhaitez être crédité

### Temps de réponse

- **Accusé de réception** : Dans les 48 heures
- **Évaluation initiale** : Dans les 7 jours
- **Correctif** : Dans les 30 jours (selon la gravité)
- **Divulgation publique** : Après le déploiement du correctif

### Processus

1. Vous signalez la vulnérabilité
2. Nous accusons réception sous 48h
3. Nous évaluons la sévérité et l'impact
4. Nous développons et testons un correctif
5. Nous déployons le correctif en production
6. Nous publions un Security Advisory
7. Nous vous créditons (si souhaité)

## Security Features

Ce projet implémente plusieurs couches de sécurité pour protéger les utilisateurs et les données :

### 1. Headers HTTP sécurisés (Helmet.js)

- **Content-Security-Policy** : Prévention XSS
- **X-Content-Type-Options: nosniff** : Protection contre le MIME type sniffing
- **X-Frame-Options: DENY** : Protection contre le clickjacking
- **X-XSS-Protection** : Protection XSS supplémentaire
- **Strict-Transport-Security** : Force HTTPS
- **Referrer-Policy** : Contrôle des informations de référent

### 2. CORS (Cross-Origin Resource Sharing)

- Whitelist stricte des origines autorisées
- Configuration : `FRONTEND_URL` en variable d'environnement
- Rejet automatique des requêtes non autorisées
- Credentials autorisés uniquement pour l'origine configurée

### 3. Rate Limiting

- **Limite globale** : 100 requêtes par 15 minutes par IP
- **Limite contact** : 10 messages par 15 minutes par IP
- Protection contre le spam et les attaques DDoS
- Headers informatifs : `X-RateLimit-*`

### 4. Authentification JWT

- Tokens signés avec algorithme HS256
- Expiration : 24 heures
- Secret JWT minimum 32 caractères (recommandé: 64+)
- Vérification sur toutes les routes protégées
- Rejet automatique des tokens expirés ou invalides

### 5. Hashage des mots de passe (Bcrypt)

- Algorithme bcrypt avec 12 rounds de hachage
- Hash automatique avant sauvegarde en base
- Comparaison sécurisée avec timing constant
- Pas de stockage en clair

### 6. Validation des entrées (Joi)

- Validation stricte de tous les inputs utilisateur
- Schémas définis pour chaque endpoint
- Rejection automatique (400) des données invalides
- Protection contre les injections et données malformées

### 7. Protection NoSQL Injection (mongo-sanitize)

- Sanitization automatique de `req.body`, `req.query`, `req.params`
- Suppression des opérateurs MongoDB (`$`, `.`)
- Application avant validation Joi

### 8. Protection HTTP Parameter Pollution (HPP)

- Prévention de la pollution des paramètres
- Protection contre les attaques utilisant des paramètres dupliqués
- Middleware appliqué sur toutes les routes

### 9. Upload sécurisé (Cloudinary + Multer)

- Restriction des types de fichiers (images uniquement)
- Limite de taille : 5MB par fichier
- Validation MIME type côté serveur
- Stockage cloud sécurisé (Cloudinary)
- URLs signées avec transformation automatique

### 10. HTTPS requis en production

- Redirection automatique HTTP → HTTPS
- Certificats SSL/TLS via plateforme de déploiement
- Configuration HSTS (Strict-Transport-Security)

### 11. Variables d'environnement sécurisées

- Tous les secrets dans fichiers `.env` (jamais committés)
- `.env` dans `.gitignore`
- Templates `.env.example` sans valeurs sensibles
- Validation au démarrage du serveur

### 12. Dependency Scanning

- Scan automatique sur chaque PR (GitHub Actions)
- `npm audit` dans le pipeline CI
- Snyk pour détection de vulnérabilités connues
- Mises à jour régulières des dépendances

## Security Best Practices for Deployment

### Configuration des variables d'environnement

```env
# JWT Secret - CRITIQUE
# Générer avec: openssl rand -base64 64
JWT_SECRET=<minimum-32-caractères-aléatoires-sécurisés>
JWT_EXPIRE=24h

# MongoDB - Utiliser MongoDB Atlas avec whitelist IP
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority

# CORS - Définir l'URL frontend exacte
FRONTEND_URL=https://votre-domaine.com

# Cloudinary - Clés API privées
CLOUDINARY_API_SECRET=<votre-secret-cloudinary>

# Email - Utiliser App Password (pas le mot de passe principal)
EMAIL_PASSWORD=<app-specific-password>
```

### MongoDB Atlas Security

1. **Whitelist IP** : Restreindre l'accès aux IPs de production uniquement
2. **Utilisateur dédié** : Créer un utilisateur avec permissions minimales (read/write sur DB spécifique)
3. **Connection string sécurisée** : Utiliser `retryWrites=true&w=majority`
4. **Backups réguliers** : Activer les snapshots automatiques
5. **Monitoring** : Activer les alertes MongoDB Atlas

### HTTPS et Reverse Proxy

**Option 1 : Plateforme (Railway/Render)**

- HTTPS automatique avec certificats Let's Encrypt
- Configuration zero-touch

**Option 2 : VPS avec Nginx**

```nginx
server {
    listen 443 ssl http2;
    server_name votre-domaine.com;

    ssl_certificate /etc/letsencrypt/live/votre-domaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre-domaine.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Redirection HTTP → HTTPS
server {
    listen 80;
    server_name votre-domaine.com;
    return 301 https://$server_name$request_uri;
}
```

### Sécurité Docker

```dockerfile
# Utiliser images officielles
FROM node:18-slim

# Créer utilisateur non-root
RUN useradd -m -u 1001 nodeuser
USER nodeuser

# Copier uniquement les fichiers nécessaires
COPY --chown=nodeuser:nodeuser . .

# Production dependencies only
RUN npm ci --only=production
```

### Mises à jour régulières

**Hebdomadaire :**

```bash
npm audit
npm outdated
```

**Mensuel :**

```bash
npm update
npm audit fix
```

**Sur alerte Snyk/Dependabot :**

- Évaluer la sévérité
- Tester le correctif
- Déployer rapidement si critique

### Backup des données

**MongoDB Atlas :**

- Snapshots automatiques quotidiens (retention 7 jours)
- Export manuel mensuel : `mongodump`

**Images Cloudinary :**

- Les images sont stockées sur Cloudinary (backups automatiques)
- Export périodique recommandé pour images critiques

### Monitoring et Logs

**À surveiller :**

- Tentatives d'authentification échouées (>5 en 5min)
- Requêtes rate-limited (pic inhabituel)
- Erreurs serveur 5xx
- Temps de réponse API
- Utilisation CPU/Mémoire

**Outils recommandés :**

- Railway/Render logs intégrés
- MongoDB Atlas monitoring
- Sentry pour error tracking
- Uptime monitoring (UptimeRobot, Pingdom)

### Checklist de déploiement sécurisé

- [ ] `.env` contient toutes les variables requises
- [ ] `JWT_SECRET` est aléatoire et ≥32 caractères
- [ ] `MONGODB_URI` pointe vers MongoDB Atlas avec authentification
- [ ] MongoDB whitelist IP configurée
- [ ] `FRONTEND_URL` correspond exactement à l'URL de production
- [ ] HTTPS activé et certificat valide
- [ ] CORS configuré avec origine exacte (pas `*`)
- [ ] Rate limiting activé et testé
- [ ] Helmet headers présents (vérifier avec `curl -I`)
- [ ] `npm audit` clean (ou vulnérabilités triées)
- [ ] Backups MongoDB configurés
- [ ] Monitoring/alertes activés
- [ ] Tests de pénétration basiques effectués

## Vulnerability Disclosure Policy

### Divulgation responsable

Nous pratiquons la **divulgation coordonnée** :

1. La vulnérabilité est signalée en privé
2. Nous confirmons et développons un correctif
3. Le correctif est testé et déployé
4. Un Security Advisory est publié avec les détails
5. Le chercheur est crédité (si souhaité)

### Hall of Fame

Nous remercions les chercheurs en sécurité qui signalent des vulnérabilités de manière responsable :

<!-- Les contributeurs seront listés ici -->

_Soyez le premier à contribuer à la sécurité de ce projet !_

## Security Contact

**Email de sécurité** : security@cabrelngamaleu.com

**PGP Key** : [À ajouter si applicable]

**Temps de réponse garanti** : 48 heures maximum

---

**Dernière mise à jour** : Octobre 2024  
**Version** : 1.0.0
