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
  @Input() standardMode = true;
  @Output() eventButton: EventEmitter<boolean> = new EventEmitter();
  // @Output() eventShowMore: EventEmitter<boolean> = new EventEmitter();

  sex = {
    [Sex.Man]: 'Man',
    [Sex.Woman]: 'Woman',
  }

  constructor() {}
  ngOnInit(): void {}

  emitClick() {
    this.eventButton.emit(true);
  }
  
}
