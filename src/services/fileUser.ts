import { User } from '../dto/user';
import file = require('./file');

//TODO: définir un format pour le user stocké (utilisation de TS ?);

export function addUser(serverName: string ,userId: string) : boolean{
   //TODO Ajouter un contrôle si le user y est déjà 
   let lstUser : Array<User>= getUsers(serverName);
   console.log("lstUser "+lstUser);
   if(lstUser === null){
      lstUser = [];
   }      
   
   if(lstUser.findIndex(usr => usr.id = userId) == -1) {
      lstUser.push(<User> {id: userId,minuteLimit : 30});
      file.writeToFile(serverName,lstUser);
      return true;
   }
   return false;
   
   
}

export function updateUser(serverName: string ,user: User) {
   let lstUser : Array<User>= getUsers(serverName);
   let index : number = lstUser.findIndex(usr => usr = user);
   if(index != -1) {
      lstUser[index] = user;
      file.writeToFile(serverName,lstUser);
   }
}

//TODO: A tester (TU à prévoir ? )
export function deleteUser(serverName: string ,userId: string){
   let lstUser : Array<User>= getUsers(serverName);
   if(lstUser.length >0){
      lstUser.splice(lstUser.findIndex(usr => usr.id = userId),1);
   }
   file.writeToFile(serverName,lstUser);
}

export function getUsers (serverName: string) : Array<User>{
   return file.readFromFile(serverName);
}


