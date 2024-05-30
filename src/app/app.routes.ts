import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './Pages/registration-form/registration-form.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { DoctorPatientsRegisterComponent } from './Pages/doctor-patients-register/doctor-patients-register.component';

export const routes: Routes = [
    {path:'register',component:RegistrationFormComponent},
    {path:'login',component:LoginPageComponent},
    {path:'PDregister',component:DoctorPatientsRegisterComponent}
];
