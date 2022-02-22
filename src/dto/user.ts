export class User {
    //TODO: voir comment faire un bon constructeur 
    public constructor(id: string){
        this.id = id;
    }

    
    // id of the user 
    public id : string;
    // define last notification date 
    public lastDateNotification : Date | undefined | null;
    // define the number of user from the last notification 
    public lastNumberUser : number | undefined | null;
    //define number of user to be notified 
    public userLimit: number | undefined | null;
    // define time in minute before next notification 
    public minuteLimit: number | undefined | null;
}

 //let user : User = <User>{id: "test"};
