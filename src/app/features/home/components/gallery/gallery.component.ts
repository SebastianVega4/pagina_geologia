import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Image, History, Maximize2, X } from 'lucide-angular';
import { UmamiService } from '../../../../core/services/umami.service';

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
  private umami = inject(UmamiService);
  readonly icons = { Image, History, Maximize2, X };

  activeTab: 'actual' | 'historica' = 'actual';
  selectedItem: GalleryItem | null = null;

  items: GalleryItem[] = [
    { url: 'assets/gallery/actual/Historia ROKO.jpg', title: 'Historia ROKO', category: 'actual' },
    { url: 'assets/gallery/actual/XVII Semana Tecnica.jpg', title: 'XVII Semana Tecnica', category: 'actual' }
    // Galería Histórica (Vacia por ahora según estructura de carpetas)
  ];

  get filteredItems() {
    return this.items.filter(item => item.category === this.activeTab);
  }

  setTab(tab: 'actual' | 'historica') {
    this.activeTab = tab;
    this.umami.trackEvent('gallery_tab_switch', { tab });
  }

  openLightbox(item: GalleryItem) {
    this.selectedItem = item;
    this.umami.trackEvent('gallery_lightbox_open', { title: item.title, category: item.category });
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedItem = null;
    this.umami.trackEvent('gallery_lightbox_close');
    document.body.style.overflow = 'auto';
  }
}
