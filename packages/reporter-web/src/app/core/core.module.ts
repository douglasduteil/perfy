//

import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { MainLayoutModule } from './main-layout/main-layout.module';
import { SuitesHttpService } from './suites-http.service';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpModule,
    JsonpModule,
    MainLayoutModule
  ],
  exports: [
    MainLayoutModule
  ],
  providers: [
    SuitesHttpService
  ]
})
export class CoreModule {}
