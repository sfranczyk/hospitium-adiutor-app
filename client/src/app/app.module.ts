import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { PatientModule } from './patient/patient.module';
import { UsefullsesModule } from './usefullses/usefullses.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './_modules/shared.module';
import { DocumentationModule } from './documentation/documentation.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
// import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagmentComponent } from './admin/user-managment/user-managment.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { HfAddComponent } from './health-facility/components/hf-add/hf-add.component';
import { HfListComponent } from './health-facility/components/hf-list/hf-list.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    AdminPanelComponent,
    // HasRoleDirective,
    UserManagmentComponent,
    RolesModalComponent,
    HfAddComponent,
    HfListComponent
  ],
  imports: [
    ReactiveFormsModule,
    PatientModule,
    DocumentationModule,
    UsefullsesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
