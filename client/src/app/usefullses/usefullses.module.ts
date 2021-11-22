import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDateComponent } from './select-date/select-date.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../_modules/shared.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { ChipsComponent } from './chips/chips.component';
import { HasRoleDirective } from '../_directives/has-role.directive';



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
    SelectDateComponent,
    ChipsComponent,
    HasRoleDirective,
  ],
  exports: [
    SelectDateComponent,
    HasRoleDirective,
  ],
})
export class UsefullsesModule { }
