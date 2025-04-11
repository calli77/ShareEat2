# ShareEat - Frontend React

## Description

Ce dossier contient le frontend de l'application ShareEat, construit avec React et Apollo Client. L'interface permet aux utilisateurs de s'inscrire, se connecter, créer et interagir avec des publications culinaires.

## Technologies utilisées

- **React** : Bibliothèque UI
- **Apollo Client** : Client GraphQL pour React
- **GraphQL Codegen** : Génération de hooks et types TypeScript à partir du schéma GraphQL
- **React Router** : Navigation entre les pages
- **Tailwind CSS** : Framework CSS utilitaire
- **TypeScript** : Superset typé de JavaScript

## Installation

1. Installez les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   ```

2. Générez les types GraphQL :
   ```bash
   npx graphql-codegen
   ```

## Démarrage

### Mode développement

```bash
npm start
```

### API Endpoint
Pour changer l'URL de l'API GraphQL, modifiez la variable `REACT_APP_API_URL` dans le fichier `.env`.

## Tests

```bash
npm test
```
