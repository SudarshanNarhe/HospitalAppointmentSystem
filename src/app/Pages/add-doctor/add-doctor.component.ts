import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { DatePipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Specility } from '../../Model/specility';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Doctor } from '../../Model/doctor';
import { catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-doctor',
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
    FormsModule,
    MatIconModule,
    RouterModule
  ],
  providers: [BackendDataService, DatePipe],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent implements OnInit {

  userForm!: FormGroup;
  DOB!:string | null;
  gender!:string;
  specilities!: Specility[];
  startAt: Date;
  selectedSpecialitiesControl = new FormControl([]);
  doctor!: Doctor;
  user: any;

  constructor(
    private builder: FormBuilder,
    private service: BackendDataService,
    private datePipe: DatePipe,
    private router : Router,
    private snackBar: MatSnackBar
  )
  {
    this.startAt = new Date(1990, 0, 1);
   
  }

  ngOnInit(): void {
    this.getSpecilities();
    this.initializedForm(); 
    this.getSession();
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
      gender: ['',Validators.required],
      userrole_id:['']
    
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

  getSpecilities() {
    this.service.getSpecilities().subscribe((res) => {
      this.specilities = res;
    //  console.log(this.specilities);
    });
  }

  saveUser() {
    console.log('in saveuser');
    console.log(this.userForm.valid);
  this.DOB = this.datePipe.transform(this.userForm.value.dateOfBirth, 'yyyy-MM-dd')+"T00:00:00";
  console.log(this.DOB);
  this.userForm.value.dateOfBirth=this.DOB;
 //  console.log(this.userForm.value);
    if (this.userForm.valid) {
   //   console.log('in if...');
    
      this.userForm.value.userrole_id=3;
      console.log(this.userForm.value);
      this.service.addUser(this.userForm.value).subscribe((res) => {
        this.saveDoctor();;
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  saveDoctor(){

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
            alert('User Register Successful');
            this.userForm.reset();
            this.router.navigate(['/doctors']);
          });
        });
      }
    });

  }

  getSession(){
    this.service.getSession().pipe(catchError(error =>{
      alert('Please Login First');
      this.router.navigate(['/login']);
      console.log(error);
      return of(null);
     }))
    .subscribe(data =>{
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

}
