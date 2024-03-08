# HRnet, migration jQuery vers React

HRnet est une application jQuery qui rencontrait de nombreux problème de performance. Le but de ce projet a été de migrer le code jQuery en une application React.

L'application jQuery utilisait 4 plugins : un sélecteur de date, un menu dropdown, une modale et un tableau pour afficher les employés.
J'ai converti le plugin du menu dropdown en un composant React que j'ai publié sur npm. 
Plusieurs étapes ont du être suivies :

- Convertir l'application complète HRnet, passange de jQuery à React

- Conversion d'un des 4 plugins jQuery en composant React

- Utilisation de librairies existantes pour les plugins restants

- Ajout d'un système de gestion d'état (Redux)

- Création d'un rapport de performance Lighthouse pour comparer l'application jQuery à celle en React

## Prérequis

- [NodeJS (**Version 14 ou supérieure**)](https://nodejs.org/en/)

- [NPM](https://www.npmjs.com/)

- Visual Studio Code de préférence


## Installation

1. Cloner ce repo. Vous pouvez utiliser la commande `git clone https://github.com/YanelBe/P14-HRnet`

2. Installer les dépendences avec la commande `npm install`

3. Démarrez le serveur avec la commande `npm start`

4. Le serveur démarre automatiquement sur le port 3000 par défaut.


## Liens

- [Déploiement avec Netlify](https://hrnet-yanbe.netlify.app/) 
- [Composant Dropdown sur Github](https://github.com/YanelBe/P14-HRnet-Dropdown)
- [Composant Dropdown sur npm](https://www.npmjs.com/package/@yanbe/hrnet-dropdown) 