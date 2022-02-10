
import { Container } from "inversify";
import { TYPES } from "./types";
import { FileUserDao } from "../dao/fileUserDao";
import { IUserDao } from "../dao/interfaces/IuserDao";
import { ICustomMessage } from "../services/interfaces/ICustomMessage";
import { CustomMessage } from "../services/customMessage";
import { ICustomStateUpdate } from "../services/interfaces/ICustomStateUpdate";
import { CustomStateUpdate } from "../services/customStateUpdate";
import { File } from "../dao/file";

//.toSelf() sans interface
const myContainer = new Container({ defaultScope: "Singleton" });
//Permet de lier une interface avec une classe
myContainer.bind<IUserDao>(TYPES.IUserDao).to(FileUserDao);
myContainer.bind<ICustomMessage>(TYPES.ICustomMessage).to(CustomMessage);
myContainer.bind<ICustomStateUpdate>(TYPES.ICustomStateUpdate).to(CustomStateUpdate);
myContainer.bind<File>(File).toSelf();

export { myContainer };