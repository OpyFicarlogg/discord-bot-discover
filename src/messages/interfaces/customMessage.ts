import { Client, Message } from "discord.js";

export interface CustomMessage {
  
    execute(client : Client, message : Message) : void;

    getName() : string;
}