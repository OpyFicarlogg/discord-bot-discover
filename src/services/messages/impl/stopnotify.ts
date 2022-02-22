import { Client, Message } from "discord.js";
import { inject} from "inversify";
import { TYPES } from "../../../config/types";
import { IUserDao } from "../../../dao/interfaces/IuserDao";
import { AbstractMessage } from "../../../dto/abstractMessage";

export default class StopNotify extends AbstractMessage {
    private _userDao : IUserDao;

    public constructor(@inject(TYPES.IUserDao) userDao: IUserDao){
        super();
        super.msgName = 'stopnotify';
        this._userDao = userDao;
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

