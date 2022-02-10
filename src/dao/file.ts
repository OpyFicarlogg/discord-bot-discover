import fs = require('fs');
import { injectable } from 'inversify';
import path = require('path');

const JSON_EXT = '.json'
const DIR = 'srvFiles';
//https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js

@injectable()
export class File {
    public writeToFile (name: string ,obj : any){
        let patho = path.join(process.cwd(),DIR);
           
        if (!fs.existsSync(patho)){
            fs.mkdirSync(patho);
        }
        patho = path.join(patho, name+JSON_EXT);
    
        fs.writeFileSync(patho, JSON.stringify(obj), 'utf8');
    }

    public readFromFile(name: string){

        let patho = path.join(process.cwd(), DIR, name+JSON_EXT);
            
        if (fs.existsSync(patho)){
            let obj = fs.readFileSync(patho, 'utf8');
            return obj.length > 0 ? JSON.parse(obj):null;
        } 
        return null;
    
            
    }


}



