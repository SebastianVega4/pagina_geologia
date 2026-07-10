import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MapPin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-angular';
import { TrackClickDirective } from '../../../shared/directives/track-click.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, TrackClickDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  readonly icons = { MapPin, Mail, Phone, Facebook, Instagram, Twitter };
}
