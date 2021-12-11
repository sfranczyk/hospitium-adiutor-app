import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';
import { DescriptionElementType } from '../../enums/description-element.enum';
import { DocTypeListMode } from '../../enums/doc-type-list-mode.enutm';
import { DescriptionElement, DocumentationType } from '../../models/documentation-type.model';
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

  DescriptionElementType = DescriptionElementType;
  DocTypeListMode = DocTypeListMode;
  mode = DocTypeListMode.List;
  documentationTypesList: DocumentationType[] = [];
  dtToEdit: DocumentationType | undefined;

  isOpen!: boolean[];

  documentationTypeDescription: {type: any, query: string, selectors?: string}[][] = [];

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
    this.service.getListAll().subscribe(list => {
      this.documentationTypesList = 
        this.mode !== DocTypeListMode.SelectList 
        ? list
        : list.filter(x => !x.isUnused);

      this.isOpen = Array.from({length: this.documentationTypesList.length}, () => true);

      this.documentationTypesList.forEach(x => {
        const description: DescriptionElement[] = JSON.parse(x.jsonDescription as string);

        this.documentationTypeDescription.push(description.map((x, i) => ({
          type: +x.type === DescriptionElementType.TextFiled ? 'Pole tekstowe'
              : +x.type === DescriptionElementType.Select ? 'Jednokrotny wybór'
              : +x.type === DescriptionElementType.Radios ? 'Wielokrotny wybór'
              : '',
          query: x.name,
          selectors: x.selectors?.join(", ")
        })));
      });
    });
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

  collapse(i: number) {
    this.isOpen[i] = !this.isOpen[i];
    if (!this.isOpen[i]) {
      this.isOpen = this.isOpen.map((x, j) => j !== i);
    }
    console.log(this.isOpen);
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
