import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { AbstractCommand } from "dto/abstractCommand";

export default class Exemple extends AbstractCommand {

    constructor(){
        super();
        super.cmdName = 'exemple'
    }

    public execute(client : Client, interaction : CommandInteraction, args?: string []) : void {
        interaction.reply('pouch!');
    }

    public getSlashCommand() : SlashCommandBuilder {
         //Params https://discordjs.guide/interactions/registering-slash-commands.html#options
        return  new SlashCommandBuilder()
        .setName(this.cmdName)
        .setDescription("exemple") ;
    }
}