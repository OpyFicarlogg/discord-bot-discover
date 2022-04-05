import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { AbstractCommand } from "../../../dto/abstractCommand";
import { INotification } from "../../notify/interfaces/INotification";
import { inject } from "inversify";
import { TYPES } from "../../../config/types";

export default class StopNotify extends AbstractCommand {

    private _notification : INotification;

    public constructor(@inject(TYPES.INotification) notification: INotification){
        super();
        super.cmdName = 'stopnotify';
        this._notification = notification;
    }

    public execute(client : Client, interaction : CommandInteraction, args?: string []) : void {
        interaction.reply({
			content: this._notification.disableNotification(interaction.guildId!,interaction.user),
			ephemeral : true,
		});
    }

    public getSlashCommand() : SlashCommandBuilder {
        return  new SlashCommandBuilder()
        .setName(this.cmdName)
        .setDescription("Arrêt des notifications pour l'utilisateur") ;
    }
}