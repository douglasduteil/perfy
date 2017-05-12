import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'perfy-metric',
  styleUrls: ['./metric.component.scss'],
  templateUrl: './metric.component.html',
})
export class MetricComponent implements AfterViewInit, OnChanges {
  updateMetricPlot: (data: any) => void;

  @ViewChild('plotlyPlot')
  plotlyPlotRefElm: ElementRef;

  @Input()
  series: any;

  constructor() { }

  //

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    console.log('> this.series', this.series)

    const plotlyPlotElm: HTMLDivElement = this.plotlyPlotRefElm.nativeElement;
    this.updateMetricPlot = newMetricPlot(plotlyPlotElm);

    this.onSeriesChange(this.series);
  }

  ngOnChanges(changeObject: any) {
    if (changeObject.series) {
      this.onSeriesChange(changeObject.series.currentValue);
    }
  }

  //

  onSeriesChange(newValue?: any) {
    if (!newValue) {
      return;
    }

    const metricComponentPlotlyRenderFrame = () => {
      this.updateMetricPlot(newValue);
    };
    const metricComponentAskForPlotlyRenderFrame = () => {
      // Scheduling the next render function after the last idle "frame"
      window.requestAnimationFrame(metricComponentPlotlyRenderFrame);
    };
    window.requestIdleCallback(metricComponentAskForPlotlyRenderFrame);
  }
}

function newMetricPlot(elm: HTMLElement) {
  return (series) => {
    const data = [
      {
        type: 'scatter',
        mode: 'lines',
        showticklabels: false,
        y: series.map(({y}) => y),
        line: {
          width: 1,
        },
        error_y: {
          array: series.map(({error_y}) => error_y),
          thickness: 0.5,
          width: 0,
        },
      },
    ];

    const layout = {
      yaxis: {
        title: 'Script time',
      },
      xaxis: {
        showgrid: false,
        tickformat: '%B %d, %Y',
        ticktext: series.map(({ticktext}) => new Date(+ticktext)),
        tickvals: series.map((_, i) => i),
      },
      margin: { l: 40, b: 20, r: 10, t: 20 },
    };

    window.Plotly.newPlot(
      elm,
      data,
      layout,
      { showLink: false },
    );

  };
}
