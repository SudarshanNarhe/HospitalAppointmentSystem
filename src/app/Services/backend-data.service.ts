import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Users  } from '../Model/users';
import { Doctor } from '../Model/doctor';
import { Patient } from '../Model/patient';
import { Login } from '../Model/login';
import { DoctorsComponent } from '../Pages/doctors/doctors.component';

@Injectable({
  providedIn: 'root',
})
export class BackendDataService {

 private url = "http://localhost:44424/api/";

 //user! : Users;
 loginUser! : Login;

  constructor(private http : HttpClient, private doctor : DoctorsComponent) 
  {
   
  }

  //get userrole
  getUserRoles():Observable<any>{
    return this.http.get<any>(this.url+"UserRole/GetUserRoles").pipe(catchError(this.errorHandler));
  }

  //add user 
  addUser(user : Users):Observable<any>{

    if(this.doctor.saveDoc){
      user.userrole_id=3;
    }
    else{
      user.userrole_id=2
    }
    return this.http.post<any>(this.url+"User/AddUser",user).pipe(catchError(this.errorHandler));

  }
  //delete user
  deleteUser(userId: number):Observable<any>{
    return this.http.delete<any>(`${this.url}User/DeleteUser/${userId}`).pipe(catchError(this.errorHandler));
  }

  //get user by id
  getUserById (userId:number):Observable<any>{
    return this.http.get<any>(`${this.url}User/GetUserById/${userId}`).pipe(catchError(this.errorHandler));
  }

  //update user
  updateUser(user:Users):Observable<any>{
    return this.http.put<any>(`${this.url}User/EditUser`,user).pipe(catchError(this.errorHandler));
  }
  //get all users
  getAllUsers():Observable<any>{
    return this.http.get<any>(this.url+"User/GetUsers").pipe(catchError(this.errorHandler));
  }

  //get all doctors
  getAllDoctors():Observable<any>{
    return this.http.get<any>(`${this.url}Doctor/GetDoctors`).pipe(catchError(this.errorHandler));
  }

  login(username : string, password : string):Observable<any>{
    this.loginUser = new Login(username,password);
    return this.http.post<any>(this.url+"User/Login",this.loginUser).pipe(catchError(this.errorHandler));
  }

  setSession(user:Users):Observable<any>{
    return this.http.post<any>(`${this.url}User/SetSession`,user, { withCredentials: true }).pipe(catchError(this.errorHandler));
  }

  getSession():Observable<any>{
    return this.http.get<any>(this.url+"User/GetSession",{ withCredentials: true }).pipe(catchError(this.errorHandler));
  }

  clearSession():Observable<any>{
    return this.http.delete<any>(this.url+"User/Logout",{ withCredentials: true }).pipe(catchError(this.errorHandler));
  }

  getSpecilities():Observable<any[]>{
    return this.http.get<any[]>(this.url+"Specility/GetSpecility").pipe(catchError(this.errorHandler));
  }

  //get specility by id
  getSpecilityById(specialtyID : number):Observable<any>{
    return this.http.get<any>(`${this.url}Specility/GetSpecilityById/${specialtyID}`).pipe(catchError(this.errorHandler));
  }

   addDoctor(doctor :Doctor):Observable<Doctor>{
     return this.http.post<Doctor>(`${this.url}Doctor/AddDoctor`,doctor).pipe(catchError(this.errorHandler));
   }

   getUserByName(name : string):Observable<Users>{
      return this.http.get<Users>(`${this.url}User/GetUserByName/${name}`).pipe(catchError(this.errorHandler));
   }

   addPatient(patient : Patient){
     return this.http.post<Patient>(`${this.url}Patient/AddPatient`,patient).pipe(catchError(this.errorHandler));
   }


  errorHandler(error:any){
      let errorMsg='';
      if(error.error instanceof ErrorEvent){
        errorMsg = error.error.message;
      }
      else{
        errorMsg = `errorcode : :${error.status}\nMessage:${error.message}`
      }
      console.log(errorMsg);
      return throwError(()=>new Error(errorMsg));
  }

}
