import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationRoutingModule } from './documentation-routing.module';
import { DocTypeAddComponent } from './components/doc-type-add/doc-type-add.component';
import { UsefullsesModule } from '../usefullses/usefullses.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocTypeListComponent } from './components/doc-type-list/doc-type-list.component';
import { DocAddComponent } from './components/doc-add/doc-add.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DocListComponent } from './components/doc-list/doc-list.component';
import { DocDisplayComponent } from './components/doc-display/doc-display.component';


@NgModule({
  declarations: [
    DocTypeAddComponent,
    DocTypeListComponent,
    DocAddComponent,
    DocListComponent,
    DocDisplayComponent
  ],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    UsefullsesModule
  ],
  exports: [
    DocTypeListComponent,
    DocListComponent
  ]
})
export class DocumentationModule { }
