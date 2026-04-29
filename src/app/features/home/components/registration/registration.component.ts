import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsletterService } from '../../../../core/services/newsletter.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  email: string = '';
  submitting: boolean = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  constructor(private newsletterService: NewsletterService) {}

  onSubscribe() {
    if (!this.email || this.submitting) return;

    this.submitting = true;
    this.submitStatus = 'idle';

    this.newsletterService.subscribe(this.email).subscribe({
      next: () => {
        this.submitStatus = 'success';
        this.submitting = false;
        this.email = '';
        setTimeout(() => this.submitStatus = 'idle', 5000);
      },
      error: (err) => {
        console.error('Subscription error:', err);
        this.submitStatus = 'error';
        this.submitting = false;
      }
    });
  }
}
