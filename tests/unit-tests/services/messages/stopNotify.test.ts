// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import { DiscordMock} from "../../../helpers/discordMock";

import 'jest';
import StopNotify from "services/messages/impl/stopnotify";
import createMockInstance from "jest-create-mock-instance";
import Notification from "@notify/notification";



describe('help message', () => {
    const discordMock = new DiscordMock();
    const mockedNotif : jest.Mocked<Notification> = createMockInstance (Notification); 
    let instance: StopNotify;

    beforeEach(() => {       
        instance = new StopNotify(mockedNotif);  
    });

    it('should return the help string to the user', async () => {
        mockedNotif.disableNotification.mockImplementationOnce(() => "");
        instance.execute(discordMock.getMockClient(),discordMock.getMockMessage());
        

        expect(mockedNotif.disableNotification).toBeCalled();
        expect(discordMock.getMockMessage().reply).toBeCalled();
    });

    it('should return name of the message ', async () => {
        expect(instance.getName()).toBe("stopnotify");
    });

});