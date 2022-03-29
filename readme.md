## Description du bot 

Le fichier deploy-commands.ts permet de charger les commandes dans la guild ou sur le bot.  
Deux commandes dans le package.json:  
* `deploy` : Register des slash commands dans l'application 
* `deploy-dev` : Register des slash commands dans la guild 

Ce bot permet d'être notifié si il y a des personnes connectées sur le serveur.  

Il est possible d'intérargir avec le bot de deux façons : 

#### Avec les commandes chat (préfixe !)
* Activer la notification `!notifyme`
* Arrêter les notifications `!stopnotify`
* Voir si le bot répond `!ping`
* Aide sur les différentes commandes `!help`

#### Avec les slash commands
* Activer la notification `/notifyme` avec deux paramètres optionnels:
    - userlimit : Défini à partir de combien d'utilisateurs on souhaite être notifié.
    - minutelimit : Défini tout les combiens de minutes on souhaite être notifié.
* Arrêter les notifications `/stopnotify`
* Voir si le bot répond `/ping`

## Fichier de configuration 
Modifier le fichier .env-exemple et le renommer en .env

## Execution du bot  
- Exécution du bot: `npm run start`
- Envoi des commandes sur la guild de dev : `npm run deploy-dev`
- Envoi des commandes en global : `npm run deploy`

#### Evolutions à venir 
* Gérer la langue du serveur et mettre le texte en correspondance 







# Details sur le projet 

### Creation du projet 
* https://medium.com/davao-js/2019-tutorial-creating-your-first-simple-discord-bot-47fc836a170b
* https://dev.to/oceanroleplay/creating-discord-bot-client-from-scratch-3hpp
* exemple with slashcommands https://github.com/oceanroleplay/discord.ts-example/tree/1cd43bb343af2a5b4bf6df2b51786be0c98bd706/src/commands
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
https://mariusschulz.com/blog/dynamic-import-expressions-in-typescript

Discord pour typescript :  
`npm install discordx reflect-metadata discord.js`  
Discordx non obligatoire

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


### Gestion des paths 
Pour ne pas avoir partout des paths à rallonge, il a fallu configurer le tsconfig.json pour définir que le point d'entrée est `src`, ou encore des raccourcis de path   

Ce qui permet de remplacer un chemin `../../../../../machin` par `/machin` 

#### Modification dans le `tsconfig.json`:
```
    "moduleResolution": "node",   
     "baseUrl": "src",           
     "paths": {
       "@notify/*":["services/notify/*"], 
     },
```
Il faut également ajouter `src` dans la partie `ìnclude`
`"include": ["src","tests"]`

#### Modification pour Jest
Pour faire fonctionner les paths dans la partie Jest, il faut également ajouter  la dépendance vers `require-json5` qui permet de faire un require sur le tsconfig avec des commentaires
* `npm i require-json5`   

Dans le jest.config.ts ajouter: 
```
const requireJSON5 = require('require-json5');
const {compilerOptions} = requireJSON5('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest')

modulePaths: [compilerOptions.baseUrl],
moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
```


### Test unitaires 

Les dépendances:  
* npm install jest @types/jest ts-jest -D
* npm install --save-dev @types/jest
* npm i jest-create-mock-instance

Création du fichier jest:  
`jest --init`

Pour que le fichier jest soit pris en compte, il doit avec dans son nom `test`

Pour exécuter jest:  
`npm run test`

Le résultat de la couverture de code se retrouve dans le dossier `coverage`, il est possible de voir le résultat dans `coverage/Icov-report/index.html`



### Run sur un autre serveur en ligne 
https://medium.com/davao-js/v2-tutorial-deploy-your-discord-bot-to-heroku-part-2-9a37572d5de4

https://autocode.com/guides/how-to-build-a-discord-bot/






Versionning: https://semver.org/lang/fr/