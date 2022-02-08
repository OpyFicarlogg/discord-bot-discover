## Creation du projet 

### Creation du projet 
* https://medium.com/davao-js/2019-tutorial-creating-your-first-simple-discord-bot-47fc836a170b
* https://stackoverflow.com/questions/68701446/discord-api-valid-intents-must-be-provided-for-the-client

## Installation nodejs  17 
https://joshtronic.com/2021/10/24/how-to-install-nodejs-17-on-ubuntu-lts/

`npm init -y`  
`npm install --save discord.js dotenv`  

## Execution du bot 
En js simple: `node bot.js`

Suite au passage via typescript:  
- Compilation `npm run build`  
- Exécution `npm start`


## Passage en typescript 
https://dev.to/oceanroleplay/create-your-discord-bot-by-using-typescript-and-decorators-17gm

Discord pour typescript :  
`npm install discordx reflect-metadata discord.js`

Installation typescript : 
`npm install --save-dev @types/node typescript`

Compilation : 
`tsc --pretty`



## Run sur un autre serveur en ligne 
https://medium.com/davao-js/v2-tutorial-deploy-your-discord-bot-to-heroku-part-2-9a37572d5de4

https://autocode.com/guides/how-to-build-a-discord-bot/



## Description du bot 

Ce bot permet d'être notifié si il y a des personnes connectées sur le serveur.   
* Il est possible de s'ajouter à la liste de notification avec la commande `!notifyme`
* Il existe une commande pour voir si le bot répond `!ping`

#### Evolutions à venir 
* Implémentation de la méthode `!stopnotify` qui permet d'arrêter les notifications sur un utilisateur 
* Implémentation d'une méthode `!help`
* Définition d'options sur l'utilisateur à notifier (à partir de x user, tous les x minutes/heures, etc...)
