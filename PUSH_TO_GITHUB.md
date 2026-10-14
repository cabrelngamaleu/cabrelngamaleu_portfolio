# 🚀 Comment Pousser vers GitHub

## Option 1 : Script Automatique (Recommandé)

Double-cliquez sur le fichier **`push_to_github.bat`** dans l'explorateur Windows.

## Option 2 : Ligne de Commande

Ouvrez PowerShell ou CMD dans le dossier du projet et tapez :

```bash
git push origin main
```

Si vous avez des problèmes d'authentification, utilisez :

```bash
git push https://github.com/cabrelngamaleu/cabrelngamaleu_portfolio.git main
```

## Option 3 : GitHub Desktop

1. Ouvrez GitHub Desktop
2. Sélectionnez ce repository
3. Cliquez sur "Push origin"

## Option 4 : VS Code

1. Ouvrez VS Code dans ce dossier
2. Allez dans l'onglet "Source Control" (Ctrl+Shift+G)
3. Cliquez sur les 3 points (•••)
4. Choisir "Push"

## ⚠️ Si vous avez une erreur d'authentification

### Configurer GitHub CLI (recommandé)

```bash
# Installer GitHub CLI
winget install GitHub.cli

# S'authentifier
gh auth login

# Pousser
git push origin main
```

### Ou utiliser un Personal Access Token

1. Allez sur GitHub : Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Générer un nouveau token avec les permissions "repo"
3. Copiez le token
4. Utilisez-le comme mot de passe lors du push

```bash
git push https://github.com/cabrelngamaleu/cabrelngamaleu_portfolio.git main
# Username: cabrelngamaleu
# Password: [COLLEZ VOTRE TOKEN]
```

## ✅ Vérification

Une fois poussé, allez sur https://github.com/cabrelngamaleu/cabrelngamaleu_portfolio

Vous devriez voir :
- ✅ Structure monorepo (client/ et server/)
- ✅ README.md mis à jour
- ✅ GitHub Actions configurées
- ✅ Docker files
- ✅ Tous vos commits signés "Cabrel Ngamaleu"

## 📝 Commits Locaux Prêts

Vous avez actuellement 3 commits locaux prêts à être poussés :
1. `feat: full-stack portfolio with admin dashboard and CI/CD`
2. `docs: add setup instructions and environment configuration`
3. `docs: add implementation recap and finalize setup`

**Auteur de tous les commits : Cabrel Ngamaleu** ✅

---

Après le push, suivez les instructions dans **SETUP_INSTRUCTIONS.md** pour :
- Installer les dépendances
- Configurer MongoDB, Cloudinary, Email
- Tester localement
- Déployer en production
