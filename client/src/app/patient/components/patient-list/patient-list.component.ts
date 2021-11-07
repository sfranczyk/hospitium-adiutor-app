import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  public filterFormGroup!: FormGroup;
  private patients: Patient[] = [];
  public filteredPatients: Patient[] = [];

  constructor(private service: PatientService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.filterFormGroup = this.fb.group({
      sex: ['', Validators.required]
    });
    this.getPatients();
  }

  getPatients(): void {
    this.service.getAll().subscribe(x => {
      this.patients = x;
      this.filteredPatients = x;
    });
  }

  filter() {
    const fgc = this.filterFormGroup.controls;
    if (fgc.sex.valid) {
      const p = this.patients.find(x => x.sex === fgc.sex.value);
      this.filteredPatients = p ? [p] : [];
    }
  }

  navigateToMoreOption(patient: Patient){
    this.router.navigate(['..', 'more'], {relativeTo: this.activatedRoute, state: {patient} });
  }
}
