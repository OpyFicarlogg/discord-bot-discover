import { Message } from "discord.js";

export interface ICustomMessage {

    execute(msg : Message) : void;
}
