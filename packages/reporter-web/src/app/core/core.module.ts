//

import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { SuitesHttpService } from './suites-http.service';
import { MainLayoutModule } from './main-layout/main-layout.module';

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
    SuitesHttpService,
  ],
})
export class CoreModule {}
