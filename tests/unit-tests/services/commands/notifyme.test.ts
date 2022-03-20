// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import { User } from "discord.js";
import NotifyMe from "services/commands/impl/notifyme";
import { User as CustomUser } from "dto/user";
import Notification from "@notify/notification";
import { DiscordMock } from "../../../helpers/discordMock";
import { SlashCommandBuilder } from '@discordjs/builders';

import 'jest';
import createMockInstance from "jest-create-mock-instance";

describe('Notifyme', () => {
    const discordMock = new DiscordMock();
    let instance: NotifyMe;
    const mockedNotif : jest.Mocked<Notification> = createMockInstance (Notification);  

    beforeEach(() => {       
        instance = new NotifyMe(mockedNotif);  
    });

    it.each([
        [5, 10],
        [undefined, undefined],
      ])('should activate notification for the user', async (userLimit, minuteLimit) => {

        let commandInteraction = discordMock.getMockCommandInteraction();
        commandInteraction.options.getInteger  = jest.fn().mockReturnValueOnce(userLimit).mockReturnValueOnce(minuteLimit);
 
        mockedNotif.activateNotification.mockImplementationOnce((gId: string, usr : User , customUsr?: CustomUser ) => {
            expect(gId).toBe(commandInteraction.guildId);
            expect(usr.id).toBe(commandInteraction.user.id);
            expect(customUsr?.id).toBe(commandInteraction.user.id);
            expect(customUsr?.userLimit).toBe(userLimit);
            expect(customUsr?.minuteLimit).toBe(minuteLimit);
            return "";
        });

        instance.execute(discordMock.getMockClient(),commandInteraction);

        expect(mockedNotif.activateNotification).toBeCalled();
        expect(commandInteraction.reply).toBeCalled();

        expect(commandInteraction.reply).toBeCalledWith({
			content: "",
			ephemeral : true,
		});
    });

    it('should return name of the command ', async () => {
        expect(instance.getName()).toBe("notifyme");
    });

    it('should return the definition of the command', async () => {
        let result : SlashCommandBuilder = instance.getSlashCommand();
        expect(result).toBeInstanceOf(SlashCommandBuilder);
        expect(result).not.toBeNull();
        expect(result).toBeDefined();
    });
});
