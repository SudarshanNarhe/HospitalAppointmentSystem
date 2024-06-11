import { Component, Injectable, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [MatIconModule,RouterModule,MatButtonModule,HttpClientModule,CommonModule],
  providers:[BackendDataService],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit{

  doctors!:Doctor[];
  user!:string;
  docuser!:Users;
  speciality!:Specility;
  saveDoc:boolean=false;

  constructor(private service : BackendDataService, private snackBar: MatSnackBar,private router : Router){
   
  }

  ngOnInit(): void {
    this.getDoctors();
    this.getSession();
  }

  getDoctors(){
    this.service.getAllDoctors().subscribe(res =>{
      this.doctors=res;
      console.log(this.doctors);
      this.doctors.forEach(element => {
      //  console.log(element.userID);
        this.getUser(element.userID);
      //  console.log(element.specialtyID);
        this.getSpecilities(element.specialtyID);
      });
      
    })
  }

  getUser(userId:number){
     this.service.getUserById(userId).subscribe(res=>{
      this.docuser=res;
      console.log(this.docuser);
    })
  }

  getSpecilities(speId:number){
      this.service.getSpecilityById(speId).subscribe(res =>{
        this.speciality=res;
        console.log(this.speciality);
      })
  }

  saveDoctor(){
    this.saveDoc=true;
  }

  updateUser(docId:number){
    console.log('in update '+docId);
  }

  deleteUser(docId:number){
    console.log('in delete '+docId);
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

}
