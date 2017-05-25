import { Component, OnInit } from '@angular/core';

import { SuitesHttpService } from 'app/core';

@Component({
  selector: 'perfy-suites-list',
  templateUrl: './suites-list.component.html',
  styleUrls: ['./suites-list.component.scss']
})
export class SuitesListComponent implements OnInit {

  suites = [];

  suiteIds = [];

  constructor(
    private suitesHttp: SuitesHttpService
  ) { }

  ngOnInit() {
    this.suitesHttp.getSuites()
      .then((suites) => {
        this.suiteIds = Object.keys(suites);
        this.suites = suites;
      });
  }

}
