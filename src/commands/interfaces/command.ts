import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';

export interface Command {
  
    execute(client : Client, interaction : CommandInteraction, args?: string []) : void;

    getSlashCommand() : SlashCommandBuilder;
}