import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';

export interface Command {
  
    execute(client : Client, interaction : CommandInteraction, args?: string []) : void;

    getName() : string;

    getSlashCommand() : SlashCommandBuilder;
}

/*interface Run {
    (client : Client, interaction : CommandInteraction, args: string []) : void;
}

export interface Command {
    name : string;
    description : string; 
    aliases?: string [];
    run : Run;
}*/