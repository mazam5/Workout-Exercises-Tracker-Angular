import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataService } from '../data.service';
import { ALLWORKOUTTYPES } from '../../data';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [ChartModule, SelectButtonModule, ReactiveFormsModule],
  templateUrl: './charts.component.html',
})
export class ChartsComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  usersList: any[] = [];
  // selectedUser: string = 'All';
  userChartForm = new FormGroup({
    selectedUser: new FormControl('All'),
  });

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const usersData = this.dataService.getUsers();
    this.usersList = [
      { name: 'All', id: 'All' },
      ...usersData.map((user) => ({ name: user.data.name, id: user.data.id })),
    ];
    this.prepareChartData(usersData);
    this.initializeChartOptions();
  }

  prepareChartData(users: any[], selectedUser: string = 'All') {
    const workoutDurations: { [key: string]: number } = {};
    ALLWORKOUTTYPES.forEach((type) => (workoutDurations[type] = 0));

    const filteredUsers =
      selectedUser === 'All'
        ? users
        : users.filter((user) => user.data.id === selectedUser);

    filteredUsers.forEach((user) => {
      user.children.forEach((workout: any) => {
        const workoutType = workout.data.workouts;
        const duration = parseInt(workout.data.totalWorkoutDuration);

        if (
          Object.prototype.hasOwnProperty.call(workoutDurations, workoutType)
        ) {
          workoutDurations[workoutType] += duration;
        }
      });
    });

    this.basicData = {
      labels: Object.keys(workoutDurations),
      datasets: [
        {
          label:
            selectedUser === 'All'
              ? 'Total Workout Duration (mins)'
              : `Workout Duration for ${filteredUsers[0]?.data.name}`,
          data: Object.values(workoutDurations),
          backgroundColor: [
            '#4bc0c0',
            '#36a2eb',
            '#ffcd56',
            '#ff6384',
            '#7e57c2',
            '#66bb6a',
            '#ec407a',
            '#ab47bc',
            '#26c6da',
            '#ffa726',
          ],
          borderColor: '#4bc0c0',
          fill: true,
        },
      ],
    };
  }

  initializeChartOptions() {
    this.basicOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Workout Duration by Type',
        },
      },
    };
  }

  onUserChange(event: any) {
    this.userChartForm.value.selectedUser = event.value;
    const usersData = this.dataService.getUsers();
    this.prepareChartData(usersData, this.userChartForm.value.selectedUser!);
  }
}
