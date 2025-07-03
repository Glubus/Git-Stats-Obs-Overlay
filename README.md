# Git Stats Dashboard

Un tableau de bord pour visualiser les statistiques Git de votre projet.

## Configuration

Pour configurer le chemin de votre projet Git :

1. Créez un fichier `.env` à la racine du projet
2. Ajoutez la variable suivante :
   ```
   PROJECT_PATH=chemin/vers/votre/projet
   ```
   Par exemple :
   ```
   PROJECT_PATH=C:/Users/username/projects/mon-projet
   ```
   
Si aucun chemin n'est spécifié, le dossier courant sera utilisé par défaut.

## Installation

1. Installez les dépendances :
```bash
pnpm install
```

2. Lancez l'application :
   ```bash
   pnpm dev
   ```

3. Exécutez le script de mise à jour des statistiques :
   ```bash
   ./update-git-stats.bat
   ```

Les statistiques seront automatiquement rafraîchies toutes les 30 secondes.

## Get started

Start the dev server, and the app will be available at [http://localhost:3000](http://localhost:3000).

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Learn more

To learn more about Rsbuild, check out the following resources:

- [Rsbuild documentation](https://rsbuild.rs) - explore Rsbuild features and APIs.
- [Rsbuild GitHub repository](https://github.com/web-infra-dev/rsbuild) - your feedback and contributions are welcome!
