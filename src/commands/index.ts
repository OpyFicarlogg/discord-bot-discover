import { readdirSync} from "fs";
import path from "path";
import { Command } from "./interfaces/command";

//TODO: Voir pour en faire une classe avec constructeur ? 
export async function getCommands()  {
  let commands : Map<string, Command> = new Map();
  //Creation d'une interface pour commands 
  const commandsPath : string = path.join(__dirname, "impl");

  let files = readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts'));

    for(var i = 0; i < files.length ; i++) {
        let imported = await import(`${commandsPath}/${files[i]}`);
        let cmd : Command = new imported.default();
        commands.set(cmd.getName(),cmd);
    }

    return commands ;   
}