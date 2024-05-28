import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendDataService } from '../../Services/backend-data.service';
import { HttpClientModule } from '@angular/common/http';
import { UserRole } from '../../Model/user-role';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { Users } from '../../Model/users';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [HttpClientModule,CommonModule,ReactiveFormsModule,MatRadioModule,MatListModule,MatButtonModule],
  providers :[BackendDataService],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements OnInit{

      userForm!:FormGroup;
      userRoles!:UserRole[];
      selectRole!:string;

      constructor(private builder : FormBuilder,private service : BackendDataService)
      {}

      ngOnInit(): void {
        this.getRoles();
        this.initializedForm();
      }

      initializedForm(){
        this.userForm = this.builder.group(
          {
            firstName : ['',Validators.required],
            lastName : ['',Validators.required],
            userName : ['',[Validators.required,Validators.minLength(8)]],
            email : ['',[Validators.required,Validators.email]],
            contact : ['',[Validators.required,Validators.minLength(10)]],
            password : ['',[Validators.required,Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
            confirmPassword : ['',[Validators.required,this.confirmPassValidator.bind(this)]],
            userrole : ['',Validators.required]
          }
        )
      }

      confirmPassValidator(control : AbstractControl){
        const pass = this.userForm?.get('password')?.value;
        const confirmPass = control.value;
        if(pass!==confirmPass){
          return {mismatch : true};
        }
        else{
          return null;
        }
      }

      getRoles(){
        this.service.getUserRoles().subscribe(res => this.userRoles=res)
        console.log(this.userRoles);
      }

      onSelectRole(role:string){
        this.selectRole = role;
      }

      saveUser(){
        console.log(this.selectRole);
          if(this.userForm.valid){
            console.log(this.userForm.value);
            this.service.addUser(this.userForm.value).subscribe(res=>{
              alert('Form Submitted Successful');
              this.userForm.reset();
            } 
            );
           
          }
          else{
            this.userForm.markAllAsTouched();
          }
      }
}
