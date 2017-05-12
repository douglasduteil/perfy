import { Component, OnInit } from '@angular/core';

import { SuitesHttpService } from 'app/core';

@Component({
  selector: 'perfy-suites-list',
  templateUrl: './suites-list.component.html',
  styleUrls: ['./suites-list.component.scss'],
})
export class SuitesListComponent implements OnInit {

  suites = [{
    description: {
      id: ' long-execution-time-d10-i10',
      metrics: {
        scriptTime: 'script execution time in ms, including gc and render',
        pureScriptTime: 'script execution time in ms, without gc nor render',
        renderTime: 'render time in ms',
        gcTime: 'gc time in ms',
        gcAmount: 'gc amount in kbytes',
        majorGcTime: 'time of major gcs in ms',
        forcedGcTime: 'forced gc time in ms',
        forcedGcAmount: 'forced gc amount in kbytes',
      },
      description: {
        forceGc: true,
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3017.0 Safari/537.36',
        sampleSize: 10,
        regressionSlopeMetric: 'scriptTime',
      },
    },
  }];

  public suiteIds = [];

  constructor(
    private suitesHttp: SuitesHttpService,
  ) { }

  ngOnInit() {
    this.suitesHttp.getSuites()
      .then((suites) => { this.suiteIds = Object.keys(suites); })

  }

}
