import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentDetails } from '../../models/department.model';
import { HealthFacility } from '../../models/health-facility.model';
import { HealthFacilityService } from '../../services/health-facility.service';

@Component({
  selector: 'app-hf-add',
  templateUrl: './hf-add.component.html',
  styleUrls: ['./hf-add.component.scss']
})
export class HfAddComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  @Input() hfEdit: HealthFacility | undefined;

  public editMode = false;
  public redirect = false;
  public hfFormGroup: FormGroup;

  constructor(
    private hfService: HealthFacilityService, 
    private toastr: ToastrService, 
    private fb: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute, 
  ) {
    this.hfFormGroup = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      departments: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => this.redirect = data.add);
    if (this.hfEdit){
      this.editMode = true;
      this.hfFormGroup.patchValue({
        name: this.hfEdit.name,
        city: this.hfEdit.city
      });
      this.hfFormGroup.controls["departments"] = this.fb.array(
        this.hfEdit.departments.map(x => this.fb.control((x as DepartmentDetails).name, Validators.required))
      );
    }
  }

  send() {
    const hf = this.hfFormGroup.value as HealthFacility;

    hf.departments = (hf.departments as string[]).filter(x => x.replace(/\s/g, '') !== '');

    hf.id = this.hfEdit?.id; 
    const observ = this.editMode
      ? this.hfService.upadte(hf) 
      : this.hfService.post(hf);
    
    observ.subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
  }

  get departments() {
    return this.hfFormGroup.controls["departments"] as FormArray;
  }

  addDepartment() {
    const departmentForm = this.fb.control('', Validators.required);
    this.departments.push(departmentForm);
  }

  deleteDepartment(index: number) {
    this.departments.removeAt(index);
  }

  cancel() {
    if(this.redirect){
      this.router.navigate(['..'], { relativeTo: this.activatedRoute });
    }
    this.cancelRegister.emit(false);
  }
}
