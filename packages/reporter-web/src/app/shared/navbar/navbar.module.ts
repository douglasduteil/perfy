import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdButtonModule, MdToolbarModule } from '@angular/material';

import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    MdButtonModule,
    MdToolbarModule
  ]
})
export class NavbarModule { }
