import { Routes } from '@angular/router';
import { AddNewWorkoutComponent } from './Components/add-new-workout/add-new-workout.component';
import { ChartsComponent } from './Components/charts/charts.component';
import { DetailsComponent } from './Components/details/details.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { WorkoutsListComponent } from './Components/WorkoutsList/workouts-list/workouts-list.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: WorkoutsListComponent },
  { path: 'add', title: 'Add', component: AddNewWorkoutComponent },
  { path: 'charts', title: 'Charts', component: ChartsComponent },
  { path: 'workouts', title: 'Workouts', component: WorkoutsListComponent },
  { path: 'detail/:id', title: 'Details/:id', component: DetailsComponent },
  { path: '**', component: PageNotFoundComponent },
];
