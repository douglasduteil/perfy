import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarModule } from './navbar/navbar.module';
import { MetricModule } from './metric/metric.module';

@NgModule({
  exports: [
    MetricModule,
    NavbarModule
  ],
  imports: [
    MetricModule,
    NavbarModule
  ]
})
export class SharedModule { }
