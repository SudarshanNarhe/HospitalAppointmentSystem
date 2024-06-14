import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Doctor } from '../../Model/doctor';
import { BackendDataService } from '../../Services/backend-data.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from '../../Model/users';
import { Specility } from '../../Model/specility';
import { CommonModule } from '@angular/common';
import { DoctorInformation } from '../../Model/doctor-information';
import { from, of } from 'rxjs';
import { catchError, mergeMap, toArray } from 'rxjs/operators';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    RegistrationFormComponent,
    ReactiveFormsModule,
    MatRadioModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
   ],
  providers: [BackendDataService],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  doctors!: Doctor[];
  user!: string;
  docuser!: Users;
  speciality!: Specility;
  isSaveDoc: boolean = false;
  docInformation: DoctorInformation[] = [];
  userForm!: FormGroup;
  DOB!: string | null;
  gender!: string;
  isShowUpdateform: boolean = false;
  startAt: Date;
  specilities!: Specility[];
  selectedSpecialitiesControl = new FormControl([],Validators.required);
  userForUpdate!:Users;
  docForUpdate!:Doctor;


  constructor(
    private service: BackendDataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private builder: FormBuilder
  ) 
  {
    this.startAt = new Date(1990, 0, 1);
  }

  ngOnInit(): void {
    this.getDoctors();
    this.getSession();
    this.getSpecilities();
    this.initializedForm('');
  }

  initializedForm(user?: any) {
    this.userForm = this.builder.group({
      userId: [user?.userId || ''],
      firstName: [user?.firstName || '', Validators.required],
      lastName: [user?.lastName || '', Validators.required],
      userName: [
        user?.userName || '',
        [Validators.required, Validators.minLength(8)],
      ],
      email: [user?.email || '', [Validators.required, Validators.email]],
      contact: [
        user?.contact || '',
        [Validators.required, Validators.minLength(10)],
      ],
      password: [user?.password || ''],
      dateOfBirth: [user?.dateOfBirth || '', Validators.required],
      gender: [user?.gender || '', Validators.required],
      userrole_id: [user?.userrole_id || ''],
    });
  }

  getDoctors() {
    this.service.getAllDoctors().subscribe((res) => {
      this.doctors = res;
      console.log(this.doctors);
      this.doctors.forEach((element) => {
        // console.log(element.doctorID);
        //  this.getUser(element.userID);
        //   this.getSpecilitiesById(element.specialtyID);
        this.service
          .getAllDoctorsInformation(element.doctorID)
          .subscribe((res) => {
            this.docInformation.push(res);
            console.log(this.docInformation);
          });
      });
    });
  }
  getUser(userId: number) {
    this.service.getUserById(userId).subscribe((res) => {
      this.docuser = res;
      // console.log(this.docuser);
    });
  }

  getSpecilities() {
    this.service.getSpecilities().subscribe((res) => {
      this.specilities = res;
    //  console.log(this.specilities);
    });
  }

  getSpecilitiesById(speId: number): Specility {
    this.service.getSpecilityById(speId).subscribe((res) => {
      this.speciality = res;
      //console.log(this.speciality);
    });
    return this.speciality;
  }

  updateUser(docId: number) {
    console.log('in update ' + docId);
    this.isShowUpdateform = true;
    this.service.getdoctorById(docId).subscribe(res =>{
        this.docForUpdate=res;
   
    this.service.getUserById(this.docForUpdate.userID).subscribe(res =>{
      this.user=res;
      console.log(this.user);
      this.initializedForm(this.user);
    });

  });
    
  }

  saveUser(){
      console.log(this.userForm.value);
      
  }

  deleteUser(docId: number) {
    var result = confirm(
      'Are you sure to delete the user of doctorId : ' + docId + '?'
    );

    if (result) {
      this.service.deleteDoctor(docId).subscribe((res) => {
        console.log(res);
        alert('Doctor Deleted Succssfully');
        // this.getDoctors();
      });
    } else {
      this.snackBar.open('User deletion canceled', 'close', {
        duration: 5000,
      });
    }
  }

  getSession() {
    this.service
      .getSession()
      .pipe(
        catchError((error) => {
          alert('Please Login First');
          this.router.navigate(['/login']);
          console.log(error);
          return of(null);
        })
      )
      .subscribe((data) => {
        this.user = data.username;
        console.log(this.user);
      });
  }

  logout() {
    console.log('in logout');
    this.service.clearSession().subscribe((res) => {
      console.log(res);
      this.snackBar.open('Logout Successful', 'close', { duration: 5000 });
      this.router.navigate(['/home']);
    });
  }
}
