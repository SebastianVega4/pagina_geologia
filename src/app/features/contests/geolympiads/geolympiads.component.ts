import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trophy, Timer, ChevronLeft } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { MatomoService } from '../../../core/services/matomo.service';

@Component({
  selector: 'app-geolympiads',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './geolympiads.component.html',
  styleUrl: './geolympiads.component.scss'
})
export class GeolympiadsComponent {
  private matomo = inject(MatomoService);
  readonly icons = { Trophy, Timer, ChevronLeft };

  constructor() {
    this.matomo.trackEvent('Event', 'view_geolympiads');
  }
}
