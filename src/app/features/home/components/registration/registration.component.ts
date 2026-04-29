import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationInfoComponent } from './registration-info/registration-info.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RegistrationInfoComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  showInfo = false;

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }
}
