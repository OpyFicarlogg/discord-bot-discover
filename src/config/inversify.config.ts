
import { Container } from "inversify";
import { DYNAMIC_LOAD, LOAD_TYPES, TYPES } from "./types";
import { FileUserDao } from "../dao/fileUserDao";
import { IUserDao } from "../dao/interfaces/IuserDao";
import { ICustomMessage } from "../services/interfaces/ICustomMessage";
import { CustomMessage } from "../services/customMessage";
import { ICustomStateUpdate } from "../services/interfaces/ICustomStateUpdate";
import { CustomStateUpdate } from "../services/customStateUpdate";
import { File } from "../dao/file";
import { Command } from "../commands/interfaces/command";
import path from "path";
import { readdirSync } from "fs";
import { Loader } from "../services/loader";

//.toSelf() sans interface
const myContainer = new Container({ defaultScope: "Singleton" });
//Permet de lier une interface avec une classe
myContainer.bind<IUserDao>(TYPES.IUserDao).to(FileUserDao);
myContainer.bind<ICustomMessage>(TYPES.ICustomMessage).to(CustomMessage);
myContainer.bind<ICustomStateUpdate>(TYPES.ICustomStateUpdate).to(CustomStateUpdate);
myContainer.bind<Loader>(Loader).toSelf();
myContainer.bind<File>(File).toSelf();
//Load dynamic
loader<Command>(LOAD_TYPES.command).then(() => console.log("end of command DI load"));
loader<CustomMessage>(LOAD_TYPES.message).then(() => console.log("end of message DI load"));


  //set dependency injection for commands
async function loader<Type>( folder : string)  {

    let symbolMap = new Map<string,symbol>();
    const patho : string = path.join(process.cwd(),"src", folder, "impl");

    let files = readdirSync(patho)
      .filter((file) => file.endsWith('.ts'));
  
      for(var i = 0; i < files.length ; i++) {
          //import dynamic 
          //TODO:Passage en require pour du sync? 
          let imported = await import(`${patho}/${files[i]}`);
          //Ajout dans la liste des symbols pour l'injection de dépendance
          //Obligatoire car il peut y avoir des string identiques dans les commands et messages
          let symbol = Symbol(files[i]);
          symbolMap.set(files[i],symbol);
          myContainer.bind<Type>(symbol).to(imported.default);
      }
      DYNAMIC_LOAD.set(folder,symbolMap);
  }

export { myContainer };