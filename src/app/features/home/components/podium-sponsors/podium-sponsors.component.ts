import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trophy, ChevronLeft, ChevronRight, X } from 'lucide-angular';
import { MatomoService } from '../../../../core/services/matomo.service';

interface PodiumSponsor {
  src: string;
  alt: string;
  tier: 'oro' | 'cuarzo';
  label: string;
}

const SPONSORS: PodiumSponsor[] = [
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO.jpg', alt: 'Patrocinador Oro', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO1.jpg', alt: 'Patrocinador Oro 1', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO2.webp', alt: 'Patrocinador Oro 2', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO3.jpg', alt: 'Patrocinador Oro 3', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO4.jpg', alt: 'Patrocinador Oro 4', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO5.webp', alt: 'Patrocinador Oro 5', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO6.webp', alt: 'Patrocinador Oro 6', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorCUARZO.jpg', alt: 'Patrocinador Cuarzo', tier: 'cuarzo', label: 'Cuarzo' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorCUARZO1.jpg', alt: 'Patrocinador Cuarzo 1', tier: 'cuarzo', label: 'Cuarzo' },
];

@Component({
  selector: 'app-podium-sponsors',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './podium-sponsors.component.html',
  styleUrl: './podium-sponsors.component.scss'
})
export class PodiumSponsorsComponent implements OnInit {
  private matomo = inject(MatomoService);
  readonly icons = { Trophy, ChevronLeft, ChevronRight, X };

  readonly sponsors = SPONSORS;

  lightboxOpen = false;
  lightboxIdx = 0;

  ngOnInit(): void {
    this.matomo.trackEvent('Event', 'view_podium_sponsors');
  }

  openLightbox(idx: number): void {
    this.lightboxIdx = idx;
    this.lightboxOpen = true;
    this.matomo.trackEvent('Sponsors', 'sponsor_click', 'podium_' + this.sponsors[idx].tier + '_lightbox');
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }

  prevImage(): void {
    this.lightboxIdx = (this.lightboxIdx - 1 + this.sponsors.length) % this.sponsors.length;
  }

  nextImage(): void {
    this.lightboxIdx = (this.lightboxIdx + 1) % this.sponsors.length;
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('podium-lightbox')) {
      this.closeLightbox();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    if (event.key === 'Escape') this.closeLightbox();
    else if (event.key === 'ArrowLeft') this.prevImage();
    else if (event.key === 'ArrowRight') this.nextImage();
  }
}
