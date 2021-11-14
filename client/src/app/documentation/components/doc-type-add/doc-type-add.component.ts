import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DescriptionElementType } from '../../enums/description-element.enum';
import { DocumentationType } from '../../models/documentation-type.model';
import { DocumentationTypeService } from '../../service/documentation-type.service';

@Component({
  selector: 'app-doc-type-add',
  templateUrl: './doc-type-add.component.html',
  styleUrls: ['./doc-type-add.component.scss']
})
export class DocTypeAddComponent implements OnInit {
  @Input() typeEdit?: DocumentationType;
  @Output() emitCancel = new EventEmitter();

  DescriptionElement = DescriptionElementType;

  descriptionElementList: {number: DescriptionElementType, name: string}[] = [
    {number: DescriptionElementType.Null, name: 'Choose'},
    {number: DescriptionElementType.TextFiled, name: 'TextFiled'},
    {number: DescriptionElementType.Select, name: 'Select'},
    {number: DescriptionElementType.Radios, name: 'Mark'}
  ];

  typeFormGroup!: FormGroup;


  public editMode = false;
  public redirect = false;

  constructor(
    private toastr: ToastrService, 
    private fb: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: DocumentationTypeService
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
      type: [DescriptionElementType.Null, Validators.required]
    });
    this.description.push(departmentForm);
  }

  deleteElement(index: number) {
    this.description.removeAt(index);
  }

  defineElement(element: any) {
    if (element.value.type === DescriptionElementType.Null){
      return;
    }
    element.addControl('name', this.fb.control('', Validators.required));
    if (+element.value.type === DescriptionElementType.Select || +element.value.type === DescriptionElementType.Radios) {
      element.addControl('selectors', this.fb.array([this.fb.control('', Validators.required)]));
    }
  }

  getSelectors(element: AbstractControl) {
    return (element as FormGroup).controls['selectors'] as FormArray;
  }

  addSelector(element: any) {
    const item = this.fb.control('', Validators.required);
    this.getSelectors(element).push(item);
  }

  deleteSelector(element: AbstractControl, index: number) {
    this.getSelectors(element).removeAt(index);
  }

  onSubmit(): void {
    const correctedDescription = 
      (this.typeFormGroup.value.description as {type: DescriptionElementType, name?: string, selectors?: string[]}[])
        .map(x => +x.type === DescriptionElementType.TextFiled ? x : ({...x, selectors: x.selectors?.filter(s => s)}))
        .filter(x => 
          +x.type === DescriptionElementType.TextFiled || 
          (+x.type === DescriptionElementType.Select || +x.type === DescriptionElementType.Radios) && x.selectors?.length
        );

    const type = {
      name: this.typeFormGroup.value.name,
      jsonDescription: JSON.stringify(correctedDescription)
    }
    
    console.log(type);
    const observ = this.service.post(type);
    
    observ.subscribe(response => {
      this.toastr.success('Type of documentation was added', 'Success');
      this.cancel();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }


  cancel() {
    if(this.redirect){
      this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }
    this.emitCancel.emit(false);
  }

}
