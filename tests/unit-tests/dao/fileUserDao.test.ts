// Run dotenv
require('dotenv').config();
import "reflect-metadata";

jest.mock('dao/file');  // <= auto-mock the module
//https://stackoverflow.com/questions/55522669/jest-mocking-of-classes-with-di-dependencies
//https://pawelgrzybek.com/mocking-functions-and-modules-with-jest/
//https://javascript.plainenglish.io/beginners-guide-to-testing-jest-with-node-typescript-1f46a1b87dad

import { FileUserDao } from 'dao/fileUserDao';
import { File } from 'dao/file';
import 'jest';
import { IUserDao } from 'dao/interfaces/IuserDao';
import { User } from "dto/user";

// Matcher doc https://jestjs.io/fr/docs/using-matchers
describe('IUserDao', () => {
    let instance: IUserDao;
    let file : File;
    const severFileName : string = "3892382329992";
    const userIdOne = "1839292";
    const userIdTwo = "8392092";

    beforeEach(() => {
        file =  new File();
        instance = new FileUserDao(file);
        
    });
    //it.only pour exécuter uniquement un test dans le cas d'un bug par exemple
    it('should return empty array', async () => {

        file.readFromFile = jest.fn().mockReturnValue(null);

        expect(instance.getUsers(severFileName)).toEqual([]);
        expect(file.readFromFile).toHaveBeenCalled();

    });

    it('should return list of User', async () => {

        let lstUser : Array<User> = [new User(userIdOne), new User(userIdTwo)];
        file.readFromFile = jest.fn().mockReturnValue(lstUser);

        let lstUserRet = instance.getUsers(severFileName)
        expect(lstUserRet[0].id).toEqual(userIdOne);
        expect(lstUserRet[1].id).toEqual(userIdTwo);
        expect(file.readFromFile).toHaveBeenCalled();
    });

    it('should add a user with default values', async () => {
        let user : User = new User(userIdOne);

        file.readFromFile = jest.fn().mockReturnValue(null);
        file.writeToFile = jest.fn((servername: string ,usr : Array<User>) => {
            expect(usr.length).toEqual(1);
            expect(usr[0].minuteLimit).toEqual(30);
            expect(usr[0].userLimit).toEqual(1);
        });

        expect(instance.addUser(severFileName, user)).toBeTruthy();
        

        expect(file.readFromFile).toHaveBeenCalled();
        expect(file.writeToFile).toHaveBeenCalled();
    });


    it('should not add user because he already exist', async () => {
        let user : User = new User(userIdOne);

        file.readFromFile = jest.fn().mockReturnValue([user]);

        expect(instance.addUser(severFileName, user)).toBeFalsy();
        
        expect(file.readFromFile).toHaveBeenCalled();
        expect(file.writeToFile).not.toHaveBeenCalled();
    });


    it('should update the user', async () => {
        let user : User = new User(userIdOne);
        let date : Date = new Date();

        file.readFromFile = jest.fn().mockReturnValue([user]);
        file.writeToFile = jest.fn((servername: string ,usr : Array<User>) => {
            expect(usr.length).toEqual(1);
            expect(usr[0].id).toEqual(userIdOne);
            expect(usr[0].minuteLimit).toEqual(10);
            expect(usr[0].lastDateNotification).toEqual(date);
        });

        let updatedUser = new User(userIdOne);
        updatedUser.lastDateNotification= date;
        updatedUser.minuteLimit= 10;
        instance.updateUser(severFileName, updatedUser);
        
        expect(file.readFromFile).toHaveBeenCalled();
        expect(file.writeToFile).toHaveBeenCalled();
    });


    it('should not update user because he dont exist', async () => {
        let user : User = new User(userIdOne);
        let date : Date = new Date();

        file.readFromFile = jest.fn().mockReturnValue([user]);

        let updatedUser = new User(userIdTwo);
        updatedUser.lastDateNotification= date;
        updatedUser.minuteLimit= 10;
        instance.updateUser(severFileName, updatedUser);
        
        expect(file.readFromFile).toHaveBeenCalled();
        expect(file.writeToFile).not.toHaveBeenCalled();
    });


    it('should delete user', async () => {
        let user : User = new User(userIdOne);

        file.readFromFile = jest.fn().mockReturnValue([user]);
        file.writeToFile = jest.fn((servername: string ,usr : Array<User>) => {
            expect(usr.length).toEqual(0);
        });

        instance.deleteUser(severFileName, user.id);
        
        expect(file.readFromFile).toHaveBeenCalled();
        expect(file.writeToFile).toHaveBeenCalled();
    });

    it('should not delete user because not in the list', async () => {
        file.readFromFile = jest.fn().mockReturnValue([new User(userIdOne)]);

        instance.deleteUser(severFileName, userIdTwo);
        
        expect(file.readFromFile).toHaveBeenCalled();
        expect(file.writeToFile).not.toHaveBeenCalled();
    });

    it('should not delete user because user list is empty', async () => {

        file.readFromFile = jest.fn().mockReturnValue([]);

        instance.deleteUser(severFileName, userIdTwo);
        
        expect(file.readFromFile).toHaveBeenCalled();
        expect(file.writeToFile).not.toHaveBeenCalled();
    });
});