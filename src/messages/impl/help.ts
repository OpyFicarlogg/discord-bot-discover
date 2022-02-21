import { Client, Message } from "discord.js";
import { injectable } from "inversify";
import { ToLoad } from "../../dto/toLoad";
import { CustomMessage } from "../interfaces/customMessage";

@injectable()
export default class Help implements CustomMessage, ToLoad {
    private msgName: string = 'help';

    public getName(){
        return this.msgName;
    }

    //TODO: set client prefix ? 
    public execute(client : Client, message : Message) : void {
        let msg : string = `!notifyme : ajoute l'utilisateur à la liste des personnes à notifier \n`;
            msg+=`!stopnotify : supprime l'utilisateur de la liste des personnes à notifier`;
            //Réponse au message 
            message.reply(msg);
    }
}

