import { injectable } from 'inversify';
import { IUserDao } from './interfaces/IuserDao';
import { User } from 'dto/user';
import { File } from './file';

@injectable()
export class FileUserDao implements IUserDao{

   private _file : File;

   private static readonly DEFAULT_MINUTELIMIT = 30;
   private static readonly DEFAULT_USERLIMIT = 1.

   public constructor(
      file : File
   ) {
       this._file = file;
   }

   public addUser(serverName: string, customUser : User): boolean{
      //Default values
      if(!customUser.userLimit) customUser.userLimit = FileUserDao.DEFAULT_USERLIMIT;
      if(!customUser.minuteLimit) customUser.minuteLimit = FileUserDao.DEFAULT_MINUTELIMIT;

      let lstUser : Array<User>= this.getUsers(serverName);
      if(lstUser.findIndex(usr => usr.id = customUser.id) === -1) {
         lstUser.push(customUser);
         this._file.writeToFile(serverName,lstUser);
         return true;
      }
      else {
         return false;
      }
      
      
   }

   public updateUser(serverName: string ,user: User) {
      let lstUser : Array<User>= this.getUsers(serverName);
      let index : number = lstUser.findIndex((usr : User) => usr.id ===  user.id);
      if(index != -1) {
         lstUser[index] = user;
         this._file.writeToFile(serverName,lstUser);
      }
   }

   public deleteUser(serverName: string ,userId: string){
      let lstUser : Array<User>= this.getUsers(serverName);
      if(lstUser.length >0){
         let index = lstUser.findIndex(usr => usr.id === userId);
         if(index != -1){
            lstUser.splice(index,1);
            this._file.writeToFile(serverName,lstUser);
         }
         
      }
      
   }

   public getUsers (serverName: string) : Array<User>{
      let lstUser : Array<User> = this._file.readFromFile(serverName);
      if(lstUser === null){
         lstUser = [];
      }  
      return lstUser;
   }
}



