import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/takeUntil';

import { ISuiteNameResponse } from 'app/core/suites-http/interfaces';
import { SuitesHttpService } from 'app/core/suites-http/suites-http.service';

@Component({
  selector: 'perfy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy, OnInit {
  hasError: boolean;
  suites: ISuiteNameResponse;
  suiteNames: string[];
  private componentDestruction$ = new Subject();
  constructor(
    private suitesHttp: SuitesHttpService
  ) {
  }

  ngOnDestroy() {
    this.componentDestruction$.next();
    this.componentDestruction$.complete();
  }
  ngOnInit() {
    const suites$ = this.suitesHttp.getSuites()
      .takeUntil(this.componentDestruction$);

    suites$.subscribe((suites) => {
      this.suites = suites;
      this.suiteNames = Object.keys(suites);
    }, () => {
      this.hasError = true;
    });
  }

}
