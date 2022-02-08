// Run dotenv
require('dotenv').config();

import "reflect-metadata";
import { Client } from "discordx";
import { Intents, Message } from "discord.js";
import { User } from './dto/user';
import fileUser = require('./services/fileUser');

//Intents.FLAGS.GUILD_VOICE_STATES pour voiceStateUpdate
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES ] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user!.tag}!`);
});

client.on('messageCreate', msg => {
    console.log(msg.guild!.id);

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
    //Permet de supprimer un user à notifier 
    if (msg.content === '!stopnotify') {
        // Suppression dans le fichier 
        fileUser.deleteUser(msg.guild!.id, msg.author.id);
        var message :string  = `Notifications désactivées pour ${msg.author}`;
        console.log(message);
        
        //Réponse au message 
        msg.reply(message);
    }

    if (msg.content === '!help') {
        let message : string = `!notifyme : ajoute l'utilisateur à la liste des personnes à notifier \n`;
        message+=`!stopnotify : supprime l'utilisateur de la liste des personnes à notifier`;
        //Réponse au message 
        msg.reply(message);
    }

    //Définir sur quel user on souhaite être notifié ? 

    //Test simple de réponse du bot 
    if (msg.content === '!ping') {
        msg.reply('pong!')
            .then(message => console.log(`Reply pong to: ${msg.author.username}`))
            .catch(console.error);
    }
    
});


client.on('voiceStateUpdate', (oldState, newState) => {
    
    // check for bot
    if (oldState.member!.user.bot) return;

    //Récupération des channels
    let newUserChannel = newState.channel;
    let oldUserChannel = oldState.channel;
  
    // User Joins a voice channel
    if(oldUserChannel === null && newUserChannel !== undefined) {

        //TODO: Ne pas notifier tant que le count n'est pas supérieur au max ? 
        // Notifier uniquement quand passage de 0 à +0 ? 

        console.log(`Nouvel utilisateur connecté: ${newState.member!.user.username}`);

        //Récupération de la liste des id de user à notifier 
        var users : Array<User> = fileUser.getUsers(newState.guild.id);
    
        //Récupération de l'objet User et send de la notification
        if(users){
            users.forEach( user  => 
                client.users.fetch(user.id).then((discordUser) => {
                    if(toNotify(user)){
                        discordUser.send(`${newState.channel!.members.size} dans le channel ${newUserChannel!.name}`);
                        console.log(`Notification envoyé à ${discordUser.username}`);
                        user.lastDateNotification = new Date();
                        fileUser.updateUser(newState.guild.id, user);
                    }
                }).catch(console.error)
            );
        }
       
    } else if(newUserChannel === null){
        // User leaves a voice channel
      return;
    }
})

function toNotify(user : User) : Boolean {
    if(user.lastDateNotification && user.minuteLimit) {
        let today : Date = new Date();
        let notif : Date = new Date(user.lastDateNotification);
        notif.setMinutes(notif.getMinutes()+user.minuteLimit);
        return today.getTime() > notif.getTime();
    }
    return true;
    
}

client.login(process.env.DISCORD_TOKEN!);
