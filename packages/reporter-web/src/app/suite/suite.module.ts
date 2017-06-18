import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SuiteRoutingModule } from './suite-routing.module';
import { SuiteComponent } from './suite.component';

@NgModule({
  declarations: [
    SuiteComponent
  ],
  imports: [
    CommonModule,
    SuiteRoutingModule
  ]
})
export class SuiteModule { }
