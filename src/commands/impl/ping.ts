import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from "../interfaces/command";
import { injectable } from "inversify";
import { ToLoad } from "../../dto/toLoad";

//Discord tutorial handler https://github.com/discordjs/guide/tree/main/code-samples/creating-your-bot/command-handling
//Default: https://stackoverflow.com/questions/51852938/typescript-dynamically-import-classes
@injectable()
export default class Ping implements Command, ToLoad {
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
        .setDescription("this is a ping command pipo") ;
    }

    public getName(){
        return this.cmdName;
    }
}

