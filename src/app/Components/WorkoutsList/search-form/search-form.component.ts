import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    ReactiveFormsModule,
  ],
})
export class SearchFormComponent implements OnInit {
  searchControl = new FormControl('');
  @Output() searchChaged = new EventEmitter<string>();
  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchChaged.emit(value!);
      console.log('searchChanged', value);
    });
  }
}
