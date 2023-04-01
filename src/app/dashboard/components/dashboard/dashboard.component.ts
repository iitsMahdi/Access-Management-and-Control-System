import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor() {
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'grey',
        backgroundColor: 'rgba(237, 193, 51, 0.586)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


}
