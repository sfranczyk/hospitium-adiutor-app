import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent implements OnInit {
  public formGroup!: FormGroup;
  private patients: Patient[] = [];
  public filteredPatients: Patient[] = [];

  constructor(private service: PatientService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      pesel: ['']
    });
    this.getPatients();
  }

  getPatients(): void {
    this.service.getAll().subscribe(x => this.patients = x);
  }

  find() {
    const fgc = this.formGroup.controls;
    this.filteredPatients = 
      this.patients.filter(
        x => x.firstName === fgc.firstName.value 
        || x.lastName === fgc.lastName.value 
        || +x.pesel === +fgc.pesel.value
      );
  }

  navigateToMoreOption(patient: Patient){
    this.router.navigate(['..', 'more'], {relativeTo: this.activatedRoute, state: {patient} });
  }
}
