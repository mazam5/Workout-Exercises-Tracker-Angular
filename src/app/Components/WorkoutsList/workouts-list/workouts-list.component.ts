import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { DividerModule } from 'primeng/divider';
import { USERS } from '../../../../data';
import { SearchAndFilterComponent } from '../search-and-filter/search-and-filter.component';

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
    { field: 'totalMinutes', header: 'Total Workout Minutes' },
  ];

  users: TreeNode[] = [];
  filteredUsers: TreeNode[] = []; // To hold filtered data

  ngOnInit() {
    this.loadUsers();
  }
  // Load initial data
  loadUsers() {
    this.users = USERS.map((user) => {
      const totalWorkouts = user.workouts.length;
      const totalMinutes = user.workouts.reduce((acc, w) => acc + w.minutes, 0);

      const children = user.workouts.map((workout) => ({
        data: {
          id: '',
          name: '',
          workouts: workout.type,
          totalWorkouts: '',
          totalMinutes: `${workout.minutes} mins`,
        },
      }));

      return {
        data: {
          id: user.id,
          name: user.name,
          workouts: user.workouts.map((w) => w.type).join(', '),
          totalWorkouts,
          totalMinutes,
        },
        children,
      };
    });

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
