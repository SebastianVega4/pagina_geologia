import { Component, OnInit, inject } from '@angular/core';
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
export class GeolympiadsComponent implements OnInit {
  private matomo = inject(MatomoService);
  readonly icons = { Trophy, Timer, ChevronLeft };

  ngOnInit(): void {
    this.matomo.trackEvent('Event', 'view_geolympiads');
  }
}
