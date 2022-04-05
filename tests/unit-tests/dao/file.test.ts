// Run dotenv
require('dotenv').config();
import "reflect-metadata";

import fs  from 'fs';
import { File } from 'dao/file';
import { User } from "dto/user";
import 'jest';

jest.mock('fs'); 

describe('File', () => {
    let instance: File;
    const mockedFs = fs as jest.Mocked<typeof fs>;
    // https://jestjs.io/fr/docs/mock-functions  
    //https://stackoverflow.com/questions/51275434/type-of-axios-mock-using-jest-typescript
    //Mock with SpyOn exemple https://stackoverflow.com/questions/52457575/jest-typescript-property-mock-does-not-exist-on-type 
    //https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c

    //Datas
    const userIdOne = "1839292";
    const userIdTwo = "8392092";
    let lstUser : Array<User> = [new User(userIdOne), new User(userIdTwo)];
    const severFileName : string = "3892382329992";

    

    beforeEach(() => {
        instance = new File();  
        mockedFs.existsSync.mockReturnValue(true);  
        //fs.existsSync = jest.fn().mockReturnValue(true);
    });

    it('should get data from file', async () => {

        mockedFs.readFileSync.mockReturnValueOnce(JSON.stringify(lstUser));

        let retUser : Array<User> = instance.readFromFile(severFileName);
        expect(retUser.length).toBe(2);
        expect(retUser).toEqual(lstUser);
        expect(mockedFs.readFileSync).toHaveBeenCalled();
    });

    it('should return null beacause file does not exist ', async () => {
        
        mockedFs.existsSync.mockReturnValueOnce(false);

        expect(instance.readFromFile(severFileName)).toBeNull();
        expect(mockedFs.writeFileSync).not.toHaveBeenCalled();
    });

    it('should return null file is empty', async () => {
        mockedFs.readFileSync.mockReturnValueOnce("");

        expect(instance.readFromFile(severFileName)).toBeNull();
        expect(mockedFs.writeFileSync).not.toHaveBeenCalled();
    });

    it('should write data', async () => {
        mockedFs.writeFileSync.mockImplementationOnce((file: fs.PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView) => {
            expect(data).toBe(JSON.stringify(lstUser));
        });

        instance.writeToFile(severFileName,lstUser);
        expect(mockedFs.writeFileSync).toHaveBeenCalled();
    });

    it('should create file and write', async () => {
        mockedFs.existsSync.mockReturnValueOnce(false);

        mockedFs.writeFileSync.mockImplementationOnce((file: fs.PathOrFileDescriptor, data: string | NodeJS.ArrayBufferView) => {
            expect(data).toBe(JSON.stringify(lstUser));
        });

        instance.writeToFile(severFileName,lstUser);
        expect(mockedFs.writeFileSync).toHaveBeenCalled();
        expect(mockedFs.mkdirSync).toHaveBeenCalled();
    });
});