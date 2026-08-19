import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Image, History, Maximize2, X } from 'lucide-angular';
import { MatomoService } from '../../../../core/services/matomo.service';

interface GalleryItem {
  url: string;
  title: string;
  category: 'actual' | 'historica';
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  private matomo = inject(MatomoService);
  readonly icons = { Image, History, Maximize2, X };

  activeTab: 'actual' | 'historica' = 'actual';
  selectedItem: GalleryItem | null = null;

  items: GalleryItem[] = [
    { url: 'assets/gallery/actual/Historia ROKO.jpg', title: 'Historia ROKO', category: 'actual' },
    { url: 'assets/gallery/actual/XVII Semana Tecnica.jpg', title: 'XVII Semana Tecnica', category: 'actual' },
    { url: 'assets/gallery/actual/nevado_resultado.webp', title: 'Salida al Nevado del Cocuy', category: 'actual' },
    { url: 'assets/gallery/actual/nevado1_resultado.webp', title: 'Salida al Nevado del Cocuy', category: 'actual' },
    { url: 'assets/gallery/actual/nevado2_resultado.webp', title: 'Salida al Nevado del Cocuy', category: 'actual' },
    { url: 'assets/gallery/actual/nevado3_resultado.webp', title: 'Salida al Nevado del Cocuy', category: 'actual' },
    { url: 'assets/gallery/actual/nevado4_resultado.webp', title: 'Salida al Nevado del Cocuy', category: 'actual' },
    { url: 'assets/gallery/actual/nevado5_resultado.webp', title: 'Salida al Nevado del Cocuy', category: 'actual' },
    { url: 'assets/gallery/actual/nevado6_resultado.webp', title: 'Salida al Nevado del Cocuy', category: 'actual' }
    // Galería Histórica (Vacia por ahora según estructura de carpetas)
  ];

  get filteredItems() {
    return this.items.filter(item => item.category === this.activeTab);
  }

  setTab(tab: 'actual' | 'historica') {
    this.activeTab = tab;
    this.matomo.trackEvent('Event', 'gallery_tab_switch', tab);
  }

  openLightbox(item: GalleryItem) {
    this.selectedItem = item;
    this.matomo.trackEvent('Event', 'gallery_lightbox_open', item.title);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedItem = null;
    this.matomo.trackEvent('Event', 'gallery_lightbox_close');
    document.body.style.overflow = 'auto';
  }
}
