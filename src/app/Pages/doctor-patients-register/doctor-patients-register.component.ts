import { Component, OnInit } from '@angular/core';
import { BackendDataService } from '../../Services/backend-data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-doctor-patients-register',
  standalone: true,
  imports: [HttpClientModule],
  providers:[BackendDataService],
  templateUrl: './doctor-patients-register.component.html',
  styleUrl: './doctor-patients-register.component.css'
})
export class DoctorPatientsRegisterComponent implements OnInit{

     // user! : string;
      
        constructor(private service : BackendDataService){

        }

        ngOnInit(): void {
           // this.service.getSession().subscribe(res =>this.user=res);
        }
}
