import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuitesListComponent } from "./suites-list/suites-list.component";
import { SuitesItemComponent } from "./suites-item/suites-item.component";

const routes: Routes = [
  {
    component: SuitesListComponent,
    path: ''
  },
  {
    component: SuitesItemComponent,
    path: ':id'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuitesRoutingModule { }
