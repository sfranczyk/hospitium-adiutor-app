import { Component, Input, OnInit } from '@angular/core';
import { Sex } from 'src/app/_enums/sex.enum';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss']
})
export class PatientCardComponent implements OnInit {
  @Input() patientData!: Patient;

  editMode = false;
  showMode = false;

  sex = {
    [Sex.Man]: 'Man',
    [Sex.Woman]: 'Woman',
  }

  constructor() {}

  ngOnInit(): void {}

  
  editToggle() {
    this.editMode = !this.editMode;
  }

  cancelEditMode(event: boolean) {
    this.editMode = event;
  }

}
