//

import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';

import { SuitesHttpService } from './suites-http.service';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  imports: [
    HttpModule,
    JsonpModule,
    NavbarModule,
  ],
  exports: [
    NavbarModule,
  ],
  providers: [
    SuitesHttpService,
  ],
})
export class CoreModule {

}
