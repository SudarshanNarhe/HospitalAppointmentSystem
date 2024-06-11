import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BackendDataService } from '../../Services/backend-data.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { Users } from '../../Model/users';

@Component({
  selector: 'app-update-data',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [BackendDataService,DatePipe],
  templateUrl: './update-data.component.html',
  styleUrl: './update-data.component.css',
})
export class UpdateDataComponent implements OnInit {
  userForm!: FormGroup;
  startAt: Date;
  DOB!: string | null;
  gender!: string;
  user!:Users;
  isdisable:boolean=true;

  constructor(
    private builder: FormBuilder,
    private service: BackendDataService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    this.startAt = new Date(1990, 0, 1);
    this.user=data.user;
    console.log(this.user);
  }

  ngOnInit(): void {
    this.initializedForm(this.data.user);
  }

  initializedForm(user?: any) {
    this.userForm = this.builder.group({
      userId:[user?.userId || ''],
      firstName: [user?.firstName || '', Validators.required],
      lastName: [user?.lastName || '', Validators.required],
      userName: [user?.userName || '', [Validators.required, Validators.minLength(8)]],
      email: [user?.email || '', [Validators.required, Validators.email]],
      contact: [user?.contact || '', [Validators.required, Validators.minLength(10)]],
      password:[user?.password || ''],
      dateOfBirth: [user?.dateOfBirth || '', Validators.required],
      gender: [user?.gender || '', Validators.required],
      userrole_id:[user?.userrole_id|| ''],
    });
  }
  

  updateUser() 
  {
    console.log('in update');
    if(this.userForm.valid){
      this.DOB = this.datePipe.transform(this.userForm.value.dateOfBirth, 'yyyy-MM-dd')+"T00:00:00";
     console.log(this.DOB);
     this.userForm.value.dateOfBirth=this.DOB;

      console.log(this.userForm.value);
      this.service.updateUser(this.userForm.value).subscribe(res=>{
        console.log(res);
        this.isdisable=false;
      })
    }
  }
}
