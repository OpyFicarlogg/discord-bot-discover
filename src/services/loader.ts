import { readdirSync} from "fs";
import { injectable } from "inversify";
import path from "path";
import { ToLoad } from "dto/toLoad";
import { myContainer } from "config/inversify.config";
import { DYNAMIC_LOAD, LOAD_TYPES } from "config/types";
import { AbstractMessage } from "dto/abstractMessage";
import { AbstractCommand } from "dto/abstractCommand";


@injectable()
export class Loader{

    public loadCommands() {
        return this.load<AbstractCommand>(LOAD_TYPES.command);
    }

    public loadMessages() {
        return this.load<AbstractMessage>(LOAD_TYPES.message);
    }

    //https://www.typescriptlang.org/docs/handbook/2/generics.html
    private load<Type>(folder: string)  {
        let retMap : Map<string, Type> = new Map();
        
        const patho : string = path.join(process.cwd(),"src", "services",folder, "impl");
  
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
    //https://stackoverflow.com/questions/33800497/check-if-an-object-implements-an-interface-at-runtime-with-typescript
    //https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
    private instanceOfToLoad(object: any): object is ToLoad {
        return 'getName'  in object;
    }
}
