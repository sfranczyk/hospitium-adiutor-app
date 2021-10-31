import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-management',
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.scss']
})
export class PatientManagementComponent implements OnInit {
  public patientData!: Patient;

  public editMode = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    if(!this.router.getCurrentNavigation()?.extras.state) {
      this.router.navigate(['..', 'search'], {relativeTo: this.route});
    }
  }

  ngOnInit() {
    this.patientData = history.state.patient;
  }

  turnOnEditMode(event: boolean) {
    this.editMode = event;
  }

  cancelEditMode(event: boolean) {
    this.editMode = event;
  }
}
