import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Camera, FileText, Send, ChevronLeft, Timer } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { UmamiService } from '../../../core/services/umami.service';

@Component({
  selector: 'app-photography',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.scss'
})
export class PhotographyComponent {
  private umami = inject(UmamiService);
  readonly icons = { Camera, FileText, Send, ChevronLeft, Timer };

  readonly templateLink = '#';
  readonly formLink = '#';

  constructor() {
    this.umami.trackEvent('view_photography_contest');
  }
}
