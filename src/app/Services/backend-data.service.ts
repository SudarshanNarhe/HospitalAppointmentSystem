import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Users  } from '../Model/users';
import { Doctor } from '../Model/doctor';
import { Patient } from '../Model/patient';
import { Login } from '../Model/login';

@Injectable({
  providedIn: 'root'
})
export class BackendDataService {

 private url = "http://localhost:44424/api/";

 //user! : Users;
 loginUser! : Login;

  constructor(private http : HttpClient) { }

  getUserRoles():Observable<any>{
    return this.http.get<any>(this.url+"UserRole/GetUserRoles").pipe(catchError(this.errorHandler));
  }

  //add user 
  addUser(user : Users):Observable<any>{
    user.userrole_id=2
    return this.http.post<any>(this.url+"User/AddUser",user).pipe(catchError(this.errorHandler));

  }
  //delete user
  deleteUser(userId: number){
    return this.http.delete<any>(`${this.url}User/DeleteUser/${userId}`).pipe(catchError(this.errorHandler));
  }
  getAllUsers():Observable<any>{
    return this.http.get<any>(this.url+"User/GetUsers").pipe(catchError(this.errorHandler));
  }

  login(username : string, password : string):Observable<any>{
    this.loginUser = new Login(username,password);
    return this.http.post<any>(this.url+"User/Login",this.loginUser).pipe(catchError(this.errorHandler));
  }

  setSession(username:string):Observable<any>{
    return this.http.post<any>(`${this.url}User/SetSession/${username}`,username).pipe(catchError(this.errorHandler));
  }

  getSession():Observable<any>{
    return this.http.get<any>(this.url+"User/GetSession").pipe(catchError(this.errorHandler));
  }

  getSpecilities():Observable<any[]>{
    return this.http.get<any[]>(this.url+"Specility/GetSpecility").pipe(catchError(this.errorHandler));
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
