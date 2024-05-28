import { Component, OnInit } from '@angular/core';
import { Users } from '../../Model/users';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BackendDataService } from '../../Services/backend-data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatButtonModule,HttpClientModule],
  providers : [BackendDataService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
    
    user!:Users;
    loginForm!:FormGroup;

    constructor(private builder : FormBuilder,private service : BackendDataService){

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
        const username:string = this.loginForm.get('userName')?.value;
        const password:string = this.loginForm.get('password')?.value;
        this.service.login(username,password).subscribe(res =>{
          this.user=res;
         if(this.user===null){
            alert('No user found Please enter valid username and password');
            this.loginForm.reset();
          }
          else
          {
              console.log(this.user);
              console.log(this.user.userName);
              console.log(username);
              console.log(password)
              console.log(this.user.password);
              if(this.user.userName===username && this.user.password===password){
                console.log('in if');
                alert('Login Successful');
                this.loginForm.reset();
              }
           }
        })
      }
      else{
        this.loginForm.markAllAsTouched();
      }
    }

}
