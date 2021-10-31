import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sex } from 'src/app/_enums/sex.enum';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss']
})
export class PatientCardComponent implements OnInit {
  @Input() patientData!: Patient;
  @Input() showMode = false;
  @Output() eventEditPatient: EventEmitter<Patient> = new EventEmitter();
  @Output() eventShowMore: EventEmitter<boolean> = new EventEmitter();

  sex = {
    [Sex.Man]: 'Man',
    [Sex.Woman]: 'Woman',
  }

  constructor() {}

  ngOnInit(): void {}

  
  editToggle() {
    // this.editMode = !this.editMode;
    this.eventEditPatient.emit(this.patientData);
  }
}
