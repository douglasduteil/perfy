import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MetricModule } from './metric/metric.module';

@NgModule({
  exports: [
    MetricModule
  ],
  imports: [
    MetricModule
  ]
})
export class SharedModule { }
