import { Component, OnInit } from '@angular/core';
import { BackendDataService } from '../../Services/backend-data.service';
import { HttpClientModule } from '@angular/common/http';
import { Users } from '../../Model/users';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-patients-register',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterModule,MatButtonModule],
  providers:[BackendDataService],
  templateUrl: './doctor-patients-register.component.html',
  styleUrl: './doctor-patients-register.component.css'
})
export class DoctorPatientsRegisterComponent implements OnInit{

    users!:Users[];
      
        constructor(private service : BackendDataService,private snackBar: MatSnackBar){
         
        }

        ngOnInit(): void {
         this.getUsers();
        }

        getUsers(){
            this.service.getAllUsers().pipe(catchError(error => {
               console.error('Error occured during fetching a users data',error);
               return of(null);
            }))
            .subscribe(res =>{
               this.users=res
               console.log(this.users);
            });      
        }

        deleteUser(userId:number){
         var result = confirm('Are you sure to delete the user of userId : '+userId+'?');
         if(result){
            this.service.deleteUser(userId).pipe(catchError(error =>{
               alert('Something else wrong.Please try again later');
               console.log(error);
               return of(null);
            })).subscribe(res =>{
               console.log(res);
               alert('User Deleted Succssfully');
               this.getUsers();
            })
         }
         else{
            this.snackBar.open("User deletion canceled",'close',{
               duration:5000
            });    
         }
         
        }

        
}
