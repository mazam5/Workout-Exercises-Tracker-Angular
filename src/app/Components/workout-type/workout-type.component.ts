import { Component, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
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
export class WorkoutTypeComponent {
  workoutTypes = workoutTypes;
  @Input() filtersForm!: FormGroup;
}
