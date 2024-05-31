import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BackendDataService } from '../../Services/backend-data.service';
import { HttpClientModule } from '@angular/common/http';
import { UserRole } from '../../Model/user-role';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Doctor } from '../../Model/doctor';
import { Specility } from '../../Model/specility';
import { Users } from '../../Model/users';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [HttpClientModule,
            CommonModule,
            ReactiveFormsModule,
            MatRadioModule,
            MatListModule,
            MatButtonModule,
            MatSelectModule,
            MatFormFieldModule,
          ],
  providers :[BackendDataService],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements OnInit{

      userForm!:FormGroup;
      userRoles!:UserRole[];
      selectRole!:string;
      specilities! : Specility[];
      showSpecilist : boolean = false;
      selectedSpecialitiesControl = new FormControl([]);
      user!:Users;
      doctor!:Doctor;

      constructor(private builder : FormBuilder,private service : BackendDataService)
      {}

      ngOnInit(): void {
        this.getRoles();
        this.getSpecilities();
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
        if(this.selectRole==='doctor'){
          this.showSpecilist=true;      
        }
        if(this.selectRole==='patient'){
          this.showSpecilist=false;  
        }
        if(this.selectRole==='admin'){
          this.showSpecilist=false;  
        }
        console.log(this.selectRole)
      }
      
      getSpecilities(){
        this.service.getSpecilities().subscribe(res=> {
          this.specilities=res
          console.log(this.specilities);
        });
       
      }

      hideSpecilist(){
        this.showSpecilist=false;
        this.selectedSpecialitiesControl.reset([]);
      }

      saveUser(){
        console.log(this.selectRole);

          if(this.userForm.valid){
            console.log(this.userForm.value);
          
            this.service.addUser(this.userForm.value).subscribe(res=>{
              this.saveDoctor();
            } 
            );
           
          }
          else{
            this.userForm.markAllAsTouched();
          }
      }

      saveDoctor(){
        const name = this.userForm.get('email')?.value;
        this.service.getUserByName(name).subscribe(res =>{
          this.user=res;
          console.log(this.user)
         console.log(this.selectedSpecialitiesControl.value);
        const selectedSpecialities = this.selectedSpecialitiesControl.value;
       // Check if the value is an array and transform it
        if (Array.isArray(selectedSpecialities)) {
          const transformedSpecialities = selectedSpecialities.map(speciality => {
            // Create a new object without the specialityName
            const { specialtyID, specialtyName } = speciality;
            return specialtyID;
          });

          // Print the transformed specialities
          transformedSpecialities.forEach(speciality => {
             this.doctor=new Doctor(0,this.user.userId,speciality);
            console.log(speciality);
            console.log(this.doctor);
            this.service.addDoctor(this.doctor).subscribe(res =>{
              alert('Form Submitted Successful');
              this.hideSpecilist();
              this.userForm.reset();
            });
          });

        }

        });
          
      }
}
