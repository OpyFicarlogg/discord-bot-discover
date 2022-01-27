const fs = require('fs');
const path = require('path');
const JSON_EXT = '.json'
const DIR = 'srvFiles';
//https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js

module.exports = {
    writeToFile: function(name,obj){
        let patho = path.join(__dirname, DIR);
       
        if (!fs.existsSync(patho)){
            fs.mkdirSync(patho);
        }
        patho = path.join(patho, name+JSON_EXT);

        fs.writeFile(patho, JSON.stringify(obj), 'utf8', ()=> console.log("written"));
    },

    readFromFile: function(name){

        let patho = path.join(__dirname, DIR, name+JSON_EXT);
        
        if (fs.existsSync(patho)){
            obj = fs.readFileSync(patho, 'utf8');
            return obj.length > 0 ? JSON.parse(obj):null;
        } 
        return null;

        
    }
  };




