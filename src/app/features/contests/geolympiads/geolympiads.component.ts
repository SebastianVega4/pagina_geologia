import { Component, OnInit, AfterViewInit, HostListener, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trophy, ChevronLeft, ChevronRight, X } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { TrackClickDirective } from '../../../shared/directives/track-click.directive';
import { MatomoService } from '../../../core/services/matomo.service';

interface GeoImage {
  src: string;
  alt: string;
}

const IMAGES: GeoImage[] = [
  { src: 'assets/Geoolimpiadas/Geolimpiadas1.jpg', alt: 'Geolimpiadas 2026 - Imagen 1' },
  { src: 'assets/Geoolimpiadas/Geolimpiadas2.jpg', alt: 'Geolimpiadas 2026 - Imagen 2' },
  { src: 'assets/Geoolimpiadas/Geolimpiadas3.jpg', alt: 'Geolimpiadas 2026 - Imagen 3' },
  { src: 'assets/Geoolimpiadas/Geolimpiadas4.jpg', alt: 'Geolimpiadas 2026 - Imagen 4' },
  { src: 'assets/Geoolimpiadas/Geolimpiadas5.jpg', alt: 'Geolimpiadas 2026 - Imagen 5' },
  { src: 'assets/Geoolimpiadas/Geolimpiadas6.jpg', alt: 'Geolimpiadas 2026 - Imagen 6' },
];

@Component({
  selector: 'app-geolympiads',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule, TrackClickDirective],
  templateUrl: './geolympiads.component.html',
  styleUrl: './geolympiads.component.scss'
})
export class GeolympiadsComponent implements OnInit, AfterViewInit {
  private matomo = inject(MatomoService);
  private cdr = inject(ChangeDetectorRef);
  readonly icons = { Trophy, ChevronLeft, ChevronRight, X };
  readonly images = IMAGES;

  currentIdx = 0;
  lightboxOpen = false;
  private swapTimer: ReturnType<typeof setTimeout> | null = null;
  private deckCards: HTMLElement[] = [];

  ngOnInit(): void {
    this.matomo.trackEvent('Event', 'view_geolympiads');
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initDeck());
  }

  goTo(idx: number): void {
    const n = this.images.length;
    idx = ((idx % n) + n) % n;
    if (idx === this.currentIdx) return;
    const prev = this.currentIdx;
    this.currentIdx = idx;
    this.matomo.trackEvent('Event', 'geolimpiads_nav', idx > prev ? 'next' : 'prev');
    this.layoutDeck();
    this.cdr.markForCheck();
  }

  prevImage(): void {
    this.goTo(this.currentIdx - 1);
  }

  nextImage(): void {
    this.goTo(this.currentIdx + 1);
  }

  onCardClick(i: number): void {
    if (i === this.currentIdx) return;
    this.matomo.trackEvent('Event', 'geolimpiads_card_select', 'image ' + (i + 1));
    this.goTo(i);
  }

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.matomo.trackEvent('Event', 'geolimpiads_nav', 'keyboard_prev');
      this.prevImage();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.matomo.trackEvent('Event', 'geolimpiads_nav', 'keyboard_next');
      this.nextImage();
    }
  }

  openLightbox(): void {
    this.lightboxOpen = true;
    this.matomo.trackEvent('Event', 'geolimpiads_lightbox_open', 'image ' + (this.currentIdx + 1));
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.matomo.trackEvent('Event', 'geolimpiads_lightbox_close');
  }

  prevLightbox(): void {
    this.currentIdx = (this.currentIdx - 1 + this.images.length) % this.images.length;
    this.layoutDeck();
    this.cdr.markForCheck();
    this.matomo.trackEvent('Event', 'geolimpiads_lightbox_nav', 'prev');
  }

  nextLightbox(): void {
    this.currentIdx = (this.currentIdx + 1) % this.images.length;
    this.layoutDeck();
    this.cdr.markForCheck();
    this.matomo.trackEvent('Event', 'geolimpiads_lightbox_nav', 'next');
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('geo-lightbox')) {
      this.closeLightbox();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onLightboxKeydown(event: KeyboardEvent): void {
    if (!this.lightboxOpen) return;
    if (event.key === 'Escape') this.closeLightbox();
    else if (event.key === 'ArrowLeft') this.prevLightbox();
    else if (event.key === 'ArrowRight') this.nextLightbox();
  }

  private initDeck(): void {
    const deck = document.getElementById('geo-deck');
    if (!deck) return;
    this.deckCards = Array.from(deck.querySelectorAll('.geo-card')) as HTMLElement[];
    this.layoutDeck();
  }

  private layoutDeck(): void {
    if (!this.deckCards.length) return;
    const n = this.images.length;
    const cur = this.currentIdx;
    const isMobile = window.innerWidth < 900;

    this.deckCards.forEach((card, i) => {
      if (isMobile) {
        card.style.transform = '';
        card.style.opacity = '';
        card.style.zIndex = '';
        card.classList.toggle('is-hero', i === cur);
        return;
      }

      let rel = (i - cur + n) % n;
      if (rel > n / 2) rel -= n;

      let x = 0, y = 0, s = 1, ry = 0, z = 40, op = 1;

      if (rel === 0) {
        x = 0; s = 1; ry = 0; z = 40; op = 1;
      } else {
        const side = rel > 0 ? 1 : -1;
        const abs = Math.abs(rel);
        const poke = 40 + abs * 20;
        s = Math.max(0.6, 1 - abs * 0.15);
        y = abs * 16;
        ry = side * (10 + abs * 4);
        x = side * poke;
        z = side > 0 ? 10 - abs : 30 - abs;
        op = abs <= 2 ? 1 : 0;
      }

      card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s}) rotateY(${ry}deg)`;
      card.style.opacity = String(op);
      card.style.zIndex = String(z);
      card.classList.toggle('is-hero', i === cur);
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.layoutDeck();
  }
}
