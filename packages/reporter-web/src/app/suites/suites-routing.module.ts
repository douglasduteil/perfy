import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuitesItemComponent } from './suites-item/suites-item.component';
import { SuitesListComponent } from './suites-list/suites-list.component';

const routes: Routes = [
  {
    component: SuitesListComponent,
    path: '',
  },
  {
    component: SuitesItemComponent,
    path: ':id',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuitesRoutingModule { }
