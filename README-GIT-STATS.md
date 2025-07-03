# 📊 Git Stats pour OBS

Un projet React/TypeScript avec DaisyUI qui affiche en temps réel les statistiques Git de votre projet actuel, parfait pour les streams de développement.

## 🎯 Fonctionnalités

- ✅ **Statistiques du jour** : Insertions, suppressions et nombre de commits
- 🚀 **Dernier commit** : Informations détaillées du commit le plus récent
- 🔄 **Actualisation automatique** : Mise à jour toutes les 30 secondes
- 🎨 **Interface moderne** : Design avec DaisyUI, optimisé pour OBS
- ⚡ **Performance** : Programme Rust ultra-rapide pour la collecte des données

## 🛠️ Installation

### Prérequis

1. **Node.js** (v18+) et **pnpm**
2. **Rust** et **Cargo** - [Installer Rust](https://rustup.rs/)
3. **Git** installé et configuré

### Installation des dépendances

```bash
# Installer les dépendances Node.js
pnpm install

# Compiler le programme Rust (première fois)
cd git-stats-fetcher
cargo build --release
cd ..
```

## 🚀 Utilisation

### 1. Démarrer le serveur de développement

```bash
pnpm dev
```

L'application sera disponible à `http://localhost:3000`

### 2. Générer les statistiques Git

Double-cliquez sur `update-git-stats.bat` ou exécutez :

```bash
./update-git-stats.bat
```

Ce script va :
- Compiler le programme Rust (si nécessaire)
- Analyser le repository Git actuel
- Générer le fichier `src/git-stats.json`
- Actualiser l'interface web

### 3. Automatisation (Optionnel)

Pour une actualisation automatique, vous pouvez :

#### Option A : Tâche Windows
Créer une tâche planifiée Windows pour exécuter `update-git-stats.bat` toutes les minutes.

#### Option B : Hook Git
Ajouter un hook post-commit :

```bash
# .git/hooks/post-commit
#!/bin/sh
cd /chemin/vers/votre/projet
./update-git-stats.bat
```

## 🎥 Configuration OBS

1. Ajouter une **Source** → **Navigateur**
2. URL : `http://localhost:3000`
3. Largeur : 1200px, Hauteur : 800px
4. ✅ Cocher "Actualiser le navigateur quand la scène devient active"

### Conseils pour OBS

- **Fond transparent** : L'interface utilise des dégradés, mais vous pouvez modifier le CSS
- **Taille responsive** : L'interface s'adapte à différentes tailles
- **Thèmes** : 30+ thèmes DaisyUI disponibles (voir configuration)

## ⚙️ Configuration

### Changer le thème DaisyUI

Modifiez dans `src/index.tsx` ou ajoutez l'attribut `data-theme` :

```html
<html data-theme="synthwave">
```

Thèmes populaires pour streaming : `synthwave`, `cyberpunk`, `dracula`, `night`

### Personnaliser les couleurs

Modifiez `src/App.css` ou utilisez les classes Tailwind :

```css
/* Fond personnalisé pour OBS */
.obs-background {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Modifier la fréquence d'actualisation

Dans `src/App.tsx`, ligne ~30 :

```typescript
// Changer 30000ms (30s) vers votre préférence
const interval = setInterval(loadGitStats, 30000);
```

## 🔧 Développement

### Structure du projet

```
test/
├── git-stats-fetcher/       # Programme Rust
│   ├── src/main.rs         # Logique de collecte Git
│   └── Cargo.toml          # Dépendances Rust
├── src/
│   ├── App.tsx             # Interface React principale
│   ├── types/git-stats.ts  # Types TypeScript
│   └── git-stats.json      # Données générées (gitignore)
├── update-git-stats.bat    # Script Windows
└── package.json
```

### Compilation manuelle du programme Rust

```bash
cd git-stats-fetcher
cargo run --release -- --path .. --output ../src/git-stats.json
```

### Options du programme Rust

```bash
# Utilisation
cargo run -- [OPTIONS]

# Options
-p, --path <PATH>      Chemin vers le repository Git
-o, --output <OUTPUT>  Fichier de sortie JSON
-h, --help             Afficher l'aide
```

## 🐛 Dépannage

### Erreur "cargo not found"
- Installer Rust : https://rustup.rs/
- Redémarrer l'invite de commande après installation

### Erreur "Repository not found"
- Vérifier que le dossier contient un repository Git (`git init`)
- Le programme cherche le `.git` dans le dossier parent

### Interface ne s'actualise pas
- Vérifier que `src/git-stats.json` existe
- Regarder la console du navigateur pour les erreurs
- Tester l'URL : `http://localhost:3000/src/git-stats.json`

### Données vides
- S'assurer d'avoir des commits dans le repository
- Vérifier la timezone du système
- Les statistiques "aujourd'hui" dépendent de l'heure locale

## 📝 Format des données

Le fichier `git-stats.json` contient :

```json
{
  "project_name": "mon-projet",
  "today_insertions": 150,
  "today_deletions": 45,
  "today_commits": 5,
  "latest_commit": {
    "hash": "a1b2c3d4",
    "message": "Add new feature",
    "author": "John Doe",
    "date": "2024-01-15 14:30:22",
    "files_changed": 3,
    "insertions": 85,
    "deletions": 12
  },
  "last_updated": "2024-01-15 14:35:10"
}
```

## 🤝 Contribution

N'hésitez pas à contribuer :
- 🐛 Reporter des bugs
- 💡 Proposer des améliorations
- 🎨 Améliorer le design
- 📝 Améliorer la documentation

## 📄 Licence

MIT - Utilisez et modifiez librement pour vos streams !

---

**Bon stream ! 🎮✨** 