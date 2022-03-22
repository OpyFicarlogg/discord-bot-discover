// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import { DiscordMock} from "../../../helpers/discordMock";
import Notification from "@notify/notification";
import { User as CustomUser } from "dto/user";
import 'jest';
import createMockInstance from "jest-create-mock-instance";
import { User } from "discord.js";
import NotifyMe from "services/messages/impl/notifyme";



describe('notifyme message', () => {
    const mockedNotif : jest.Mocked<Notification> = createMockInstance (Notification);  
    const discordMock = new DiscordMock();
    let instance: NotifyMe;

    beforeEach(() => {       
        instance = new NotifyMe(mockedNotif);  
    });

    it('should return the help string to the user', async () => {

        mockedNotif.activateNotification.mockImplementationOnce((gId: string, usr : User , customUsr?: CustomUser ) => {
            expect(gId).toBe(discordMock.getMockMessage().guild?.id);
            expect(usr.id).toBe(discordMock.getMockMessage().author.id);
            expect(customUsr?.id).toBe(discordMock.getMockMessage().author.id);
            return "";
        });

        instance.execute(discordMock.getMockClient(),discordMock.getMockMessage());

        
        expect(mockedNotif.activateNotification).toBeCalled();
        expect(discordMock.getMockMessage().reply).toBeCalled();

        expect(discordMock.getMockMessage().reply).toBeCalledWith("");
    });

    it('should return name of the message ', async () => {
        expect(instance.getName()).toBe("notifyme");
    });

});