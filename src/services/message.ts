import { Message } from "discord.js";
import fileUser = require('./fileUser');

export function execute(msg : Message) {
    console.log(msg.guild!.id);
    
    notifyMe(msg);

    stopNotify(msg);

    help(msg);

    ping(msg);
    
}

function notifyMe(msg : Message){
    //Permet d'ajouter un user à notifier 
    if (msg.content === '!notifyme') {
        var message: string;
        // Ajouter au fichier 
        if(fileUser.addUser(msg.guild!.id, msg.author.id)){
            message  = `Notifications activées pour ${msg.author}`;
            console.log(message);
        }
        else{
            message = `Notification déjà active pour ${msg.author}`;
        }
        
        //Réponse au message 
        msg.reply(message);
    }
}


function stopNotify(msg : Message){
    //Permet de supprimer un user à notifier 
    if (msg.content === '!stopnotify') {
        // Suppression dans le fichier 
        fileUser.deleteUser(msg.guild!.id, msg.author.id);
        var message :string  = `Notifications désactivées pour ${msg.author}`;
        console.log(message);
        
        //Réponse au message 
        msg.reply(message);
    }
}

function help(msg: Message) {
    if (msg.content === '!help') {
        let message : string = `!notifyme : ajoute l'utilisateur à la liste des personnes à notifier \n`;
        message+=`!stopnotify : supprime l'utilisateur de la liste des personnes à notifier`;
        //Réponse au message 
        msg.reply(message);
    }
}

function ping(msg : Message){
    //Test simple de réponse du bot 
    if (msg.content === '!ping') {
        msg.reply('pong!')
            .then(message => console.log(`Reply pong to: ${msg.author.username}`))
            .catch(console.error);
    }
}

    //Définir sur quel user on souhaite être notifié ? 