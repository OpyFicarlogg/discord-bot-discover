import { VoiceState } from "discord.js";
import { User } from "../dto/user";
import { Client } from "discordx";
import fileUser = require('./fileUser');


export function execute(client : Client,oldState: VoiceState, newState : VoiceState) {
    notifyUsers(client,oldState,newState);
}


function notifyUsers(client : Client,oldState: VoiceState, newState : VoiceState){
    //TODO: Ne pas notifier tant que le count n'est pas supérieur au max ? 
    // Notifier uniquement quand passage de 0 à +0 ? 

    if(detectNewUser(oldState,newState)){
        var users : Array<User> = fileUser.getUsers(newState.guild.id);
    
        //Récupération de l'objet User et send de la notification
        if(users){
            users.forEach( user  => 
                client.users.fetch(user.id).then((discordUser) => {
                    if(toNotify(user)){
                        discordUser.send(`${newState.channel!.members.size} dans le channel ${newState.channel!.name}`);
                        console.log(`Notification envoyé à ${discordUser.username}`);
                        user.lastDateNotification = new Date();
                        fileUser.updateUser(newState.guild.id, user);
                    }
                }).catch(console.error)
            );
        }
    }
}

function detectNewUser(oldState: VoiceState, newState :VoiceState) : boolean{
    // check for bot
    if (oldState.member!.user.bot) return false;

    //Récupération des channels
    let newUserChannel = newState.channel;
    let oldUserChannel = oldState.channel;
  
    // User Joins a voice channel
    if(oldUserChannel === null && newUserChannel !== undefined) {
        console.log(`Nouvel utilisateur connecté: ${newState.member!.user.username}`);
        return true;       
    } else if(newUserChannel === null){
        // User leaves a voice channel
      return false;
    }
    return false;
}

function toNotify(user : User) : Boolean {
    if(user.lastDateNotification && user.minuteLimit) {
        let today : Date = new Date();
        let notif : Date = new Date(user.lastDateNotification);
        notif.setMinutes(notif.getMinutes()+user.minuteLimit);
        return today.getTime() > notif.getTime();
    }
    return true;
    
}