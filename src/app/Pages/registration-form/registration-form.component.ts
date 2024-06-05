import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BackendDataService } from '../../Services/backend-data.service';
import { HttpClientModule } from '@angular/common/http';
import { UserRole } from '../../Model/user-role';
import { CommonModule, DatePipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Doctor } from '../../Model/doctor';
import { Specility } from '../../Model/specility';
import { Users } from '../../Model/users';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { Patient } from '../../Model/patient';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule
  ],
  providers: [BackendDataService, DatePipe],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent implements OnInit {
  userForm!: FormGroup;
  userRoles!: UserRole[];
  selectRole!: string;
  specilities!: Specility[];
  showDoctorDetails: boolean = false;
  selectedSpecialitiesControl = new FormControl([]);
  user!: Users;
  doctor!: Doctor;
  startAt: Date;
  showPatientDetails: boolean = false;
  patient!:Patient;
  DOB!:string | null;
  gender!:string;
  showAdminOption:boolean=false;
  

  constructor(
    private builder: FormBuilder,
    private service: BackendDataService,
    private datePipe: DatePipe
  ) {
    this.startAt = new Date(1990, 0, 1);
  }

  ngOnInit(): void {
    this.getRoles();
    this.getSpecilities();
    this.initializedForm();
  }

  initializedForm() {
    this.userForm = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.minLength(10)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.confirmPassValidator.bind(this)],
      ],
      dateOfBirth: ['',Validators.required],
      gender: ['',Validators.required]
    //  securityKey:new FormControl('')
    });
  }

  confirmPassValidator(control: AbstractControl) {
    const pass = this.userForm?.get('password')?.value;
    const confirmPass = control.value;
    if (pass !== confirmPass) {
      return { mismatch: true };
    } else {
      return null;
    }
  }

  getRoles() {
    this.service.getUserRoles().subscribe((res) => (this.userRoles = res));
    console.log(this.userRoles);
  }

  // onSelectRole(role: string) {
  //   this.selectRole = role;
  //   if (this.selectRole === 'doctor') {
  //     this.showDoctorDetails = true;
  //     this.showPatientDetails = false;
  //     this.showAdminOption=false;
  //   }
  //   if (this.selectRole === 'patient') {
  //     this.showDoctorDetails = false;
  //     this.showPatientDetails = true;
  //     this.showAdminOption=false;
  //   }
  //   if (this.selectRole === 'admin') {
  //     this.showDoctorDetails = false;
  //     this.showPatientDetails = false;
  //     this.showAdminOption=true;
  //   }
  //   console.log(this.selectRole);
  // }

  getSpecilities() {
    this.service.getSpecilities().subscribe((res) => {
      this.specilities = res;
      console.log(this.specilities);
    });
  }

  hideDoctorDetails() {
    this.showDoctorDetails = false;
    this.selectedSpecialitiesControl.reset([]);
  }

  saveUser() {
    console.log('in saveuser');
    console.log(this.userForm.valid);
   // console.log(this.selectRole);
  //  console.log(this.userForm.get('securityKey')?.value);

  this.DOB = this.datePipe.transform(this.userForm.value.dateOfBirth, 'yyyy-MM-dd')+"T00:00:00";
  console.log(this.DOB);
  this.userForm.value.dateOfBirth=this.DOB;

   // const gender = this.userForm.value.gender;
   // console.log(gender);
   console.log(this.userForm.value);
    if (this.userForm.valid) {
      console.log('in if...');
      console.log(this.userForm.value);
      
      this.service.addUser(this.userForm.value).subscribe((res) => {
        // if(this.selectRole==='doctor'){
        //   this.saveDoctor();
        // }
        // else if(this.selectRole==='patient'){
        //   this.savePatient();
        // }

        alert('User Register Successful');
        this.userForm.reset();  

      });
    //  this.saveAdmin();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  saveDoctor() {
    const name = this.userForm.get('email')?.value;
    this.service.getUserByName(name).subscribe((res) => {
      this.user = res;
      console.log(this.user);
      console.log(this.selectedSpecialitiesControl.value);
      const selectedSpecialities = this.selectedSpecialitiesControl.value;
      // Check if the value is an array and transform it
      if (Array.isArray(selectedSpecialities)) {
        const transformedSpecialities = selectedSpecialities.map(
          (speciality) => {
            // Create a new object without the specialityName
            const { specialtyID, specialtyName } = speciality;
            return specialtyID;
          }
        );

        // Print the transformed specialities
        transformedSpecialities.forEach((speciality) => {
          this.doctor = new Doctor(0, this.user.userId, speciality);
          console.log(speciality);
          console.log(this.doctor);
          this.service.addDoctor(this.doctor).subscribe((res) => {
            alert('Form Submitted Successful');
            this.hideDoctorDetails();
            this.userForm.reset();
          });
        });
      }
    });
  }

  savePatient(){
    const name = this.userForm.get('email')?.value;
    this.service.getUserByName(name).subscribe((res) => {
      this.user = res;
      console.log(this.user);
       this.DOB = this.datePipe.transform(this.userForm.value.dob, 'yyyy-MM-dd')+"T00:00:00";
      console.log(this.DOB);
       this.gender = this.userForm.value.gender;
      console.log(this.gender);
       this.patient = new Patient(0,this.user.userId,this.DOB,this.gender)
      console.log(this.patient)
      this.service.addPatient(this.patient).subscribe(res =>{
        alert('Form Submitted Successful');
        this.showPatientDetails=false;
        this.userForm.reset();
      });

    });
  }

  // saveAdmin(){
  //   var securityKey = prompt('Enter a securityKey : ')
  //   if(securityKey==='abcd1234'){
  //     this.service.addUser(this.userForm.value).subscribe(res =>{
  //            alert('Form Submitted Successful');
  //     });
  //   }
  //   else{
  //     alert('Invalid SecurityKey');
  //   }
  // }
}
