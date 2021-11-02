import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocTypeAddComponent } from './components/doc-type-add/doc-type-add.component';

const routes: Routes = [{
  path: 'documentation',
  children: [
    {
      path: 'type',
      children: [
        {
          path: 'add',
          component: DocTypeAddComponent
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
