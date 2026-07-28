import { Component, OnInit, AfterViewInit, HostListener, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trophy, Timer, ChevronLeft, ChevronRight } from 'lucide-angular';
import { RouterModule } from '@angular/router';
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
];

interface DeckDOM {
  deck: HTMLElement;
  cards: HTMLElement[];
  marker: HTMLElement | null;
  listItems: HTMLElement[];
}

@Component({
  selector: 'app-geolympiads',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './geolympiads.component.html',
  styleUrl: './geolympiads.component.scss'
})
export class GeolympiadsComponent implements OnInit, AfterViewInit {
  private matomo = inject(MatomoService);
  private cdr = inject(ChangeDetectorRef);
  readonly icons = { Trophy, Timer, ChevronLeft, ChevronRight };
  readonly images = IMAGES;

  currentIdx = 0;
  isSwapping = false;
  private swapTimer: ReturnType<typeof setTimeout> | null = null;
  private deckEl: DeckDOM | null = null;

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
    this.isSwapping = true;
    if (this.swapTimer) clearTimeout(this.swapTimer);
    this.swapTimer = setTimeout(() => {
      this.isSwapping = false;
      this.cdr.markForCheck();
    }, 190);
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

  private initDeck(): void {
    const deck = document.getElementById('geo-deck') as HTMLElement;
    if (!deck) return;
    const cards = Array.from(deck.querySelectorAll('.geo-card')) as HTMLElement[];
    const listItems = Array.from(deck.querySelectorAll('.dl-item')) as HTMLElement[];
    const marker = deck.querySelector('.dl-marker') as HTMLElement | null;
    this.deckEl = { deck, cards, marker, listItems };
    this.layoutDeck();
  }

  private layoutDeck(): void {
    if (!this.deckEl) return;
    const { deck, cards, marker, listItems } = this.deckEl;
    const cs = getComputedStyle(deck);
    const cw = parseFloat(cs.getPropertyValue('--cw')) || 300;
    const ch = parseFloat(cs.getPropertyValue('--ch')) || 400;
    const iw = parseFloat(cs.getPropertyValue('--iw')) || 340;
    const fr = (cw + iw) / 2;
    const n = this.images.length;
    const cur = this.currentIdx;

    const peeks = [
      { poke: 34, s: 0.82, y: 14, ry: 16, zR: 8, zL: 22 },
      { poke: 58, s: 0.70, y: 28, ry: 20, zR: 7, zL: 21 },
    ];

    cards.forEach((card, i) => {
      let rel = (i - cur + n) % n;
      if (rel > n / 2) rel -= n;

      let x = 0, y = 0, s = 1, ry = 0, z = 40, op = 1;

      if (rel === 0) {
        x = -iw / 2;
        s = 1;
        ry = 0;
        z = 40;
        op = 1;
      } else {
        const side = rel > 0 ? 1 : -1;
        const p = peeks[Math.min(Math.abs(rel) - 1, peeks.length - 1)];
        x = side > 0
          ? (fr + p.poke - cw * p.s / 2)
          : (-fr - p.poke + cw * p.s / 2);
        y = p.y;
        s = p.s;
        ry = side > 0 ? -p.ry : p.ry;
        z = side > 0 ? p.zR : p.zL;
        op = Math.abs(rel) <= 2 ? 1 : 0;
      }

      card.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s}) rotateY(${ry || 0}deg)`;
      card.style.opacity = String(op);
      card.style.zIndex = String(z);
      card.classList.toggle('is-hero', i === cur);
    });

    listItems.forEach((li, i) => li.classList.toggle('is-active', i === cur));
    const act = listItems[cur];
    if (act && marker) {
      marker.style.transform = `translateY(${act.offsetTop}px)`;
      marker.style.height = act.offsetHeight + 'px';
      act.scrollIntoView({ block: 'nearest' });
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prevImage();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextImage();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.layoutDeck();
  }
}
