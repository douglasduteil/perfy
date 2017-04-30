import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'perfy-metric',
  templateUrl: './metric.component.html',
  styleUrls: ['./metric.component.scss']
})
export class MetricComponent implements OnInit, AfterViewInit {

  @ViewChild('plotlyPlot')
  plotlyPlotRefElm: ElementRef

  constructor() { }

  ngOnInit() {
    console.log('init')


  }

  ngAfterViewInit() {
    const plotlyPlotElm: HTMLDivElement = this.plotlyPlotRefElm.nativeElement;
    const updateMetricPlot = newMetricPlot(plotlyPlotElm)
    const metricComponentPlotlyRenderFrame = () => {
      updateMetricPlot([1,4,5])
    }
    const metricComponentAskForPlotlyRenderFrame = () => {
      // Scheduling the next render function after the last idle "frame"
      window.requestAnimationFrame(metricComponentPlotlyRenderFrame)
    }
    window.requestIdleCallback(metricComponentAskForPlotlyRenderFrame)
  }

}

function newMetricPlot (elm: HTMLElement) {
  return (data) => {
    window.Plotly.newPlot(
      elm,
      [
        {
          type: 'scatter',
          mode: 'lines',
          y: data,
          line: {
            width: 1
          },
          error_y: {
            array: [],
            thickness: 0.5,
            width: 0
          }
        }
      ],
      {
        yaxis: { title: "Script time" },
        xaxis: { showgrid: false },
        margin: { l: 40, b: 10, r: 10, t: 20 }
      },
      { showLink: false }
    );

  }
}
