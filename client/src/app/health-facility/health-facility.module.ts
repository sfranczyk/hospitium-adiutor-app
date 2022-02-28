import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthFacilityRoutingModule } from './health-facility-routing.module';
import { HfAddComponent } from './components/hf-add/hf-add.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HfListComponent } from './components/hf-list/hf-list.component';


@NgModule({
  declarations: [
    // HfAddComponent,
    // HfListComponent
  ],
  imports: [
    CommonModule,
    HealthFacilityRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HealthFacilityModule { }
