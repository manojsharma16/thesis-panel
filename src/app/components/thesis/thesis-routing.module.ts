import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MscThesisListComponent } from './msc-thesis-list/msc-thesis-list.component';
import { PhdThesisListComponent } from './phd-thesis-list/phd-thesis-list.component';
import { AddThesisComponent } from './add-thesis/add-thesis.component';
import { EditThesisComponent } from './edit-thesis/edit-thesis.component';
const routes: Routes = [
  {
    path : 'msc-thesis-list',
    component: MscThesisListComponent
  },
  {
    path : 'phd-thesis-list',
    component: PhdThesisListComponent
  },
  {
    path : 'add-thesis/:course',
    component: AddThesisComponent
  },
  {
    path : 'edit-thesis/:course',
    component: EditThesisComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThesisRoutingModule { }
