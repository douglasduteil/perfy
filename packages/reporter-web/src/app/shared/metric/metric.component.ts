import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'perfy-metric',
  styleUrls: ['./metric.component.scss'],
  templateUrl: './metric.component.html'
})
export class MetricComponent implements AfterViewInit, OnChanges {
  updateMetricPlot: (data: any) => void;

  @ViewChild('plotlyPlot')
  plotlyPlotRefElm: ElementRef;

  @Input()
  metricOptions: any;

  constructor() { }

  //

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    console.log('> this.series', this.metricOptions);

    const plotlyPlotElm: HTMLDivElement = this.plotlyPlotRefElm.nativeElement;
    this.updateMetricPlot = newMetricPlot(plotlyPlotElm);

    this.onSeriesChange(this.metricOptions);
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
  return (options: any) => {

    const defaultDataOptions =  {
      type: 'scatter',
      mode: 'lines',
      showticklabels: false,
      y: [] as number[],
      line: {
        width: 1
      },
      error_y: {
        array: [] as number[],
        thickness: 0.5,
        width: 0
      },
      name: 'default'
    };

    const data = Object.entries(options.traces)
      .map(([name, serie]: [string, Array<{y: number, error_y: number}>]) => {
        const traceData = {...defaultDataOptions};
        traceData.name = name;
        traceData.y = serie.map(({y}) => y);
        traceData.error_y.array = serie.map(({error_y}) => error_y);
        return traceData;
      });

    const layout = {
      xaxis: {
        showgrid: false,
        ticktext: options.x,
        tickvals: options.x.map((_: any, i: number) => i)
      },
      margin: { l: 40, b: 25, r: 10, t: 20 }
    };

    window.Plotly.newPlot(
      elm,
      data,
      layout,
      { showLink: false }
    );

  };
}
