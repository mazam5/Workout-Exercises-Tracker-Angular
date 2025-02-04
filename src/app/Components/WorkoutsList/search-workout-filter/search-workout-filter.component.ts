import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ALLWORKOUTTYPES } from '../../../../data';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

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

  workoutTypes = ALLWORKOUTTYPES;
  ngOnInit() {
    this.filtersForm.valueChanges.subscribe((value) => {
      this.filtersChanged.emit({
        search: value.search || '',
        workoutType: value.workoutType || '',
      });
      console.log(value.search);
      console.log(value.workoutType);
    });
  }
}
