import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { USERS } from '../data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly localStorageKey = 'usersData';
  constructor() {}
  getUsers(): TreeNode[] {
    const storedUsers = localStorage.getItem(this.localStorageKey);

    if (storedUsers) {
      return JSON.parse(storedUsers);
    } else {
      const users = USERS.map((user) => {
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

      localStorage.setItem(this.localStorageKey, JSON.stringify(users));
      return users;
    }
  }

  updateUsers(users: TreeNode[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }
}
