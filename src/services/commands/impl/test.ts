import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { AbstractCommand } from "../../../dto/abstractCommand";

export default class Test extends AbstractCommand {

    constructor(){
        super();
        super.cmdName = 'test'
    }

    public execute(client : Client, interaction : CommandInteraction, args?: string []) : void {
        interaction.reply('pouch!');
    }

    public getSlashCommand() : SlashCommandBuilder {
         //Params https://discordjs.guide/interactions/registering-slash-commands.html#options
        return  new SlashCommandBuilder()
        .setName(this.cmdName)
        .setDescription("yolo test") ;
    }
}






/*export const data : SlashCommandBuilder = new SlashCommandBuilder()
.setName('ping')
.setDescription('Replies with Pong!');

export async function execute (interaction : CommandInteraction) {
    await interaction.reply('Pong!');
}*/