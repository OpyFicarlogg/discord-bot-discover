import { Client, Message } from "discord.js";
import { AbstractMessage } from "../../../dto/abstractMessage";

export default class Help extends AbstractMessage {
    public constructor(){
        super();
        super.msgName = 'help';
    }

    public execute(client : Client, message : Message) : void {
        let msg : string = `!notifyme : ajoute l'utilisateur à la liste des personnes à notifier \n`;
            msg+=`!stopnotify : supprime l'utilisateur de la liste des personnes à notifier`;
            //Réponse au message 
            message.reply(msg);
    }
}

