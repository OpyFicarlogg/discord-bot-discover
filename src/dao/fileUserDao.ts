import { injectable } from 'inversify';
import { IUserDao } from './interfaces/IuserDao';
import { User } from '../dto/user';
import { File } from './file';

@injectable()
export class FileUserDao implements IUserDao{

   private _file : File;

   public constructor(
      file : File
   ) {
       this._file = file;
   }

   public addUser(serverName: string ,userId: string) : boolean{
      let lstUser : Array<User>= this.getUsers(serverName);
      console.log("lstUser "+lstUser);
      if(lstUser === null){
         lstUser = [];
      }      
      
      if(lstUser.findIndex(usr => usr.id = userId) == -1) {
         lstUser.push(<User> {id: userId,minuteLimit : 30});
         this._file.writeToFile(serverName,lstUser);
         return true;
      }
      return false;
      
      
   }

   public updateUser(serverName: string ,user: User) {
      let lstUser : Array<User>= this.getUsers(serverName);
      let index : number = lstUser.findIndex(usr => usr = user);
      if(index != -1) {
         lstUser[index] = user;
         this._file.writeToFile(serverName,lstUser);
      }
   }

   public deleteUser(serverName: string ,userId: string){
      let lstUser : Array<User>= this.getUsers(serverName);
      if(lstUser.length >0){
         lstUser.splice(lstUser.findIndex(usr => usr.id = userId),1);
      }
      this._file.writeToFile(serverName,lstUser);
   }

   public getUsers (serverName: string) : Array<User>{
      return this._file.readFromFile(serverName);
   }
}



