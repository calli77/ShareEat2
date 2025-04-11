# ShareEat - Réseau Social

## Description du projet

ShareEat est une plateforme de réseau social permettant aux utilisateurs de partager le fond de leur penser et leur expériences. Ce projet monorepo contient à la fois le serveur backend (GraphQL/Prisma) et le client frontend (React/Apollo).

## Fonctionnalités principales

- **Authentification utilisateur** : Inscription, connexion et gestion de sessions avec JWT
- **Publication de contenus** : Création, modification et suppression de posts
- **Interactions sociales** : Commentaires et likes sur les publications
- **Profils utilisateurs** : Affichage des posts par utilisateur

## Structure du projet

- `server/` - Backend GraphQL avec Apollo Server, Prisma et PostgreSQL
- `client/` - Frontend React avec Apollo Client et Tailwind CSS

## Guide de démarrage rapide

### Installation et configuration

1. Clonez ce dépôt :
```bash
git clone https://github.com/calli77/ShareEat2.git
cd shareeat
```

2. Suivez les instructions d'installation détaillées dans chaque dossier :
   - [Instructions pour le serveur](./server/README.md)
   - [Instructions pour le client](./client/README.md)

## Auteurs

- Calliclès Bazolo
- Florent Lelion
