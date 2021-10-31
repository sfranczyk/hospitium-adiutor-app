import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { PatientSearchComponent } from './components/patient-search/patient-search.component';

const routes: Routes = [{
  path: 'patient',
  children: [
    {
      path: 'add',
      component: PatientAddComponent
    },
    {
      path: 'search',
      component: PatientSearchComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
