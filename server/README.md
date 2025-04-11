# ShareEat - Backend GraphQL

## Description

Ce dossier contient le backend GraphQL de l'application ShareEat. Il s'agit d'une API GraphQL construite avec Apollo Server, utilisant Prisma comme ORM pour communiquer avec une base de données PostgreSQL.

## Technologies utilisées

- **Apollo Server** : Serveur GraphQL
- **Prisma** : ORM (Object-Relational Mapping)
- **PostgreSQL** : Base de données relationnelle
- **TypeScript** : Superset typé de JavaScript
- **JWT** : JSON Web Tokens pour l'authentification
- **GraphQL Codegen** : Génération automatique de types TypeScript depuis le schéma GraphQL

## Installation

1. Installez les dépendances :
   ```bash
   npm install
   ```
   
3. Modifiez ou créz le fichier `.env` avec vos informations de connexion à la base de données :
   ```
   JWT_SECRET="votre_clé_secrète_pour_jwt"
   ```
   
4. Générez le client Prisma :
   ```bash
   npx prisma generate
   ```

6. Générez les types GraphQL :
   ```bash
   npx graphql-codegen
   ```

## Démarrage

- **Prisma Studio** : Interface d'administration pour la base de données
  ```bash
  npx prisma studio
  ```

### Mode développement

```bash
npm run dev
# ou
yarn dev
```

Le serveur démarrera à l'adresse `http://localhost:4000/graphql`.

### Démarrer le serveur

```bash
npm run start
```

## Structure du projet

- `prisma/` - Configuration Prisma et migrations
  - `schema.prisma` - Schéma de la base de données
  - `migrations/` - Migrations Prisma

- `src/` - Code source
  - `index.ts` - Point d'entrée de l'application
  - `schema.ts` - Schéma GraphQL exécutable
  - `context.ts` - Contexte Apollo Server (Prisma, authentification)
  
  - `auth/` - Logique d'authentification
    - `auth.utils.ts` - Utilitaires JWT et hash de mot de passe
    - `auth.resolvers.ts` - Résolveurs pour l'authentification
  
  - `typeDefs/` - Définitions de types GraphQL
    - `user.graphql` - Types liés aux utilisateurs
    - `post.graphql` - Types liés aux posts
    - `comment.graphql` - Types liés aux commentaires
    - `like.graphql` - Types liés aux likes
  
  - `resolvers/` - Résolveurs GraphQL
    - `user.resolvers.ts` - Résolveurs pour les utilisateurs
    - `post.resolvers.ts` - Résolveurs pour les posts
    - `comment.resolvers.ts` - Résolveurs pour les commentaires
    - `like.resolvers.ts` - Résolveurs pour les likes

## Outils de développement
