import { User } from "../../dto/user";

export interface IUserDao {

    addUser(serverName: string, customUser : User): boolean;

    updateUser(serverName: string ,user: User) : void;

    deleteUser(serverName: string ,userId: string) : void;

    getUsers (serverName: string) : Array<User>;
}
