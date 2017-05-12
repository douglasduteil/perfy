import { NgModule } from '@angular/core';
import { MdButtonModule, MdToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
    RouterModule,
  ],
  imports: [
    MdButtonModule,
    MdToolbarModule,
    RouterModule,
  ],
})
export class NavbarModule { }
