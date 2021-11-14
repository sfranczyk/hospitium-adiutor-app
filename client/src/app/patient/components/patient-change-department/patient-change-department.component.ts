import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DepartmentDetails } from 'src/app/health-facility/models/department.model';
import { DepartmentService } from 'src/app/health-facility/services/department.service';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-patient-change-department',
  templateUrl: './patient-change-department.component.html',
  styleUrls: ['./patient-change-department.component.scss']
})
export class PatientChangeDepartmentComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Input() patient!: Patient;

  departments!: DepartmentDetails[];

  patientLeft!: Patient[];
  patientRight!: Patient[];

  currentDepartment!: DepartmentDetails;
  departmentId!: number;

  constructor(private departmentService: DepartmentService, private patientService: PatientService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.patientLeft = [this.patient];
    this.patientRight = [];

    if (this.patient.department) {
      this.currentDepartment = this.patient.department;
    } else {
      this.currentDepartment = {name: 'Unassigned'};
    }

    this.departmentService.getAll().subscribe(list => {
      this.departments = list;
      if (list.length) {
        this.departmentId = list[0].id as number;
      }
    });
  }

  drop(event: CdkDragDrop<Patient[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  submit() {
    if (this.patientRight.length) {
      this.patientService.moveToDepartment((this.patient.id as number), this.departmentId).subscribe(_ => 
        this.toastr.info('The patient was transferred')
        );
        this.cancelEmit();
    } else {
      this.toastr.info('The patient was not transferred to another department');
      this.cancelEmit();
    }
  }

  cancelEmit() {
    this.cancel.emit(false);
  }

}
