const file = require('./file');

//TODO: définir un format pour le user stocké (utilisation de TS ?);

module.exports = {
   addUser : function(serverName,user) {
      //TODO Ajouter un contrôle si le user y est déjà 
      var lstUser = file.readFromFile(serverName);
      console.log("lstUser "+lstUser);
      if(lstUser === null){
         console.log("OKAIDO");
         lstUser = [];
      }      
      lstUser.push({id: user.id});
      file.writeToFile(serverName,lstUser);
   },
   //TODO:Prévoir une méthode deleteUser;

   getUsers : function(serverName){
      var lst = file.readFromFile(serverName);  
      return lst;   
   }

}



