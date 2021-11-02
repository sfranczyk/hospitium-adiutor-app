import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationRoutingModule } from './documentation-routing.module';
import { DocTypeAddComponent } from './components/doc-type-add/doc-type-add.component';
import { UsefullsesModule } from '../usefullses/usefullses.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    DocTypeAddComponent
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
  ]
})
export class DocumentationModule { }
