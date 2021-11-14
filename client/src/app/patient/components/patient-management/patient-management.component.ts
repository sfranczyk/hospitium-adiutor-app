import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentationType } from 'src/app/documentation/models/documentation-type.model';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-management',
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.scss']
})
export class PatientManagementComponent implements OnInit {
  ManagementMode = ManagementMode;

  public patientData!: Patient;
  public mode = ManagementMode.Display;


  constructor(private router: Router, private route: ActivatedRoute) {
    if(!this.router.getCurrentNavigation()?.extras.state) {
      this.router.navigate(['..', 'search'], {relativeTo: this.route});
    }
  }

  ngOnInit() {
    this.patientData = history.state.patient;
  }

  turnOnEditMode(event: boolean) {
    if (event) {
      this.mode = ManagementMode.Edit;
    }
  }

  turnOnMoveToAnotherDepartmentMode() {
    this.mode = ManagementMode.MoveToAnotherDepartment;
  }

  turnOnSelectDocumentationToFillMode() {
    this.mode = ManagementMode.SelectDocumentationToFill;
  }

  turnOnShowDocumentationListMode() {
    this.mode = ManagementMode.ShowDocumentationList;
  }

  cancelEditMode(event: Patient) {
    if (event) {
      this.patientData = (event as Patient);
    }
    this.mode = ManagementMode.Display;
  }

  tryToAddDocumentation(event: DocumentationType | undefined) {
    if (event) {
      this.navigateToAddDocumentation(event as DocumentationType);
    } else {
      this.mode = ManagementMode.Display;
    }
  }

  navigateToAddDocumentation(type: DocumentationType): void {
    this.router.navigate(['documentation', 'add'], {
      state: {patient: this.patientData, type}
    });
  }
}

export enum ManagementMode {
  Display,
  Edit,
  MoveToAnotherDepartment,
  SelectDocumentationToFill,
  ShowDocumentationList
}
