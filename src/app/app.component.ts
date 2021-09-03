import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          grid: {display: false},
          display: true,
          type: 'time',
          time: {
            tooltipFormat: 'll HH:mm',
            displayFormats: {
              hour: 'DD/MM HH:mm',
              day: 'MM/DD/YYYY',
              week: 'MM/DD/YYYY'
            }
          },
          ticks: {
            major: {endabled: true},
            callback: function(value, index, values) {
              if (index % 2 === 0) {
                return value
              } 
            },
          }
        }
      ],
      yAxes: [
        {
          grid: {display: false, borderWidth: 0},
          display: true,
          ticks: {
            callback: function(value, index, values) {
              return index % 2 ? value : null;
            },
          }
        }
      ]
    },
  };
  constructor() {}

  ngOnInit() {}
}
