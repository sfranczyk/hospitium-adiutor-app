import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentDetails } from '../../models/department.model';
import { HealthFacility } from '../../models/health-facility.model';
import { HealthFacilityService } from '../../services/health-facility.service';

@Component({
  selector: 'app-hf-list',
  templateUrl: './hf-list.component.html',
  styleUrls: ['./hf-list.component.scss']
})
export class HfListComponent implements OnInit {
  editMode = false;
  healthFacilityList: HealthFacility[] = [];
  hfToEdit: HealthFacility | undefined;

  constructor(private hfService: HealthFacilityService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.hfService.getAll().subscribe(list =>
      this.healthFacilityList = list
    );
  }

  deleteHealthFacility(hf: HealthFacility, index: number) {
    this.hfService.delete(hf.id as number).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
    this.healthFacilityList.splice(index, 1);
  }

  editToggle(hf: HealthFacility) {
    this.hfToEdit = hf;
    this.editMode = !this.editMode;
  }

  cancelEditMode(event: boolean) {
    this.editMode = event;
    this.getData();
  }

  departmentsAsString(list: DepartmentDetails[] | string[]): string {
    return list.map(x => (x as DepartmentDetails).name).join(', ');
  }

  navigateToAdd(){
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }
}
