import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './Pages/registration-form/registration-form.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { PatientDetailsComponent } from './Pages/user-details/user-details.component';
import { AppointmentsComponent } from './Pages/appointments/appointments.component';
import { DoctorsComponent } from './Pages/doctors/doctors.component';
import { HomeComponent } from './Pages/home/home.component';
import { AddDoctorComponent } from './Pages/add-doctor/add-doctor.component';

export const routes: Routes = [
    {path:'register',component:RegistrationFormComponent},
    {path:'login',component:LoginPageComponent},
    {path:'patients',component:PatientDetailsComponent},
    {path:'appointment',component:AppointmentsComponent},
    {path:'doctors',component:DoctorsComponent},
    {path:'home',component:HomeComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'addDoctor',component:AddDoctorComponent}
];

