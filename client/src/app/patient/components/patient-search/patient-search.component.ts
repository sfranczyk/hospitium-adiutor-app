import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private service: PatientService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      pesel: ['36896266501', Validators.required]
    });
    this.getPatients();
  }

  getPatients(): void {
    this.service.getAll().subscribe(x => this.patients = x);
  }

  find() {
    const fgc = this.formGroup.controls;
    if (fgc.pesel.valid) {
      const p = this.patients.find(x => +x.pesel === +fgc.pesel.value);
      this.filteredPatients = p ? [p] : [];
    } else if (fgc.firstName.valid && fgc.lastName.valid) {
      this.filteredPatients = this.patients.filter(x => x.firstName === fgc.firstName.value && x.lastName === fgc.lastName.value);
    }
  }
}
