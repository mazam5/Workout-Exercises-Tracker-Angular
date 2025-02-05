import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'health-tracker-angular';
}
