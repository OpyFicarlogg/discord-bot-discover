// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import StopNotify from "services/commands/impl/stopnotify";
import Notification from "@notify/notification";
import { DiscordMock} from "../../../helpers/discordMock";
import { SlashCommandBuilder } from '@discordjs/builders';

import 'jest';
import createMockInstance from "jest-create-mock-instance";


describe('StopNotify commands', () => {
    const discordMock = new DiscordMock();
    let instance: StopNotify;
    const mockedNotif : jest.Mocked<Notification> = createMockInstance (Notification);  
    const commandInteraction = discordMock.getMockCommandInteraction();
    const cli = discordMock.getMockClient();

    beforeEach(() => {       
        instance = new StopNotify(mockedNotif);  
    });

    it('should disable notification', async () => {
        mockedNotif.disableNotification.mockImplementationOnce(() => "");
        
        instance.execute(cli,commandInteraction);

        expect(mockedNotif.disableNotification).toBeCalled();
        expect(commandInteraction.reply).toBeCalled();

        expect(commandInteraction.reply).toBeCalledWith({
			content: "",
			ephemeral : true,
		});
    });

    it('should return name of the command ', async () => {
        expect(instance.getName()).toBe("stopnotify");
    });

    it('should return the definition of the command', async () => {
        let result : SlashCommandBuilder = instance.getSlashCommand();
        expect(result).toBeInstanceOf(SlashCommandBuilder);
        expect(result).not.toBeNull();
        expect(result).toBeDefined();
    });
});