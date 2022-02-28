import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { UsefullsesModule } from '../usefullses/usefullses.module';
import { PatientSearchComponent } from './components/patient-search/patient-search.component';
import { PatientCardComponent } from './components/patient-card/patient-card.component';
import { PatientManagementComponent } from './components/patient-management/patient-management.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientChangeDepartmentComponent } from './components/patient-change-department/patient-change-department.component';
import { DocumentationModule } from '../documentation/documentation.module';


@NgModule({
  declarations: [
    PatientAddComponent,
    PatientSearchComponent,
    PatientCardComponent,
    PatientManagementComponent,
    PatientListComponent,
    PatientChangeDepartmentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    PatientRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
    DocumentationModule,
    UsefullsesModule,
  ]
})
export class PatientModule { }
