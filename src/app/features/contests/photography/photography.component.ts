import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Camera, FileText, Send, ChevronLeft, Timer } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { MatomoService } from '../../../core/services/matomo.service';

@Component({
  selector: 'app-photography',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.scss'
})
export class PhotographyComponent {
  private matomo = inject(MatomoService);
  readonly icons = { Camera, FileText, Send, ChevronLeft, Timer };

  readonly templateLink = '#';
  readonly formLink = '#';

  constructor() {
    this.matomo.trackEvent('Event', 'view_photography_contest');
  }
}
