import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trophy, ChevronLeft, ChevronRight, X } from 'lucide-angular';
import { MatomoService } from '../../../../core/services/matomo.service';

interface PodiumSponsor {
  src: string;
  alt: string;
  tier: 'esmeralda' | 'oro' | 'cuarzo';
  label: string;
}

const ESMERALDA_SPONSORS: PodiumSponsor[] = [
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorEsmeralda.webp', alt: 'Patrocinador Esmeralda', tier: 'esmeralda', label: 'Esmeralda' },
];

const ORO_SPONSORS: PodiumSponsor[] = [
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO.jpg', alt: 'Patrocinador Oro', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO1.jpg', alt: 'Patrocinador Oro 1', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO2.jpg', alt: 'Patrocinador Oro 2', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO3.jpg', alt: 'Patrocinador Oro 3', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO4.jpg', alt: 'Patrocinador Oro 4', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO5.webp', alt: 'Patrocinador Oro 5', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO6.webp', alt: 'Patrocinador Oro 6', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO7.webp', alt: 'Patrocinador Oro 7', tier: 'oro', label: 'Oro' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorORO8.webp', alt: 'Patrocinador Oro 8', tier: 'oro', label: 'Oro' },
];

const CUARZO_SPONSORS: PodiumSponsor[] = [
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorCUARZO.jpg', alt: 'Patrocinador Cuarzo', tier: 'cuarzo', label: 'Cuarzo' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorCUARZO1.jpg', alt: 'Patrocinador Cuarzo 1', tier: 'cuarzo', label: 'Cuarzo' },
  { src: 'assets/PodiumPatrocinadores_destacados/patrocinadorCUARZO2.webp', alt: 'Patrocinador Cuarzo 2', tier: 'cuarzo', label: 'Cuarzo' },
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

  readonly esmeraldaSponsors = ESMERALDA_SPONSORS;
  readonly oroSponsors = ORO_SPONSORS;
  readonly cuarzoSponsors = CUARZO_SPONSORS;

  esmeraldaIdx = 0;
  oroIdx = 0;
  cuarzoIdx = 0;

  lightboxOpen = false;
  lightboxPool: PodiumSponsor[] = [];
  lightboxIdx = 0;

  ngOnInit(): void {
    this.matomo.trackEvent('Event', 'view_podium_sponsors');
  }

  prevEsmeralda(): void {
    this.esmeraldaIdx = (this.esmeraldaIdx - 1 + this.esmeraldaSponsors.length) % this.esmeraldaSponsors.length;
    this.matomo.trackEvent('Event', 'podium_carousel_nav', 'esmeralda_prev');
  }

  nextEsmeralda(): void {
    this.esmeraldaIdx = (this.esmeraldaIdx + 1) % this.esmeraldaSponsors.length;
    this.matomo.trackEvent('Event', 'podium_carousel_nav', 'esmeralda_next');
  }

  prevOro(): void {
    this.oroIdx = (this.oroIdx - 1 + this.oroSponsors.length) % this.oroSponsors.length;
    this.matomo.trackEvent('Event', 'podium_carousel_nav', 'oro_prev');
  }

  nextOro(): void {
    this.oroIdx = (this.oroIdx + 1) % this.oroSponsors.length;
    this.matomo.trackEvent('Event', 'podium_carousel_nav', 'oro_next');
  }

  prevCuarzo(): void {
    this.cuarzoIdx = (this.cuarzoIdx - 1 + this.cuarzoSponsors.length) % this.cuarzoSponsors.length;
    this.matomo.trackEvent('Event', 'podium_carousel_nav', 'cuarzo_prev');
  }

  nextCuarzo(): void {
    this.cuarzoIdx = (this.cuarzoIdx + 1) % this.cuarzoSponsors.length;
    this.matomo.trackEvent('Event', 'podium_carousel_nav', 'cuarzo_next');
  }

  selectThumb(tier: 'esmeralda' | 'oro' | 'cuarzo', idx: number): void {
    if (tier === 'esmeralda') {
      this.esmeraldaIdx = idx;
    } else if (tier === 'oro') {
      this.oroIdx = idx;
    } else {
      this.cuarzoIdx = idx;
    }
    this.matomo.trackEvent('Event', 'podium_thumb_click', tier + '_' + (idx + 1));
  }

  openLightbox(pool: PodiumSponsor[], idx: number): void {
    this.lightboxPool = pool;
    this.lightboxIdx = idx;
    this.lightboxOpen = true;
    this.matomo.trackEvent('Sponsors', 'sponsor_click', 'podium_' + pool[idx].tier + '_lightbox');
  }

  get currentLightboxItem(): PodiumSponsor | undefined {
    return this.lightboxPool[this.lightboxIdx];
  }

  closeLightbox(): void {
    if (this.lightboxOpen) {
      this.matomo.trackEvent('Sponsors', 'sponsor_lightbox_close');
    }
    this.lightboxOpen = false;
  }

  prevLightbox(): void {
    this.lightboxIdx = (this.lightboxIdx - 1 + this.lightboxPool.length) % this.lightboxPool.length;
    this.matomo.trackEvent('Sponsors', 'sponsor_lightbox_nav', 'prev');
  }

  nextLightbox(): void {
    this.lightboxIdx = (this.lightboxIdx + 1) % this.lightboxPool.length;
    this.matomo.trackEvent('Sponsors', 'sponsor_lightbox_nav', 'next');
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('podium-lightbox')) {
      this.closeLightbox();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      this.matomo.trackEvent('Sponsors', 'sponsor_lightbox_nav', 'keyboard_prev');
      this.prevLightbox();
    } else if (event.key === 'ArrowRight') {
      this.matomo.trackEvent('Sponsors', 'sponsor_lightbox_nav', 'keyboard_next');
      this.nextLightbox();
    }
  }
}
