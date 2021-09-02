import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.css']
})
export class ChartWrapperComponent {
  private data: Array<any> = [];
  private labels: Array<string> = [];
  private type: string = 'bar'
  @Input('data') set dataInput(data: Array<any>) {
    this.data = data;
  }
  @Input('labels') set labelsInput(labels: Array<string>) {
    this.labels = labels;
  }

  @Input('chartType') set chartType(type: string) {
    this.type = type;
  }

  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [{ data: [], label: '' }];

  constructor() {}

  ngOnInit() {
    this.barChartType = this.type;
    this.barChartLabels = [...this.labels]
    this.barChartData[0]['data'] = [...this.data]
  }
}
