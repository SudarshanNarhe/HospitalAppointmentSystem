import { Component, OnInit } from '@angular/core';
import { Users } from '../../Model/users';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BackendDataService } from '../../Services/backend-data.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatButtonModule,HttpClientModule,RouterModule,RouterOutlet],
  providers : [BackendDataService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
    
    user!:Users;
    loginForm!:FormGroup;

    constructor(private builder : FormBuilder,private service : BackendDataService, private router : Router){

    }
  ngOnInit(): void {
    this.initilizedForm();
  }

    initilizedForm(){
        this.loginForm = this.builder.group(
          {
            userName:['',Validators.required],
            password : ['',Validators.required]
          }
        )
    }

    onSubmit(){
      if(this.loginForm.valid){
        console.log(this.loginForm.value);
        const username = this.loginForm.get('userName')?.value;
        const password = this.loginForm.get('password')?.value;
        this.service.login(username,password).pipe(catchError(error => {
          console.error('Error occurred during login:', error);
          alert('Something else wrong. Please try again later.');
          this.loginForm.reset();
          // Return an observable that emits null to ensure the rest of the code handles the error
          return of(null);
        })).subscribe(res =>{
          this.user=res;
         if(this.user===null){
            alert('No user found Please enter valid username and password');
            this.loginForm.reset();
          }
          else
          {
              console.log(this.user);
              console.log(this.user.userName);
              console.log(this.user.password);
              if(this.user.userName===username && this.user.password===password){
                // this.service.setSession(username).subscribe(res=>{
                //   console.log(res);
                // })
                alert('Login Successful');
                this.loginForm.reset();
                this.router.navigate(['/PDregister']);
              }
           }
        })
      }
      else{
        this.loginForm.markAllAsTouched();
      }
    }

}
