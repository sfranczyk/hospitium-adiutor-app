import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientManagementComponent } from './components/patient-management/patient-management.component';
import { PatientSearchComponent } from './components/patient-search/patient-search.component';

const routes: Routes = [{
  path: 'patient',
  children: [
    {
      path: '',
      redirectTo: 'search',
      pathMatch: 'full'
    },
    {
      path: 'list',
      component: PatientListComponent
    },
    {
      path: 'add',
      component: PatientAddComponent
    },
    {
      path: 'search',
      component: PatientSearchComponent
    },
    {
      path: 'more',
      component: PatientManagementComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
