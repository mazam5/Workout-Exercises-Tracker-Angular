import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { DataService } from '../data.service';
import { ALLWORKOUTTYPES } from '../../data';
@Component({
  selector: 'app-charts',
  imports: [ChartModule],
  templateUrl: './charts.component.html',
})
export class ChartsComponent implements OnInit {
  data: any;
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.data = this.dataService.getUsers();
    console.log(this.data);
  }
  basicOptions = {
    title: {
      display: true,
      text: 'Workout Duration',
    },
    legend: {
      position: 'bottom',
    },
  };
  basicData = {
    labels: ALLWORKOUTTYPES,
    datasets: [
      {
        label: 'Workout Duration',

        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80],
        backgroundColor: [
          '#4bc0c0',
          '#36a2eb',
          '#ffcd56',
          '#ff6384',
          '#4bc0c0',
          '#36a2eb',
          '#ffcd56',
          '#ff6384',
          '#4bc0c0',
          '#36a2eb',
        ],

        fill: true,
        borderColor: '#4bc0c0',
      },
    ],
  };
}
