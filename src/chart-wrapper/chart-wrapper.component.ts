import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartColor } from 'chart.js';
import { Label } from 'ng2-charts';
import generateGradient from '../utils/generateRandomGradient';

const getDates = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate;
  const addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

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
  private options: ChartOptions = null;

  @ViewChild('myCanvas') canvas: ElementRef;

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

  @Input('chartOptions') set chartOptionsInput(options: ChartOptions) {
    this.options = { ...options };
  }

  public wrapperChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      intersect: false,
      mode: 'x'
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false
          }
        }
      ]
    }
  };
  public wrapperChartLabels: Label[] = [];
  public wrapperChartType: ChartType = 'bar';
  public wrapperChartLegend = true;
  public wrapperChartPlugins = [];
  public wrapperChartColors: ChartColor = [];

  public wrapperChartData: ChartDataSets[] = [{ data: [], label: '' }];

  constructor() {}

  ngOnInit() {
    console.log(this.options);
    this.wrapperChartOptions =
      this.options != null ? { ...this.options } : this.wrapperChartOptions;
    this.wrapperChartType = this.type;
    this.wrapperChartLabels = [...this.labels];
  }

  ngAfterViewInit() {
    const domCanvasAccess = this.canvas.nativeElement as HTMLCanvasElement;
    const gradientColor = domCanvasAccess
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 200);

    let startStopColors = generateGradient()
    gradientColor.addColorStop(0, startStopColors.start);
    gradientColor.addColorStop(1, startStopColors.stop);

    this.wrapperChartData.forEach((data, idx) => {
      // if (this.wrapperChartData.length > 1) {
      // }
      if (this.wrapperChartData.length == 1) {
        this.wrapperChartColors[0] == { backgroundColor: gradientColor };

        console.log(this.wrapperChartColors[0])
      }
    });
  }

  checkTypeCondition(data: Array<any>) {
    return data.every(
      item =>
        (Array.isArray(item) && typeof item !== 'number') ||
        (Array.isArray(item) && typeof item !== 'string')
    );
  }

  createBarChartData(data: Array<any>) {
    if (this.checkTypeCondition(data)) {
      data.forEach((item, idx) => {
        // if (idx < data.length - 1) {
        //   if (this.wrapperChartData.length !== data.length) {
        //     this.wrapperChartData.push({ data: [], label: '' });
        //   }
        // }
        if (
          idx < data.length - 1 &&
          this.wrapperChartData.length !== data.length
        ) {
          this.wrapperChartData.push({ data: [], label: '' });
        }
        this.data = [...item];
        this.wrapperChartData[idx]['data'] = [...this.data];
      });
    } else {
      this.data = data;
      this.wrapperChartData[0]['data'] = [...this.data];
    }
  }

  createBarChartDataLabels(DSLabels: string | string[]) {
    if (Array.isArray(DSLabels)) {
      this.DSLabels = [...DSLabels];

      DSLabels.forEach((label, idx) => {
        if (idx < DSLabels.length - 1) {
          this.wrapperChartData.push({ data: [], label: '' });
        }
        this.wrapperChartData[idx]['label'] = label;
      });
    } else {
      this.DSLabels = DSLabels;
      this.wrapperChartData[0]['label'] = this.DSLabels;
    }
  }
}
