import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Users } from '../Model/users';
import { Specility } from '../Model/Specility';

@Injectable({
  providedIn: 'root'
})
export class BackendDataService {

 private url = "http://localhost:44424/api/";

  constructor(private http : HttpClient) { }

  getUserRoles():Observable<any>{
    return this.http.get<any>(this.url+"UserRole/GetUserRoles").pipe(catchError(this.errorHandler));
  }

  addUser(user : Users):Observable<any>{
    if(user.userrole==='admin'){
      user.userrole_id=1;
      return this.http.post<any>(this.url+"User/AddUser",user).pipe(catchError(this.errorHandler));
    }
    else if(user.userrole==='doctor'){
      user.userrole_id=3;
      return this.http.post<any>(this.url+"User/AddUser",user).pipe(catchError(this.errorHandler));
    } 
    else{
      user.userrole_id=2;
      return this.http.post<any>(this.url+"User/AddUser",user).pipe(catchError(this.errorHandler));
    }
  }

  login(username:string, password:string):Observable<any>{
    return this.http.get<any>(`${this.url}User/Login/${username}/${password}`).pipe(catchError(this.errorHandler));
  }

  getSession():Observable<any>{
    return this.http.get<any>(this.url+"User/GetSession").pipe(catchError(this.errorHandler));
  }

  getSpecilities():Observable<Specility[]>{
    return this.http.get<Specility[]>(this.url+"Specility/GetSpecility").pipe(catchError(this.errorHandler));
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
