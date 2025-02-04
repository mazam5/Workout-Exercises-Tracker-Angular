import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from '../search-form/search-form.component';
import { WorkoutTypeComponent } from '../../workout-type/workout-type.component';

@Component({
  selector: 'app-search-and-filter',
  standalone: true,
  imports: [ReactiveFormsModule, SearchFormComponent, WorkoutTypeComponent],
  templateUrl: './search-and-filter.component.html',
})
export class SearchAndFilterComponent implements OnInit {
  @Output() filtersForm = new FormGroup({
    search: new FormControl(''),
    workoutType: new FormControl(''),
  });

  @Output() filtersChanged: EventEmitter<{
    search: string;
    workoutType: string;
  }> = new EventEmitter();

  ngOnInit() {
    this.filtersForm.valueChanges.subscribe((value) => {
      this.filtersChanged.emit({
        search: value.search || '',
        workoutType: value.workoutType || '',
      });
    });
  }
}
