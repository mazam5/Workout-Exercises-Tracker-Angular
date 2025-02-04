import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from '../search-form/search-form.component';
import { WorkoutTypeComponent } from '../../workout-type/workout-type.component';

@Component({
  selector: 'app-search-and-filter',
  standalone: true,
  imports: [ReactiveFormsModule, SearchFormComponent, WorkoutTypeComponent],
  templateUrl: './search-and-filter.component.html',
})
export class SearchAndFilterComponent {
  filtersForm = new FormGroup({
    searchFilter: new FormControl(''),
    workoutType: new FormControl(''),
  });

  @Output() searchControl = new EventEmitter<string>();
  @Output() workoutTypeControl = new EventEmitter<string>();

  constructor() {
    this.filtersForm.get('searchFilter')?.valueChanges.subscribe((value) => {
      this.searchControl.emit(value!);
      console.log('searchChanged', value);
    });

    this.filtersForm.get('workoutType')?.valueChanges.subscribe((value) => {
      this.workoutTypeControl.emit(value!);
      console.log('workoutTypeChanged', value);
    });
  }
}
