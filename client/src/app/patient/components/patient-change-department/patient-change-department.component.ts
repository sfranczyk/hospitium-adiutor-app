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
  JSON = JSON;

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
      this.currentDepartment = {name: 'Nie wyznaczony'};
    }

    this.departmentService.getAll().subscribe(list => {
      this.departments = list.map(x => ({id: +x.id!, name: x.name}));
      if (list.length) {
        this.departmentId = this.departments[0].id!;
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
      this.patientService.moveToDepartment((this.patient.id as number), this.departmentId).subscribe(_ => {
        this.patient.department = this.departments.find(x => x.id === +this.departmentId);
        this.toastr.info('Pacjent został przeniesiony na oddział ' + this.patient.department?.name, 'Sukces');
        this.cancelEmit(this.patient);
      });
        this.cancelEmit();
    } else {
      this.toastr.info('The patient was not transferred to another department');
      this.cancelEmit();
    }
  }

  cancelEmit(patient?: Patient) {
    this.cancel.emit(patient);
  }

}
