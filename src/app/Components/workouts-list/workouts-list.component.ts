import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { USERS } from '../../../data';
import { CommonModule, NgFor, NgIf } from '@angular/common';

interface Workout {
  type: string;
  duration: number;
}
interface User {
  id: number;
  name: string;
  workouts: Workout[];
}
interface Columns {
  field: string;
  header: string;
}

@Component({
  selector: 'app-workouts-list',
  standalone: true,
  imports: [CommonModule, TreeTableModule, NgIf, NgFor],
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

  ngOnInit() {
    this.users = USERS.map((user) => {
      const totalWorkouts = user.workouts.length;
      const totalMinutes = user.workouts.reduce(
        (acc, workout) => acc + workout.duration,
        0,
      );

      const children: TreeNode[] = user.workouts.map((workout) => ({
        data: {
          id: '',
          name: '',
          workouts: workout.type,
          totalWorkouts: '',
          totalMinutes: `${workout.duration} mins`,
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
  }
  isNumber(value: any): boolean {
    return typeof value === 'number';
  }
}
