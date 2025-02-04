import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ALLWORKOUTTYPES } from '../../../../data';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search-workout-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    NgIf,
  ],
  templateUrl: './search-workout-filter.component.html',
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

  workoutTypes = ['All', ...ALLWORKOUTTYPES];
  ngOnInit() {
    this.filtersForm.valueChanges.subscribe((value) => {
      this.filtersChanged.emit({
        search: value.search || '',
        workoutType: value.workoutType || '',
      });
    });
  }
  clearSearch() {
    this.filtersForm.get('search')?.setValue('');
  }
}
