import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trophy, Timer, ChevronLeft } from 'lucide-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-geolympiads',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './geolympiads.component.html',
  styleUrl: './geolympiads.component.scss'
})
export class GeolympiadsComponent {
  readonly icons = { Trophy, Timer, ChevronLeft };
}
