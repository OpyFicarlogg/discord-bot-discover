// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import { DiscordMock} from "../../../helpers/discordMock";

import 'jest';
import Help from "services/messages/impl/help";



describe('help message', () => {
    const discordMock = new DiscordMock();
    let instance: Help;

    beforeEach(() => {       
        instance = new Help();  
    });

    it('should return the help string to the user', async () => {
        instance.execute(discordMock.getMockClient(),discordMock.getMockMessage());

        expect(discordMock.getMockMessage().reply).toBeCalled();
    });

    it('should return name of the message ', async () => {
        expect(instance.getName()).toBe("help");
    });

});