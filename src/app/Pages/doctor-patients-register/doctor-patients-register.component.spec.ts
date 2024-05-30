import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientsRegisterComponent } from './doctor-patients-register.component';

describe('DoctorPatientsRegisterComponent', () => {
  let component: DoctorPatientsRegisterComponent;
  let fixture: ComponentFixture<DoctorPatientsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPatientsRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorPatientsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
