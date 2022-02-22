import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IUserDao } from "../../../dao/interfaces/IuserDao";
import { ToLoad } from "../../../dto/toLoad";
import { CustomMessage } from "../interfaces/customMessage";

@injectable()
export default class NotifyMe implements CustomMessage, ToLoad {
    private msgName: string = 'notifyme';

    private _userDao : IUserDao;

    public constructor(
	    @inject(TYPES.IUserDao) userDao: IUserDao,
    ) {
        this._userDao = userDao;
    }

    public getName(){
        return this.msgName;
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

