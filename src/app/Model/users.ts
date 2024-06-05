export class Users {
    userId : number;
    firstName : string;
    lastName : string;
    userName : string;
    email : string;
    contact : string;
    password : string;
    dateOfBirth :string;
    gender : string;
    userrole_id : number;
    userrole : string;

    constructor(
         userId: number,
         firstName: string,
         lastName: string,
         userName: string,
         email: string,
         contact: string,
         password: string,
         dateOfBirth:string,
         gender: string,
         userrole_id: number,
         userrole : string
      ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.contact = contact;
        this.password = password;
        this.dateOfBirth=dateOfBirth;
        this.gender = gender;
        this.userrole_id = userrole_id;
        this.userrole = userrole;
      }

}
