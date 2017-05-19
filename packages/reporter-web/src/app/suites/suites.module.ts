//

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdIconModule, MdListModule } from '@angular/material';

import { MetricModule } from 'app/shared';

import { SuitesItemComponent } from './suites-item/suites-item.component';
import { SuitesListComponent } from './suites-list/suites-list.component';
import { SuitesRoutingModule } from './suites-routing.module';

@NgModule({
  declarations: [
    SuitesListComponent,
    SuitesItemComponent
  ],
  imports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    MdListModule,
    MetricModule,
    SuitesRoutingModule
  ]
})
export class SuitesModule { }
