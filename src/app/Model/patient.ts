export class Patient {
    patientId:number;
    userId:number;
    DateOfBirth : string | null;
    gender : string;

    constructor(patientId:number,userId:number,DateOfBirth:string | null,gender:string)
    {
        this.patientId=patientId;
        this.userId=userId;
        this.DateOfBirth=DateOfBirth;
        this.gender=gender;
    }
}
