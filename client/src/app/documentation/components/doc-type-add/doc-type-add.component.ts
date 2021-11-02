import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DescriptionElement } from '../../enums/description-element.enum';
import { DocumentationType } from '../../models/documentation-type.model';

@Component({
  selector: 'app-doc-type-add',
  templateUrl: './doc-type-add.component.html',
  styleUrls: ['./doc-type-add.component.scss']
})
export class DocTypeAddComponent implements OnInit {
  @Input() typeEdit?: DocumentationType;
  @Output() emitCancel = new EventEmitter();

  DescriptionElement = DescriptionElement;

  descriptionElementList: {number: DescriptionElement, name: string}[] = [
    {number: DescriptionElement.Null, name: 'Choose'},
    {number: DescriptionElement.TextFiled, name: 'TextFiled'},
    {number: DescriptionElement.Select, name: 'Select'},
    {number: DescriptionElement.Radios, name: 'Mark'}
  ];

  typeFormGroup!: FormGroup;


  public editMode = false;
  public redirect = false;

  constructor(
    private toastr: ToastrService, 
    private fb: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.typeFormGroup = this.fb.group({
      name: ['', Validators.required],
      description: this.fb.array([])
    });
  }

  get description() {
    return this.typeFormGroup.controls["description"] as FormArray;
  }

  addElement() {
    const departmentForm = this.fb.group({
      type: [DescriptionElement.Null, Validators.required]
    });
    this.description.push(departmentForm);
    console.log(this.description.value);
  }

  deleteElement(index: number) {
    this.description.removeAt(index);
  }

  // getElement(index: number) {
  //   return this.description[index].selecters;
  // }

  // addSelecter(index: number) {


  // }

  onSubmit(): void {
    // console.log(this.patientFormGroup.controls);
    // let patient = this.patientFormGroup.value as Patient;
    // patient.sex = this.sex[patient.sex] as Sex;
    // patient.dateOfBirth = this.dateOfBirth.date;
    
    // patient.id = this.pateintEdit?.id; 
    // const observ = this.editMode
    //   ? this.service.upadte(patient) 
    //   : this.service.post(patient);
    
    // observ.subscribe(response => {
    //   console.log(response);
    //   this.cancel();
    // }, error => {
    //   console.log(error);
    //   this.toastr.error(error.error);
    // });
  }


  cancel() {
    if(this.redirect){
      this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }
    this.emitCancel.emit(false);
  }

}
