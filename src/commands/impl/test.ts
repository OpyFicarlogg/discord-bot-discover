import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from "../interfaces/command";
import { injectable } from "inversify";
import { ToLoad } from "../../dto/toLoad";

@injectable()
export default class Test implements Command, ToLoad {
    private cmdName: string = 'test';

    public execute(client : Client, interaction : CommandInteraction, args?: string []) : void {
        interaction.reply('pouch!');
    }

    public getSlashCommand() : SlashCommandBuilder {
         //Params https://discordjs.guide/interactions/registering-slash-commands.html#options
        return  new SlashCommandBuilder()
        .setName(this.cmdName)
        .setDescription("yolo test") ;
    }

    public getName(){
        return this.cmdName;
    }
}






/*export const data : SlashCommandBuilder = new SlashCommandBuilder()
.setName('ping')
.setDescription('Replies with Pong!');

export async function execute (interaction : CommandInteraction) {
    await interaction.reply('Pong!');
}*/