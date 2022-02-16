import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from "../interfaces/command";

//Discord tutorial handler https://github.com/discordjs/guide/tree/main/code-samples/creating-your-bot/command-handling
//Default: https://stackoverflow.com/questions/51852938/typescript-dynamically-import-classes
export default class Ping implements Command {
    private cmdName: string = 'ping';

    public execute(client : Client, interaction : CommandInteraction, args?: string []) : void {
        interaction.reply({
			content: 'pong!',
			ephemeral : true,
		});
    }

    public getSlashCommand() : SlashCommandBuilder {
         //Params https://discordjs.guide/interactions/registering-slash-commands.html#options
        return  new SlashCommandBuilder()
        .setName(this.cmdName)
        .setDescription("this is a ping command") ;
    }

    public getName(){
        return this.cmdName;
    }
}

