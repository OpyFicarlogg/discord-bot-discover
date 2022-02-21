import { readdirSync} from "fs";
import { injectable } from "inversify";
import path from "path";
import { Command } from "../commands/interfaces/command";
import { ToLoad } from "../dto/toLoad";
import { myContainer } from "../config/inversify.config";
import { DYNAMIC_LOAD, LOAD_TYPES } from "../config/types";
import { CustomMessage } from "./customMessage";


@injectable()
export class Loader{

    public loadCommands() {
        return this.load<Command>(LOAD_TYPES.command);
    }

    public loadMessages() {
        return this.load<CustomMessage>(LOAD_TYPES.message);
    }

    //https://www.typescriptlang.org/docs/handbook/2/generics.html
    private load<Type>(folder: string)  {
        let retMap : Map<string, Type> = new Map();
        
        const patho : string = path.join(process.cwd(),"src", folder, "impl");
  
        let files = readdirSync(patho)
        .filter((file) => file.endsWith('.ts'));
  
        for(var i = 0; i < files.length ; i++) {
            let symbol = DYNAMIC_LOAD.get(folder)?.get(files[i]);
            if(symbol){
                let cmd : Type = myContainer.get<Type>(symbol);

                if(this.instanceOfToLoad(cmd)){
                    retMap.set(cmd.getName(),cmd);
                }    
            }               
        }
        return retMap ;   
    }

    //https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
    //https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
    private instanceOfToLoad(object: any): object is ToLoad {
        return 'getName'  in object;
    }
}
