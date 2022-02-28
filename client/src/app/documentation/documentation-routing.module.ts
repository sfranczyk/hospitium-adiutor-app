import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../_guards/admin.guard';
import { DocAddComponent } from './components/doc-add/doc-add.component';
import { DocDisplayComponent } from './components/doc-display/doc-display.component';
import { DocTypeAddComponent } from './components/doc-type-add/doc-type-add.component';
import { DocTypeListComponent } from './components/doc-type-list/doc-type-list.component';

const routes: Routes = [{
  path: 'documentation',
  children: [
    {
      path: 'type',
      children: [
        {
          path: 'add',
          component: DocTypeAddComponent,
          canActivate: [AdminGuard]
        },
        {
          path: 'list',
          component: DocTypeListComponent
        }
      ]
    },
    {
      path: 'add',
      component: DocAddComponent
    },
    {
      path: 'view',
      component: DocDisplayComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule { }
