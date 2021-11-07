import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
          component: DocTypeAddComponent
        },
        {
          path: 'list',
          component: DocTypeListComponent
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule { }
