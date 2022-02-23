## Description du bot 

Le fichier deploy-commands.ts permet de charger les commandes dans la guild ou sur le bot.  
Deux commandes dans le package.json:  
* `deploy` : Register des slash commands dans l'application 
* `deploy-dev` : Register des slash commands dans la guild 

Ce bot permet d'être notifié si il y a des personnes connectées sur le serveur.   
* Il est possible de s'ajouter à la liste de notification avec la commande `!notifyme` ou `/notifyme`
* Il existe la possibilité d'arrêter les notifications sur un utilisateur `!stopnotify` ou `/stopnotify` 
* Il existe une commande pour voir si le bot répond `!ping` ou `/ping`
* La commande `!help` résume les différents points 

## Fichier de configuration 
Modifier le fichier .env-exemple et le renommer en .env

## Execution du bot  
- Exécution du bot: `npm run start`
- Envoi des commandes sur la guild de dev : `npm run deploy-dev`
- Envoi des commandes en global : `npm run deploy`

#### Evolutions à venir 
* Définition d'options sur l'utilisateur à notifier (à partir de x user, tous les x minutes/heures, etc...)
* Mettre le projet starter dans NPM







# Details sur le projet 

### Creation du projet 
* https://medium.com/davao-js/2019-tutorial-creating-your-first-simple-discord-bot-47fc836a170b
* https://stackoverflow.com/questions/68701446/discord-api-valid-intents-must-be-provided-for-the-client

### Installation nodejs  17 
https://joshtronic.com/2021/10/24/how-to-install-nodejs-17-on-ubuntu-lts/

`npm init -y`  
`npm install --save discord.js dotenv`  
`npm install @discordjs/rest discord-api-types`

### Installation des dépendances pour ts-node 
TS-node permet de ne plus avoir à build en js pour exécuter, mais d'exécuter directement les ts. Plus simple pour le debug.  
tuto : https://www.youtube.com/watch?v=mUCYXZ4Gx7E  
- `npm install -D ts-node-dev`
- `npm install -D ts-node`

### Passage en typescript 
https://dev.to/oceanroleplay/create-your-discord-bot-by-using-typescript-and-decorators-17gm

Discord pour typescript :  
`npm install discordx reflect-metadata discord.js`

Installation typescript : 
`npm install --save-dev @types/node typescript`

Compilation : 
`tsc --pretty`

en js simple: `node bot.js`

Suite au passage via typescript:

Compilation `npm run build ` or `tsc`  
Exécution `node build/bot.js` or `jstart`

### Injection de dépendance 

Comparatifs des CDI:  
https://blog.logrocket.com/top-five-typescript-dependency-injection-containers/  
https://itnext.io/typescript-dependency-injection-setting-up-inversifyjs-ioc-for-a-ts-project-f25d48799d70

Le framework choisi est inversify (https://github.com/inversify/InversifyJS), il est basé principalement sur les interfaces, et est le plus utilisé.

* La classe `types.ts` défini les différents types qui seront utilisés. 
* La classe `inversify.config.ts` défini le lien entre les injections. 


### Run sur un autre serveur en ligne 
https://medium.com/davao-js/v2-tutorial-deploy-your-discord-bot-to-heroku-part-2-9a37572d5de4

https://autocode.com/guides/how-to-build-a-discord-bot/






Versionning: https://semver.org/lang/fr/