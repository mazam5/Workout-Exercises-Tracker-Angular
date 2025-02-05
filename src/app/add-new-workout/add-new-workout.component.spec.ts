import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWorkoutComponent } from './add-new-workout.component';

describe('AddNewWorkoutComponent', () => {
  let component: AddNewWorkoutComponent;
  let fixture: ComponentFixture<AddNewWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewWorkoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
