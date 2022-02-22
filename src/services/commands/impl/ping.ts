import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { AbstractCommand } from "../../../dto/abstractCommand";

//Discord tutorial handler https://github.com/discordjs/guide/tree/main/code-samples/creating-your-bot/command-handling
//Default: https://stackoverflow.com/questions/51852938/typescript-dynamically-import-classes
export default class Ping extends AbstractCommand {

    constructor(){
        super();
        super.cmdName = 'ping'
    }
   
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
}

