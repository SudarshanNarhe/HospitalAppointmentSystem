export class DoctorInformation {

    doctorId:number;
    doctorName:string;
    doctorEmail:string;
    specialtyName:string;
    contact : string;

    constructor(doctorId:number,doctorName:string,doctorEmail:string,specialtyName:string,contact:string)
    {
        this.doctorId=doctorId;
        this.doctorName=doctorName;
        this.doctorEmail=doctorEmail;
        this.specialtyName=specialtyName;
        this.contact=contact;
    }
}
