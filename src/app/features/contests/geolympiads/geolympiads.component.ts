import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trophy, Timer, ChevronLeft } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { UmamiService } from '../../../core/services/umami.service';

@Component({
  selector: 'app-geolympiads',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './geolympiads.component.html',
  styleUrl: './geolympiads.component.scss'
})
export class GeolympiadsComponent {
  private umami = inject(UmamiService);
  readonly icons = { Trophy, Timer, ChevronLeft };

  constructor() {
    this.umami.trackEvent('view_geolympiads');
  }
}
