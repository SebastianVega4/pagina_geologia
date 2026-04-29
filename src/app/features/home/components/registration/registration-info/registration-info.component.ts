import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, CheckCircle2, CreditCard, Info, Mail, Instagram } from 'lucide-angular';

@Component({
  selector: 'app-registration-info',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './registration-info.component.html',
  styleUrl: './registration-info.component.scss'
})
export class RegistrationInfoComponent {
  @Output() close = new EventEmitter<void>();

  readonly icons = {
    X,
    CheckCircle2,
    CreditCard,
    Info,
    Mail,
    Instagram
  };

  onClose() {
    this.close.emit();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
