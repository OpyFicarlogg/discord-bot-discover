import {  User } from "discord.js";
import { User as CustomUser } from "../../dto/user";
import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { IUserDao } from "../../dao/interfaces/IuserDao";
import { INotification } from "./interfaces/INotification";

@injectable()
export default class Notification  implements INotification {

    private _userDao : IUserDao;

    public constructor(@inject(TYPES.IUserDao) userDao: IUserDao){
        this._userDao = userDao;
    }

    public activateNotification(guildId: string, user: User, customUser: CustomUser ) : string {
        let message: string;
        
        // Ajouter au fichier 
        if(this._userDao.addUser(guildId, customUser)){
            message  = `Notifications activées pour ${user}`;
            console.log(message);
        }
        else{
            message = `Notification déjà active pour ${user}`;
        }     
        return message;
    }

    public disableNotification(guildId: string, user: User): string {
        var message: string;
        this._userDao.deleteUser(guildId, user.id);
        var message :string  = `Notifications désactivées pour ${user}`;
        console.log(message);
        
        return message;
    }
}

