import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Documentation } from '../../models/documentation.model';
import { DocumentationService } from '../../service/documentation.service';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {

  @Input() patientId?: number;
  @Output() cancelEmit = new EventEmitter();

  documentationList!: Documentation[];

  constructor(
    private documentationServce: DocumentationService
  ) {

  }

  ngOnInit(): void {
    if (this.patientId) {
      this.documentationServce.getByPatient(this.patientId).subscribe( list =>
        this.documentationList = list
      );
    }
  }

  showDocument() {
    console.log(this.documentationList);

  }

  cancel() {
    this.cancelEmit.emit();
  }

}
