//

import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { SuitesHttpService } from './suites-http.service';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpModule,
    JsonpModule
  ],
  exports: [
  ],
  providers: [
    SuitesHttpService
  ]
})
export class CoreModule {}
