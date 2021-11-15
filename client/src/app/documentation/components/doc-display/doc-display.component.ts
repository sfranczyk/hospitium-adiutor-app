import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/patient/models/patient.model';
import { DescriptionElementType } from '../../enums/description-element.enum';
import { DescriptionElement } from '../../models/documentation-type.model';
import { Documentation } from '../../models/documentation.model';

@Component({
  selector: 'app-doc-display',
  templateUrl: './doc-display.component.html',
  styleUrls: ['./doc-display.component.scss']
})
export class DocDisplayComponent implements OnInit {
  document!: Documentation;
  patient!: Patient;

  DescriptionElementType = DescriptionElementType;

  documentContent!: {
    query: string,
    content: string
  }[];

  constructor(
    private router: Router
  ) {
    if(!this.router.getCurrentNavigation()?.extras.state) {
      this.router.navigate(['patient', 'search']);
    }
  }

  ngOnInit(): void {
    this.patient = history.state.patient as Patient;
    this.document = history.state.document as Documentation;

    console.log(document);

    const description: DescriptionElement[] = JSON.parse(this.document.contentDescription as string);
    const content: [] = JSON.parse(this.document.content);

    this.documentContent = description.map((x, i) => ({
      query: x.name,
      content: +x.type === DescriptionElementType.Radios
        ? x.selectors!.filter((y, j) => content[i][j]).join('; ')
        : content[i]
    }));
  }

  navigateToPatient() {
    this.router.navigate(['patient', 'more'], {state: {patient: this.patient} });
  }

}
