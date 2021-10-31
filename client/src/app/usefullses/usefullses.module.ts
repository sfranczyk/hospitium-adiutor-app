import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDateComponent } from './select-date/select-date.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../_modules/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
  ],
  declarations: [
    SelectDateComponent
  ],
  exports: [
    SelectDateComponent
  ],
})
export class UsefullsesModule { }
