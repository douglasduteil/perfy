import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdIconModule, MdListModule, MdButtonModule } from '@angular/material';

import { MetricModule } from "app/shared"

import { SuitesRoutingModule } from './suites-routing.module';
import { SuitesListComponent } from './suites-list/suites-list.component';
import { SuitesItemComponent } from './suites-item/suites-item.component';

@NgModule({
  imports: [
    CommonModule,
    SuitesRoutingModule,
    MdIconModule,
    MdListModule,
    MdButtonModule,
    MetricModule
  ],
  declarations: [
    SuitesListComponent,
    SuitesItemComponent
  ]
})
export class SuitesModule { }
