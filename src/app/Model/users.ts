export class Users {
    userId : number;
    firstName : string;
    lastName : string;
    userName : string;
    email : string;
    contact : string;
    password : string;
    userrole : string;
    userrole_id : number;

    constructor(
         userId: number,
         firstName: string,
         lastName: string,
         userName: string,
         email: string,
         contact: string,
         password: string,
         userrole: string,
         userrole_id: number
      ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.contact = contact;
        this.password = password;
        this.userrole = userrole;
        this.userrole_id = userrole_id;
      }

}
