import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentationType } from 'src/app/documentation/models/documentation-type.model';
import { Documentation } from 'src/app/documentation/models/documentation.model';
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


  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService, ) {
    if(!this.router.getCurrentNavigation()?.extras.state) {
      this.router.navigate(['..', 'search'], {relativeTo: this.route});
    }
  }

  ngOnInit() {
    this.patientData = history.state.patient;
  }

  deletePatient() {
    this.toastr.error('You cannot delete patient yet', 'Info')
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

  showDocumentation(document: Documentation) {
    this.router.navigate(['documentation', 'view'], {
      state: {patient: this.patientData, document}
    });
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
