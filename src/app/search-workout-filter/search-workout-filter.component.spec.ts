import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SearchAndFilterComponent } from './search-workout-filter.component';

describe('SearchAndFilterComponent', () => {
  let component: SearchAndFilterComponent;
  let fixture: ComponentFixture<SearchAndFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchAndFilterComponent,
        ReactiveFormsModule,
        InputTextModule,
        SelectModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAndFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.filtersForm.get('search')?.value).toBe('');
    expect(component.filtersForm.get('workoutType')?.value).toBe('');
  });

  it('should emit filtersChanged when form values change', () => {
    spyOn(component.filtersChanged, 'emit');

    component.filtersForm.get('search')?.setValue('Running');
    component.filtersForm.get('workoutType')?.setValue('Cardio');

    expect(component.filtersChanged.emit).toHaveBeenCalledWith({
      search: 'Running',
      workoutType: 'Cardio',
    });
  });

  it('should clear the search field when clearSearch is called', () => {
    component.filtersForm.get('search')?.setValue('Yoga');
    component.clearSearch();

    expect(component.filtersForm.get('search')?.value).toBe('');
  });

  it('should show clear button when search input is not empty', () => {
    component.filtersForm.get('search')?.setValue('Pilates');
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('button'));
    expect(clearButton).toBeTruthy();
  });

  it('should hide clear button when search input is empty', () => {
    component.filtersForm.get('search')?.setValue('');
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('button'));
    expect(clearButton).toBeFalsy();
  });

  it('should call clearSearch when clear button is clicked', () => {
    spyOn(component, 'clearSearch');
    component.filtersForm.get('search')?.setValue('HIIT');
    fixture.detectChanges();

    const clearButton: DebugElement = fixture.debugElement.query(
      By.css('button'),
    );
    clearButton.triggerEventHandler('click', null);

    expect(component.clearSearch).toHaveBeenCalled();
  });
});
