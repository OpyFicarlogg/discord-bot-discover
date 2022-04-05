
import { Container } from "inversify";
import path from "path";
import { readdirSync } from "fs";

import { DYNAMIC_LOAD, LOAD_TYPES, TYPES } from "./types";

import { IUserDao } from "dao/interfaces/IuserDao";
import { File } from "dao/file";
import { FileUserDao } from "dao/fileUserDao";

import { AbstractMessage } from "dto/abstractMessage";
import { AbstractCommand } from "dto/abstractCommand";

import { ICustomStateUpdate } from "services/stateUpdate/interfaces/ICustomStateUpdate";
import { CustomStateUpdate } from "services/stateUpdate/customStateUpdate";
import { Loader } from "services/loader";
import { INotification } from "@notify/interfaces/INotification";
import Notification from "@notify/notification";

//.toSelf() sans interface
const myContainer = new Container({ defaultScope: "Singleton" });
//Permet de lier une interface avec une classe
myContainer.bind<IUserDao>(TYPES.IUserDao).to(FileUserDao);
myContainer.bind<ICustomStateUpdate>(TYPES.ICustomStateUpdate).to(CustomStateUpdate);
myContainer.bind<INotification>(TYPES.INotification).to(Notification);
myContainer.bind<Loader>(Loader).toSelf();
myContainer.bind<File>(File).toSelf();
//Load dynamic
loader<AbstractCommand>(LOAD_TYPES.command);
loader<AbstractMessage>(LOAD_TYPES.message);


  //set dependency injection for commands
function loader<Type>( folder : string)  {

  let symbolMap = new Map<string,symbol>();
  const patho : string = path.join(process.cwd(),"src","services", folder, "impl");

  let files = readdirSync(patho)
    .filter((file) => file.endsWith('.ts'));  
    //https://stackoverflow.com/questions/50328582/how-to-dynamically-bind-a-dynamically-imported-type
    for(var i = 0; i < files.length ; i++) {
      //import dynamic 
      let imported = require(`${patho}/${files[i]}`);
      //Ajout dans la liste des symbols pour l'injection de dépendance
      //Obligatoire car il peut y avoir des string identiques dans les commands et messages
      let symbol = Symbol(files[i]);
      symbolMap.set(files[i],symbol);
      myContainer.bind<Type>(symbol).to(imported.default);
    }
    DYNAMIC_LOAD.set(folder,symbolMap);
  }

export { myContainer };