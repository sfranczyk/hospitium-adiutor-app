import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';
import { DocTypeListMode } from '../../enums/doc-type-list-mode.enutm';
import { DocumentationType } from '../../models/documentation-type.model';
import { DocumentationTypeService } from '../../service/documentation-type.service';

@Component({
  selector: 'app-doc-type-list',
  templateUrl: './doc-type-list.component.html',
  styleUrls: ['./doc-type-list.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true } }]
})
export class DocTypeListComponent implements OnInit {
  @Input() selectMode?: boolean;
  @Output() documentationTypeEmit: EventEmitter<DocumentationType | undefined> = new EventEmitter();

  DocTypeListMode = DocTypeListMode;
  mode = DocTypeListMode.List;
  documentationTypesList: DocumentationType[] = [];
  dtToEdit: DocumentationType | undefined;

  constructor(
    private service: DocumentationTypeService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.selectMode) {
      this.mode = DocTypeListMode.SelectList;
    }
    this.getData();
  }

  getData() {
    this.service.getListAll().subscribe(list =>
      this.documentationTypesList = 
        this.mode !== DocTypeListMode.SelectList 
        ? list
        : list.filter(x => !x.isUnused)
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
    this.mode = (this.mode === DocTypeListMode.List) ? DocTypeListMode.Edit : DocTypeListMode.List;
  }

  cancelEditMode(event: boolean) {
    if (!event) {
      this.mode = DocTypeListMode.List;
    }
    this.getData();
  }

  navigateToAdd(){
    this.router.navigate(['..', 'add'], { relativeTo: this.activatedRoute });
  }

  returnTypeToFill(type: DocumentationType){
    this.documentationTypeEmit.emit(type);
  }

  cancel() {
    this.documentationTypeEmit.emit();
  }
}
