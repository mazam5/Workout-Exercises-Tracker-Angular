import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { TreeTableModule } from 'primeng/treetable';
import { USERS } from '../../../../data';
import { SearchAndFilterComponent } from '../search-workout-filter/search-workout-filter.component';

interface Columns {
  field: string;
  header: string;
}

@Component({
  selector: 'app-workouts-list',
  imports: [
    CommonModule,
    TreeTableModule,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    SearchAndFilterComponent,
    DividerModule,
  ],
  templateUrl: './workouts-list.component.html',
})
export class WorkoutsListComponent implements OnInit {
  columns: Columns[] = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'workouts', header: 'Workouts' },
    { field: 'totalWorkouts', header: 'Number of Workouts' },
    { field: 'totalWorkoutDuration', header: 'Total Workout Minutes' },
  ];

  users: TreeNode[] = [];
  filteredUsers: TreeNode[] = []; // To hold filtered data

  ngOnInit() {
    this.initializeUsers();
  }

  // Initialize Users - Check localStorage first
  initializeUsers() {
    const storedUsers = localStorage.getItem('usersData');

    if (storedUsers) {
      // Load from localStorage if available
      this.users = JSON.parse(storedUsers);
    } else {
      // Save initial USERS data to localStorage
      this.users = USERS.map((user) => {
        const totalWorkouts = user.workouts.length;
        const totalWorkoutDuration = user.workouts.reduce(
          (acc, w) => acc + w.workoutDuration,
          0,
        );

        const children = user.workouts.map((workout) => ({
          data: {
            id: '',
            name: '',
            workouts: workout.workoutName,
            totalWorkouts: '',
            totalWorkoutDuration: `${workout.workoutDuration} mins`,
          },
        }));

        return {
          data: {
            id: user.id,
            name: user.name,
            workouts: user.workouts.map((w) => w.workoutName).join(', '),
            totalWorkouts,
            totalWorkoutDuration,
          },
          children,
        };
      });

      // Save to localStorage
      localStorage.setItem('usersData', JSON.stringify(this.users));
    }

    this.filteredUsers = [...this.users]; // Set initial filtered data
  }
  // Filter Handler
  onFilterChange(filters: { search: string; workoutType: string }) {
    const { search, workoutType } = filters;

    this.filteredUsers = this.users.filter((user) => {
      const matchesName = user.data.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesWorkoutType = workoutType
        ? user.data.workouts.includes(workoutType)
        : true;

      return matchesName && matchesWorkoutType;
    });
  }
}
