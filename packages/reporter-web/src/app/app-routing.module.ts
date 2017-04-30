import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'suites',
    pathMatch: 'full'
  },
  {
    path: 'suites',
    loadChildren: 'app/suites/suites.module#SuitesModule',
    data: {feedType: 'suites'}
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
