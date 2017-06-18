//

import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { SUITES_API_URL } from './suites-http/config';
import { SuitesHttpService } from './suites-http/suites-http.service';

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
    SuitesHttpService,
    {provide: SUITES_API_URL, useValue: 'api'}
  ]
})
export class CoreModule {}
