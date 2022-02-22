import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import { IUserDao } from "../../../dao/interfaces/IuserDao";
import { ToLoad } from "../../../dto/toLoad";
import { CustomMessage } from "../interfaces/customMessage";

@injectable()
export default class StopNotify implements CustomMessage, ToLoad {
    private msgName: string = 'stopnotify';

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
        this._userDao.deleteUser(msg.guild!.id, msg.author.id);
        var message :string  = `Notifications désactivées pour ${msg.author}`;
        console.log(message);
        
        //Réponse au message 
        msg.reply(message);
    }
}

