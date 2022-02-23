import { VoiceState, User as DiscordUser } from "discord.js";
import { User } from "../../dto/user";
import { Client } from "discordx";
import { inject, injectable } from "inversify";
import { IUserDao } from "../../dao/interfaces/IuserDao";
import { TYPES } from "../../config/types";
import { ICustomStateUpdate } from "./interfaces/ICustomStateUpdate";

@injectable()
export class CustomStateUpdate implements ICustomStateUpdate{

    private _userDao : IUserDao;

    public constructor(
	    @inject(TYPES.IUserDao) userDao: IUserDao,
    ) {
        this._userDao = userDao;
    }
    
    public execute(client : Client,oldState: VoiceState, newState : VoiceState) {
        this.notifyUsers(client,oldState,newState);
    }

    private notifyUsers(client : Client,oldState: VoiceState, newState : VoiceState){
        // TODO: Notifier uniquement quand passage de 0 à +0 ? 
    
        if(this.detectNewUser(oldState,newState)){
            var users : Array<User> = this._userDao.getUsers(newState.guild.id);
        
            //Récupération de l'objet User et send de la notification
            if(users){
                users.forEach( user  => 
                    client.users.fetch(user.id).then((discordUser : DiscordUser) => {
                        //Check notification date + userLimit
                        if(this.toNotify(user) && newState.channel!.members.size >= user.userLimit! ){
                            discordUser.send(`${newState.channel!.members.size} dans le channel ${newState.channel!.name}`);
                            console.log(`Notification envoyé à ${discordUser.username}`);
                            user.lastDateNotification = new Date();
                            this._userDao.updateUser(newState.guild.id, user);
                        }
                    }).catch(console.error)
                );
            }
        }
    }

    private detectNewUser(oldState: VoiceState, newState :VoiceState) : boolean{
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

    private toNotify(user : User) : boolean {
        if(user.lastDateNotification && user.minuteLimit) {
            let today : Date = new Date();
            let notif : Date = new Date(user.lastDateNotification);
            notif.setMinutes(notif.getMinutes()+user.minuteLimit);
            return today.getTime() > notif.getTime();
        }
        return true;
    }
}
