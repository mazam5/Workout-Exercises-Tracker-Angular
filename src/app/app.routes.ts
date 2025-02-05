import { Routes } from '@angular/router';
import { AddNewWorkoutComponent } from './add-new-workout/add-new-workout.component';
import { ChartsComponent } from './charts/charts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: WorkoutsListComponent },
  { path: 'add', title: 'Add', component: AddNewWorkoutComponent },
  { path: 'charts', title: 'Charts', component: ChartsComponent },
  { path: 'workouts', title: 'Workouts', component: WorkoutsListComponent },
  { path: '**', component: PageNotFoundComponent },
];
