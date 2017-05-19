import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,
  Input, OnDestroy, OnInit, ViewChild
} from '@angular/core';

import { MdSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/debounceTime';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'perfy-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterContentInit, OnDestroy, OnInit {
  private resizeEventSub: Subscription;
  private isOnDesktop: boolean;

  //

  @Input()
  menuMode = '';

  @ViewChild('sidenav')
  sidenav: MdSidenav

  //

  constructor(
    private cd: ChangeDetectorRef
  ) {}

  //

  ngAfterContentInit() {
    this.updateSideBarMode(window.innerWidth);
  }

  ngOnDestroy() {
    this.resizeEventSub.unsubscribe();
  }

  ngOnInit() {
     this.resizeEventSub = Observable.fromEvent(window, 'resize')
      .debounceTime(750)
      .subscribe((event: UIEvent) => {
        const target = event.target as Window;

        // Marck this component to force angular to check it next time
        this.cd.markForCheck();
        this.updateSideBarMode(target.innerWidth);
      });
  }

  //

  updateSideBarMode(width: number) {
    this.isOnDesktop = width > 1000;
    this.menuMode = this.isOnDesktop ? 'side' : 'over';

    if (this.isOnDesktop && !this.sidenav.opened) {
      this.sidenav.open();
    } else if (!this.isOnDesktop && this.sidenav.opened) {
      this.sidenav.close();
    }
  }

}
