import { Client, Message } from "discord.js";
import { inject } from "inversify";
import { TYPES } from "../../../config/types";
import { IUserDao } from "../../../dao/interfaces/IuserDao";
import { AbstractMessage } from "../../../dto/abstractMessage";

export default class NotifyMe extends AbstractMessage {

    private _userDao : IUserDao;

    public constructor(@inject(TYPES.IUserDao) userDao: IUserDao){
        super();
        super.msgName = 'notifyme';
        this._userDao = userDao;
    }

    public execute(client : Client, msg : Message) : void {
        var message: string;
            // Ajouter au fichier 
            if(this._userDao.addUser(msg.guild!.id, msg.author.id)){
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

