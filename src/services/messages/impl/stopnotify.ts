import { Client, Message } from "discord.js";
import { inject} from "inversify";
import { TYPES } from "../../../config/types";
import { AbstractMessage } from "../../../dto/abstractMessage";
import { INotification } from "../../notify/interfaces/INotification";

export default class StopNotify extends AbstractMessage {
    private _notification : INotification;

    public constructor(@inject(TYPES.INotification) notification: INotification){
        super();
        super.msgName = 'stopnotify';
        this._notification = notification;
    }

    public execute(client : Client, msg : Message) : void {     
        msg.reply(this._notification.disableNotification(msg.guild!.id,msg.author));
    }
}

