import {  User } from "discord.js";

export interface  INotification  { 

    activateNotification(guildId: string, user : User ) : string 

    disableNotification(guildId: string, user: User): string 
}

