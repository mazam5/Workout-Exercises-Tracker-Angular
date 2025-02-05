import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { TreeTableModule } from 'primeng/treetable';
import { SearchAndFilterComponent } from '../search-workout-filter/search-workout-filter.component';
import { DataService } from '../data.service';

interface Columns {
  field: string;
  header: string;
}

@Component({
  selector: 'app-workouts-list',
  standalone: true,
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
  filteredUsers: TreeNode[] = [];

  constructor(private dataService: DataService) {} // Inject UserService

  ngOnInit() {
    this.loadUsers();
  }

  // Load users via the service
  loadUsers() {
    this.users = this.dataService.getUsers();
    this.filteredUsers = [...this.users];
  }

  // Filter Handler
  onFilterChange(filters: { search: string; workoutType: string }) {
    const { search, workoutType } = filters;

    this.filteredUsers = this.users.filter((user) => {
      const matchesName = user.data.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesWorkoutType = workoutType
        ? user.data.workouts.includes(workoutType) || workoutType === 'All'
        : true;

      return matchesName && matchesWorkoutType;
    });
  }
}
