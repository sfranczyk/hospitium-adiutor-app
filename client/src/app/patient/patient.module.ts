import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UsefullsesModule } from '../usefullses/usefullses.module';
import { PatientSearchComponent } from './components/patient-search/patient-search.component';
import { PatientCardComponent } from './components/patient-card/patient-card.component';


@NgModule({
  declarations: [
    PatientAddComponent,
    PatientSearchComponent,
    PatientCardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    PatientRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    UsefullsesModule
  ]
})
export class PatientModule { }
