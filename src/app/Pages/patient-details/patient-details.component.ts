import { Component, OnInit } from '@angular/core';
import { BackendDataService } from '../../Services/backend-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from '../../Model/users';
import { catchError, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UpdateDataComponent } from '../update-data/update-data.component';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [HttpClientModule,CommonModule,RouterModule,MatButtonModule,MatIconModule,MatDialogModule,MatNativeDateModule],
  providers:[BackendDataService],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit{

  users!:Users[];
  user!:string;
  userforUpdate!:Users;

      constructor(private service : BackendDataService,private snackBar: MatSnackBar,private router : Router,private dialog: MatDialog){
         
      }

      ngOnInit(): void {
        this.getSession();
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

      updateUser(userId:number){
         this.service.getUserById(userId).subscribe(res=>{
            this.userforUpdate=res;
            console.log(this.userforUpdate);
            this.openDialog();
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

      getSession(){
        this.service.getSession().subscribe(data =>{
          this.user=data.username;
          console.log(this.user);
        });
      }

      logout(){
         console.log('in logout');
         this.service.clearSession().subscribe(res =>{
            console.log(res);
            this.snackBar.open("Logout Successful",'close',{duration:5000});
            this.router.navigate(['/home']);
         })
      }

      openDialog() {
         const dialogRef = this.dialog.open(UpdateDataComponent,{
            width: '600px',
            height:'auto',
            data:{user:this.userforUpdate}
         });
     
         dialogRef.afterClosed().subscribe(result => {
           console.log(`Dialog result: ${result}`);
           if(result==true){
            this.ngOnInit();
           }
         });
       }
}
