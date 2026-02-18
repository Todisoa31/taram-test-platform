# Gestion d’Articles

## Description

    Application web pour créer, publier, supprimer et suivre des articles sur différents réseaux.
    Le tableau de bord affiche les statistiques des articles et les notifications envoyées par email (simulées).

## Prérequis

Node.js v18 ou supérieure
npm v9+ ou yarn 1+

## Installation
# Cloner le projet
git clone https://github.com/ton-utilisateur/ton-projet.git
cd ton-projet

# Installer les dépendances frontend
cd frontend
npm install

# Installer les dépendances backend
cd ../backend
npm install

## Lancement
# Lancer le backend (port 4000 par défaut)
cd backend
npm run dev

# Lancer le frontend (port 3000 par défaut)
cd ../frontend
npm run dev


# Frontend accessible : 
  http://localhost:3000

# Backend accessible : 
  http://localhost:4000

## Choix techniques

   - Architecture : Next.js pour le front avec React Server Components et Node.js Express pour le back.

   - Technologies :

    . React / Material-UI pour l’UI

    . TypeScript pour typage fort

    . Nodemailer pour simulation email

    . JSON local pour la base de données (simulation rapide)

## Compromis :

    - Simulation des emails car l’envoi réel nécessite des credentials SMTP.
    - Pas de tests unitaires automatiques

## Fonctionnalités implémentées

    - Gestion des articles (création, publication, suppression)

    - Dashboard avec statistiques et graphiques

    - Affichage des notifications récentes (simulation email)

    - Snackbar pour feedback utilisateur

    - Simulation d’envoi email fonctionnelle en production (Mailtrap conseillé)

    - Importation d’articles via fichier JSON

## Ce qui aurait été fait avec plus de temps

    - Intégration d’un vrai service d’envoi d’emails (SendGrid, Mailgun…)
    - Tests unitaires et d’intégration
    - Pagination et filtrage avancé pour les listes d’articles
    - Amélioration de l’UX sur mobile
    - Historique complet des notifications

## Tests

    Aucun test automatisé pour l’instant.
# Pour tester manuellement :

    - Lancer backend et frontend.
    - Créer, publier et supprimer des articles via l’interface.
    - Vérifier la mise à jour du tableau de bord et des notifications simulées.

## Difficultés rencontrées

    - Typage des erreurs backend pour les afficher correctement côté frontend
    - Gestion du multi-select MUI avec TypeScript (renderValue et SelectProps)
    - Organisation du Dashboard pour éviter les re-renders inutiles