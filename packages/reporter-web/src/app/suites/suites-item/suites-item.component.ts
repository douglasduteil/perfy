import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SuitesHttpService } from 'app/core';

@Component({
  selector: 'perfy-suites-item',
  templateUrl: './suites-item.component.html',
  styleUrls: ['./suites-item.component.scss']
})
export class SuitesItemComponent implements OnInit, OnDestroy {
  pending: boolean;
  routeParams: Subscription;
  suite: any;
  description: any;
  displayedItem: number;
  suiteStateDiff: any;
  metrics: any[];
  metricOptions: any = {};

  constructor(
    private suitesHttp: SuitesHttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const _simpleCaseReport = (suite) => {
      const latestSuite = suite[0];
      const previousSuite = suite[1];

      this.description = latestSuite.description;
      this.metrics = Object.entries(this.description.metrics)
        .map(([name, description]) => ({name, description}));

      this.suiteStateDiff = this.metrics.reduce((memo, metric) => {
        const latestValue = parseFloat(latestSuite.stats[metric.name]);
        const previousValue = parseFloat(previousSuite.stats[metric.name]);
        const diff = latestValue - previousValue;
        // TODO: consider ~0.1 difference as unchanged
        const velocity = diff > 0 ? '&#8599;' : diff < 0 ? '&#8600' : '&#8605';

        memo[metric.name] = {
          value: latestValue,
          velocity
        };

        return memo;
      }, {});

      console.log(suite);

      this.metricOptions = this.suite.reduce((memo, iteration) => {
        const { stats } = iteration;

        Object.entries(stats).forEach(([name, value]) => {
          memo[name] = memo[name] || [];

          const varianceSeparator = '+-';
          const variancePercent = parseFloat(value.slice(
            value.indexOf(varianceSeparator) + varianceSeparator.length)
          );
          const ticktext = iteration.timestamp;
          const y = parseFloat(value);
          const error_y = y * (variancePercent / 100);
          memo[name].push({ ticktext, y, error_y });
        });

        return memo;
      }, {});

      console.log('metricOptions', this.metricOptions);
    };

    const _comparationCaseReport = (suite) => {
      console.log('comp suite', suite);

      const latestIteration = suite.cases[0].iterations[0];

      const suiteDescription = latestIteration.description;
      const metrics =  Object.entries(suiteDescription.metrics)
        .map(([name, metricDescription]) => ({name, metricDescription}));

      const varianceToPlotlyOptions = (value) => {
        const varianceSeparator = '+-';
        const variancePercent = parseFloat(value.slice(
          value.indexOf(varianceSeparator) + varianceSeparator.length)
        );
        const y = parseFloat(value);
        const error_y = y * (variancePercent / 100);
        return {y, error_y};
      };

      const suiteSeries = this.suite.cases.reduce((memo, acase) => {
        acase.iterations.forEach((iteration) => {
          const { stats } = iteration;

          Object.entries(stats).forEach(([name, value]) => {
            const caseId = acase.id;
            const metricOption = memo[name] = memo[name] || {
              name: caseId,
              x: [],
              traces: {}
            };

            metricOption.x.unshift(new Date(Number(iteration.timestamp)));

            const ticktext = iteration.timestamp;
            const {y, error_y} = varianceToPlotlyOptions(value);

            metricOption.traces[caseId] = metricOption.traces[caseId] || [];
            metricOption.traces[caseId].unshift({
              ticktext,
              y,
              error_y
            });
          });
        });

        return memo;
      }, {});
      console.log('suiteSeries', suiteSeries);

      this.description = suiteDescription;
      this.metrics = metrics;
      this.metricOptions = suiteSeries;

      return {suiteDescription, metrics, suiteSeries};
    };

    this.routeParams = this.route.params
      .map((params) => params['id'])
      .subscribe((suiteId) => {
        this.pending = true;

        this.suitesHttp.getSuite(suiteId)
          .then((suite) => {
            this.suite = suite;
            _comparationCaseReport(suite);
            // const metaData = suite.cases.length === 1
              // target perf case
              // ? _simpleCaseReport(suite)
              // comparation case
              // : _comparationCaseReport(suite);
          })
          .catch((e) => {
            console.error(e);
            // might want to add a message here...
          })
          .then(() => { this.pending = false; });
      });
  }

  ngOnDestroy() {
    this.routeParams.unsubscribe();
  }
}
