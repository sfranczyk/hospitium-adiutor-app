import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HfAddComponent } from './components/hf-add/hf-add.component';
import { HfListComponent } from './components/hf-list/hf-list.component';

const routes: Routes = [
  {
    path: 'health-facility',
    children: [
      {
        path: '',
        component: HfListComponent
      },
      {
        path: 'add',
        component: HfAddComponent,
        data: {add: true}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthFacilityRoutingModule { }
