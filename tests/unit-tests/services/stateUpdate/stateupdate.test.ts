// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import { DiscordMock} from "../../../helpers/discordMock";
import { FileUserDao } from "dao/fileUserDao";
import { User as CustomUser } from "dto/user";

import 'jest';
import createMockInstance from "jest-create-mock-instance";
import { CustomStateUpdate } from "services/stateUpdate/customStateUpdate";



describe('custom stateUpdate', () => {
    let mockedFileUserDao : jest.Mocked<FileUserDao>;
    let instance: CustomStateUpdate;
    let discordMock : DiscordMock;

    beforeEach(() => {    
        mockedFileUserDao = createMockInstance (FileUserDao);   
        instance = new CustomStateUpdate(mockedFileUserDao);  
        discordMock = new DiscordMock();
    });

    it.each([
        [undefined],
        [getMinusMinutesDate(32)],
      ])('Should send the notification to the new user ', async (date) => {

        let customUser = new CustomUser(discordMock.getMockUser().id);
        customUser.minuteLimit = 30;
        customUser.userLimit = 0;
        customUser.lastDateNotification = date;
        let lstUser : Array<CustomUser> = [customUser];
        //Mock get user 
        mockedFileUserDao.getUsers.mockReturnValueOnce(lstUser)
        mockedFileUserDao.updateUser.mockImplementation();

        instance.execute(discordMock.getMockClient(),discordMock.getMockOldVoiceState(), discordMock.getMockNewVoiceState())

        expect(mockedFileUserDao.getUsers).toBeCalledWith(discordMock.getMockGuild().id);

        setTimeout(() => { 
            expect(mockedFileUserDao.updateUser).toBeCalled();
            expect(discordMock.getMockUser().send).toBeCalled();

            expect(customUser.lastDateNotification).toBeDefined();
        }, 100);
        
    });


    it.each([
        [getMinusMinutesDate(2), 0], // Last notification date 
        [getMinusMinutesDate(32), 3], // Userlimit 
      ])('Should not send the notification to the user because of last notification, or userLimit ', async (date, userLimit) => {

        let customUser = new CustomUser(discordMock.getMockUser().id);
        customUser.minuteLimit = 30;
        customUser.userLimit = userLimit;
        customUser.lastDateNotification = date;
        let lstUser : Array<CustomUser> = [customUser];
        //Mock get user 
        mockedFileUserDao.getUsers.mockReturnValueOnce(lstUser)

        instance.execute(discordMock.getMockClient(),discordMock.getMockOldVoiceState(), discordMock.getMockNewVoiceState())

        expect(mockedFileUserDao.getUsers).toBeCalledWith(discordMock.getMockGuild().id);

        setTimeout(() => { 
            expect(mockedFileUserDao.updateUser).not.toBeCalled();
            expect(discordMock.getMockUser().send).not.toBeCalled();
        }, 100);
        
    });

    it('Should not send the notification to the user because a bot joined', async () => {

        let oldVoice = discordMock.getMockOldVoiceState();
        oldVoice.member!.user.bot = true;
        instance.execute(discordMock.getMockClient(),oldVoice, discordMock.getMockNewVoiceState())

        expect(mockedFileUserDao.getUsers).not.toBeCalled();
        expect(mockedFileUserDao.updateUser).not.toBeCalled();
        expect(discordMock.getMockUser().send).not.toBeCalled();
        
    });

    it('Should not send the notification because a user leaved', async () => {

        instance.execute(discordMock.getMockClient(),discordMock.getMockNewVoiceState(), discordMock.getMockOldVoiceState())

        expect(mockedFileUserDao.getUsers).not.toBeCalled();
        expect(mockedFileUserDao.updateUser).not.toBeCalled();
        expect(discordMock.getMockUser().send).not.toBeCalled();
        
    });

});

function getMinusMinutesDate( minutes: number) : Date{
    let date = new Date()

    date.setMinutes(date.getMinutes() - minutes)

    return date;     
}
