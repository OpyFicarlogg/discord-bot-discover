import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { IUserDao } from "../dao/interfaces/IuserDao";
import { ICustomMessage } from "./interfaces/ICustomMessage";

@injectable()
export class CustomMessage implements ICustomMessage{

    private _userDao : IUserDao;

    public constructor(
	    @inject(TYPES.IUserDao) userDao: IUserDao,
    ) {
        this._userDao = userDao;
    }
    
    public execute(msg : Message) {
        console.log(msg.guild!.id);
        
        this.notifyMe(msg);
    
        this.stopNotify(msg);
    
        this.help(msg);
    
        this.ping(msg);
        
    }

    private notifyMe(msg : Message){
        //Permet d'ajouter un user à notifier 
        if (msg.content === '!notifyme') {
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

    private stopNotify(msg : Message){
        //Permet de supprimer un user à notifier 
        if (msg.content === '!stopnotify') {
            // Suppression dans le fichier 
            this._userDao.deleteUser(msg.guild!.id, msg.author.id);
            var message :string  = `Notifications désactivées pour ${msg.author}`;
            console.log(message);
            
            //Réponse au message 
            msg.reply(message);
        }
    }

    private help(msg: Message) {
        if (msg.content === '!help') {
            let message : string = `!notifyme : ajoute l'utilisateur à la liste des personnes à notifier \n`;
            message+=`!stopnotify : supprime l'utilisateur de la liste des personnes à notifier`;
            //Réponse au message 
            msg.reply(message);
        }
    }

    private ping(msg : Message){
        //Test simple de réponse du bot 
        if (msg.content === '!ping') {
            msg.reply('pong!')
                .then(message => console.log(`Reply pong to: ${msg.author.username}`))
                .catch(console.error);
        }
    }
}
    //Définir sur quel user on souhaite être notifié ? 