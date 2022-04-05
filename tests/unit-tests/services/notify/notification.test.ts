// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import { DiscordMock} from "../../../helpers/discordMock";
import { FileUserDao } from "dao/fileUserDao";
import { User as CustomUser } from "dto/user";

import 'jest';
import createMockInstance from "jest-create-mock-instance";
import Notification from "@notify/notification";



describe('notification handler', () => {
    const mockedFileUserDao : jest.Mocked<FileUserDao> = createMockInstance (FileUserDao);
    const discordMock = new DiscordMock();
    let instance: Notification;
    const guildId = discordMock.getMockGuild().id;

    beforeEach(() => {       
        instance = new Notification(mockedFileUserDao);  
    });

    it.each([
        [true, "Notifications activées pour"],
        [false, "Notification déjà active pour"],
      ])('should add the user to the notification list', async (ret, msg) => {
        mockedFileUserDao.addUser.mockReturnValueOnce(ret);
        let res : string = instance.activateNotification(guildId, discordMock.getMockUser(), new CustomUser(discordMock.getMockUser().id));

        expect(mockedFileUserDao.addUser).toBeCalled();
        expect(res).toBe(`${msg} ${discordMock.getMockUser()}`);
        
    });


    it('should remove the user to the notification list', async () => {
        mockedFileUserDao.addUser.mockReturnValueOnce(true);
        let res : string = instance.disableNotification(guildId,discordMock.getMockUser());

        expect(mockedFileUserDao.deleteUser).toBeCalled();
        expect(mockedFileUserDao.deleteUser).toBeCalledWith(guildId, discordMock.getMockUser().id);
        expect(res).toBe(`Notifications désactivées pour ${discordMock.getMockUser()}`);
    });

});