import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './Pages/registration-form/registration-form.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { PatientDetailsComponent } from './Pages/patient-details/patient-details.component';
import { AppointmentsComponent } from './Pages/appointments/appointments.component';
import { DoctorsComponent } from './Pages/doctors/doctors.component';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
    {path:'register',component:RegistrationFormComponent},
    {path:'login',component:LoginPageComponent},
    {path:'patients',component:PatientDetailsComponent},
    {path:'appointment',component:AppointmentsComponent},
    {path:'doctors',component:DoctorsComponent},
    {path:'home',component:HomeComponent},
    {path:'',redirectTo:'/home',pathMatch:'full'}
];

