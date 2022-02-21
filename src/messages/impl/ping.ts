import { Client, Message } from "discord.js";
import { injectable } from "inversify";
import { ToLoad } from "../../dto/toLoad";
import { CustomMessage } from "../interfaces/customMessage";

@injectable()
export default class Ping implements CustomMessage, ToLoad {
    private msgName: string = 'ping';

    public getName(){
        return this.msgName;
    }

    public execute(client : Client, message : Message) : void {
        message.reply('pong!')
                .then(() => console.log(`Reply pong to: ${message.author.username}`))
                .catch(console.error);
    }
}

