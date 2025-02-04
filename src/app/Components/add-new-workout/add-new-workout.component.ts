import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ALLWORKOUTTYPES } from '../../../data';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
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
  styleUrl: './add-new-workout.component.css',
})
export class AddNewWorkoutComponent {
  router = inject(Router);
  workoutTypes = ALLWORKOUTTYPES;
  addWorkoutForm = new FormGroup({
    name: new FormControl(''),
    workouts: new FormArray([
      new FormGroup({
        workoutName: new FormControl(''),
        workoutDuration: new FormControl(''),
      }),
    ]),
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
      id: usersData.length + 1,
      ...workoutsData,
    };
    usersData.push(workoutData);
    localStorage.setItem('usersData', JSON.stringify(usersData));
    localStorage.getItem('usersData');
    alert('Workouts saved successfully!');
    this.router.navigateByUrl('/');
  }
}
