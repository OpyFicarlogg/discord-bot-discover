import {  User } from "discord.js";
import { User as CustomUser } from "../../../dto/user";

export interface  INotification  { 

    activateNotification(guildId: string, user : User , customUser?: CustomUser ) : string 

    disableNotification(guildId: string, user: User): string 
}

