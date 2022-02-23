import { Client, Message } from "discord.js";
import { inject } from "inversify";
import { TYPES } from "../../../config/types";
import { AbstractMessage } from "../../../dto/abstractMessage";
import { User } from "../../../dto/user";
import { INotification } from "../../notify/interfaces/INotification";

export default class NotifyMe extends AbstractMessage {
    private _notification : INotification;

    public constructor(@inject(TYPES.INotification) notification: INotification){
        super();
        super.msgName = 'notifyme';
        this._notification = notification;
    }

    public execute(client : Client, msg : Message) : void {     
        msg.reply(this._notification.activateNotification(msg.guild!.id,msg.author, new User(msg.author.id)));
    }
}

