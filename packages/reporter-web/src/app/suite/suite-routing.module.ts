import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuiteComponent } from './suite.component';

const routes: Routes = [
  {path: ':id', component: SuiteComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class SuiteRoutingModule { }
