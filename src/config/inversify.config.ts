
import { Container } from "inversify";
import { DYNAMIC_LOAD, LOAD_TYPES, TYPES } from "./types";
import { FileUserDao } from "../dao/fileUserDao";
import { IUserDao } from "../dao/interfaces/IuserDao";
import { ICustomStateUpdate } from "../services/stateUpdate/interfaces/ICustomStateUpdate";
import { CustomStateUpdate } from "../services/stateUpdate/customStateUpdate";
import { File } from "../dao/file";
import path from "path";
import { readdirSync } from "fs";
import { Loader } from "../services/loader";
import { AbstractMessage } from "../dto/abstractMessage";
import { AbstractCommand } from "../dto/abstractCommand";

//.toSelf() sans interface
const myContainer = new Container({ defaultScope: "Singleton" });
//Permet de lier une interface avec une classe
myContainer.bind<IUserDao>(TYPES.IUserDao).to(FileUserDao);
myContainer.bind<ICustomStateUpdate>(TYPES.ICustomStateUpdate).to(CustomStateUpdate);
myContainer.bind<Loader>(Loader).toSelf();
myContainer.bind<File>(File).toSelf();
//Load dynamic
loader<AbstractCommand>(LOAD_TYPES.command).then(() => console.log("end of command DI load"));
loader<AbstractMessage>(LOAD_TYPES.message).then(() => console.log("end of message DI load"));


  //set dependency injection for commands
async function loader<Type>( folder : string)  {

    let symbolMap = new Map<string,symbol>();
    const patho : string = path.join(process.cwd(),"src","services", folder, "impl");

    let files = readdirSync(patho)
      .filter((file) => file.endsWith('.ts'));
  
      //https://stackoverflow.com/questions/50328582/how-to-dynamically-bind-a-dynamically-imported-type
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