import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patient } from 'src/app/patient/models/patient.model';
import { DescriptionElementType } from '../../enums/description-element.enum';
import { DescriptionElement, DocumentationType } from '../../models/documentation-type.model';
import { Documentation } from '../../models/documentation.model';
import { DocumentationService } from '../../service/documentation.service';

@Component({
  selector: 'app-doc-add',
  templateUrl: './doc-add.component.html',
  styleUrls: ['./doc-add.component.scss']
})
export class DocAddComponent implements OnInit {
  documentType!: DocumentationType;
  patient!: Patient;
  
  documentName!: string;
  documentFormArray!: FormArray;
  contentFormArray!: FormArray;

  DescriptionElementType = DescriptionElementType;

  constructor(
    private service: DocumentationService, 
    private toastr: ToastrService, 
    private fb: FormBuilder,
    private router: Router
  ) {
    if(!this.router.getCurrentNavigation()?.extras.state) {
      this.router.navigate(['patient', 'search']);
    }
  }

  ngOnInit(): void {
    this.patient = history.state.patient as Patient;
    this.documentType = history.state.type as DocumentationType;

    this.documentName = this.documentType.name;
    const description: DescriptionElement[] = JSON.parse(this.documentType.jsonDescription);

    this.documentFormArray = this.fb.array(
      description.map(x => {
        switch (+x.type) {
          case DescriptionElementType.TextFiled:
            return this.fb.group({
              type: [{value: x.type, disabled: true}, Validators.required],
              name: [{value: x.name, disabled: true}, Validators.required]
            });
          case DescriptionElementType.Select:
            return this.fb.group({
              type: [{value: x.type, disabled: true}, Validators.required],
              name: [{value: x.name, disabled: true}, Validators.required],
              selectors: this.fb.array(
                x.selectors!.map(s => this.fb.control({value: s, disabled: true}, Validators.required))
              )
            });
          case DescriptionElementType.Radios:
            return this.fb.group({
              type: [{value: x.type, disabled: true}, Validators.required],
              name: [{value: x.name, disabled: true}, Validators.required],
              selectors: this.fb.array(
                x.selectors!.map(s => this.fb.control({value: s, disabled: true}, Validators.required))
              )
            });
          default:
            return;
        }
      })
    );

    this.contentFormArray = this.fb.array(
      description.map(x => {
        switch (+x.type) {
          case DescriptionElementType.TextFiled:
            return this.fb.control('', Validators.required);
          case DescriptionElementType.Select:
            return this.fb.control(x.selectors![0], Validators.required);
          case DescriptionElementType.Radios:
            return this.fb.array(x.selectors!.map(s => this.fb.control(false, Validators.required)));
          default:
            return;
        }
      })
    );
  }

  onSubmit() {
    const doc: Documentation = {
      typeId: (this.documentType.id as number),
      patientId: (this.patient.id as number),
      content: JSON.stringify(this.contentFormArray.value)
    }

    this.service.post(doc).subscribe(response => {
      console.log(response);
      this.navigateToPatient();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  getGroup(element: AbstractControl): FormGroup {
    return element as FormGroup;
  }

  getControl(element: AbstractControl): FormControl {
    return element as FormControl;
  }

  getArray(element: AbstractControl): FormArray {
    return element as FormArray;
  }

  navigateToPatient() {
    this.router.navigate(['patient', 'more'], {state: {patient: this.patient} });
  }

}
