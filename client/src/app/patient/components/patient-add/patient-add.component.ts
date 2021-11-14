import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../service/patient.service';
import { Sex } from "src/app/_enums/sex.enum";
import { SelectDateComponent } from 'src/app/usefullses/select-date/select-date.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss']
})
export class PatientAddComponent implements OnInit {
  @ViewChild("dateOfBirth") dateOfBirth!: SelectDateComponent;
  @Input() pateintEdit?: Patient;
  @Output() cancelRegister = new EventEmitter();


  public editMode = false;
  public redirect = false;
  public patientFormGroup!: FormGroup;


  sex: {[id: string] : Sex | string} = {
    'Man': Sex.Man,
    'Woman': Sex.Woman,
    [Sex.Man]: 'Man',
    [Sex.Woman]: 'Woman'
  }

  constructor(
    private service: PatientService, 
    private toastr: ToastrService, 
    private fb: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute, 
  ) { }

  onSubmit(): void {
    let patient = this.patientFormGroup.value as Patient;
    patient.sex = this.sex[patient.sex] as Sex;
    patient.dateOfBirth = this.dateOfBirth.date;
    
    patient.id = this.pateintEdit?.id;

    const observ = this.editMode
      ? this.service.upadte(patient) 
      : this.service.post(patient);
    
    observ.subscribe(response => {
      console.log(response);
      this.cancel(patient);
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  ngOnInit(): void {
    this.patientFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      pesel: ['', Validators.required],
      sex: ['Man', Validators.required],
      placeOfBirth: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });

    if (this.pateintEdit){
      this.editMode = true;
      console.log(this.pateintEdit);
      this.patientFormGroup.patchValue({
        firstName: this.pateintEdit.firstName,
        lastName: this.pateintEdit.lastName,
        pesel: this.pateintEdit.pesel,
        sex: this.sex[this.pateintEdit.sex],
        placeOfBirth: this.pateintEdit.placeOfBirth
      });
    }
  }

  cancel(patient?: Patient) {
    if(this.redirect){
      this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }
    this.cancelRegister.emit(patient);
  }
}
