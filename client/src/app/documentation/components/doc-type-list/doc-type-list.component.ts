import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';
import { DocumentationType } from '../../models/documentation-type.model';
import { DocumentationTypeService } from '../../service/documentation-type.service';

@Component({
  selector: 'app-doc-type-list',
  templateUrl: './doc-type-list.component.html',
  styleUrls: ['./doc-type-list.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true } }]
})
export class DocTypeListComponent implements OnInit {
  editMode = false;
  documentationTypesList: DocumentationType[] = [];
  dtToEdit: DocumentationType | undefined;

  constructor(private service: DocumentationTypeService, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getListAll().subscribe(list =>
      this.documentationTypesList = list
    );
  }

  deleteDocumentationType(dt: DocumentationType, index: number) {
    this.service.delete(dt.id as number).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
    this.documentationTypesList[index].isUnused = true;
  }

  restoreDocumentationType(dt: DocumentationType, index: number) {
    this.service.restore(dt.id as number).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });
    this.documentationTypesList[index].isUnused = false;
  }

  editToggle(dt: DocumentationType) {
    this.dtToEdit = dt;
    this.editMode = !this.editMode;
  }

  cancelEditMode(event: boolean) {
    this.editMode = event;
    this.getData();
  }

  navigateToAdd(){
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }
}
