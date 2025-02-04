import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { workoutTypes } from './../../../data';
@Component({
  selector: 'app-workout-type',
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
  ],
  standalone: true,
  templateUrl: './workout-type.component.html',
})
//
export class WorkoutTypeComponent implements OnInit {
  workoutTypes = workoutTypes;
  workoutTypeControl = new FormControl('');

  @Output() workoutTypeChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.workoutTypeControl.valueChanges.subscribe((value) => {
      this.workoutTypeChanged.emit(value!);
      console.log('workoutTypeChanged', value);
    });
  }
}
