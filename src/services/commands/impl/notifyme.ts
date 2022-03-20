import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import { AbstractCommand } from "dto/abstractCommand";
import { INotification } from "@notify/interfaces/INotification";
import { inject } from "inversify";
import { TYPES } from "config/types";
import { User } from "dto/user";

export default class NotifyMe extends AbstractCommand {

    private _notification : INotification;
    private static readonly USERLIMIT = 'userlimit';
    private static readonly MINUTELIMIT = 'minutelimit';

    public constructor(@inject(TYPES.INotification) notification: INotification){
        super();
        super.cmdName = 'notifyme';
        this._notification = notification;
    }

    public execute(client : Client, interaction : CommandInteraction, args?: string []) : void {
        let user : User;
        let userLimit: number | null = interaction.options.getInteger(NotifyMe.USERLIMIT);
        let minuteLimit: number | null = interaction.options.getInteger(NotifyMe.MINUTELIMIT);

        user = new User(interaction.user.id);

        if(userLimit || minuteLimit){     
            if(userLimit){
                user.userLimit = userLimit;
            }
            if(minuteLimit){
                user.minuteLimit= minuteLimit;
            }
        }

        interaction.reply({
			content: this._notification.activateNotification(interaction.guildId!,interaction.user,user),
			ephemeral : true,
		});
    }

    public getSlashCommand() : SlashCommandBuilder {
        const data : SlashCommandBuilder= new SlashCommandBuilder()
            .setName(this.cmdName)
            .setDescription("Activation des notifications pour l'utilisateur (valeur par défaut: 30 minutes et 1 user");

            data.addIntegerOption(option =>
                option.setName(NotifyMe.USERLIMIT)
                    .setDescription("Nombre d'utilisateur dans un channel pour être notifié")
                );

            data.addIntegerOption(option =>
                option.setName(NotifyMe.MINUTELIMIT)
                    .setDescription('Limite en minutes entre deux notifications')
                );
            
        return data;
    }
}