import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ALLWORKOUTTYPES } from '../../data';
@Component({
  selector: 'app-add-new-workout',
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    SelectModule,
    InputGroupAddonModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './add-new-workout.component.html',
})
export class AddNewWorkoutComponent {
  router = inject(Router);
  workoutTypes = ALLWORKOUTTYPES;

  addWorkoutForm = new FormGroup({
    name: new FormControl('', Validators.required),
    workouts: new FormArray(
      [
        new FormGroup(
          {
            workoutName: new FormControl('', Validators.required),
            workoutDuration: new FormControl('', Validators.required),
          },
          Validators.required,
        ),
      ],
      Validators.required,
    ),
  });

  get workouts() {
    return this.addWorkoutForm.get('workouts') as FormArray;
  }

  addWorkoutRow() {
    this.workouts.push(
      new FormGroup({
        workoutName: new FormControl(''),
        workoutDuration: new FormControl(''),
      }),
    );
  }

  removeWorkoutRow(index: number) {
    if (this.workouts.length > 1) {
      this.workouts.removeAt(index);
    }
  }

  saveWorkout() {
    const workoutsData = this.addWorkoutForm.value;
    const usersData = JSON.parse(localStorage.getItem('usersData')!) || [];
    const workoutData = {
      data: {
        id: usersData.length + 1,
        totalWorkouts: workoutsData?.workouts?.length,
        totalWorkoutDuration: workoutsData?.workouts?.reduce(
          (acc, w) => acc + parseInt(w.workoutDuration!, 10) || 0,
          0,
        ),
        name: workoutsData.name,
        workouts: workoutsData.workouts?.map((w) => w.workoutName).join(', '),
      },
      children: workoutsData?.workouts?.map((workout) => ({
        data: {
          id: '',
          name: '',
          workouts: workout.workoutName,
          totalWorkouts: '',
          totalWorkoutDuration: `${workout.workoutDuration} mins`,
        },
      })),
    };
    usersData.push(workoutData);
    localStorage.setItem('usersData', JSON.stringify(usersData));
    localStorage.getItem('usersData');
    this.router.navigateByUrl('/');
  }
}
