import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartDataService } from '../services/chart-data.service';

@Component({
  selector: 'chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.css']
})
export class ChartWrapperComponent {
  private data: Array<any> = [];
  private labels: Array<string> = [];
  private type: string = 'bar';
  private DSLabels: string | string[] = null;
  
  @Input('datasetLabels') set dataSetLabelsInput(DSLabels: string | string[]) {
    // Way 1 of checking if object is array
    // if (Object.prototype.toString.call(DSLabels) === '[object Array]') {
    //   console.log(`array`);
    // }

    //  Way 2 of checking if object is array
    this.createBarChartDataLabels(DSLabels);
  }
  @Input('data') set dataInput(data: Array<any>) {
    this.data = data;
    this.createBarChartData(data);
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
    this.barChartLabels = [...this.labels];
    this.barChartData[0]['data'] = [...this.data];
  }

  createBarChartData(data: Array<any>) {
    if (data.every(item => Array.isArray(item))) {
      data.forEach((item, idx) => {
        if (idx < data.length - 1) {
          this.barChartData.push({ data: [], label: '' });
          this.data = item;
        }

        this.barChartData[idx]['data'] = item;
      });
    } else {
      this.data = data;
      this.barChartData[0]['data'] = [...this.data];
    }
  }

  createBarChartDataLabels(DSLabels: string | string[]) {
    if (Array.isArray(DSLabels)) {
      this.DSLabels = [...DSLabels];

      DSLabels.forEach((label, idx) => {
        if (idx < DSLabels.length - 1) {
          this.barChartData.push({ data: [], label: '' });
        }
        this.barChartData[idx]['label'] = label;
      });
    } else {
      this.DSLabels = DSLabels;
      this.barChartData[0]['label'] = this.DSLabels;
    }
  }
}
