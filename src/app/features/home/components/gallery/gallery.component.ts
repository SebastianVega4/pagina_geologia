import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Image, History, Maximize2, X } from 'lucide-angular';

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
  readonly icons = { Image, History, Maximize2, X };

  activeTab: 'actual' | 'historica' = 'actual';
  selectedItem: GalleryItem | null = null;

  items: GalleryItem[] = [
    // Galería Actual
    { url: 'assets/gallery/actual/envio de resumenes.webp', title: 'envio de resumenes', category: 'actual' },
    { url: 'assets/gallery/actual/Etapa 1.webp', title: 'Etapa 1', category: 'actual' },
    { url: 'assets/gallery/actual/Etapa 2.png', title: 'Etapa 2', category: 'actual' },
    { url: 'assets/gallery/actual/Etapa 3.png', title: 'Etapa 3', category: 'actual' },
    { url: 'assets/gallery/actual/Historia ROKO.jpg', title: 'Historia ROKO', category: 'actual' },
    { url: 'assets/gallery/actual/Incluye.png', title: 'Incluye', category: 'actual' },
    { url: 'assets/gallery/actual/XVII Semana Tecnica.jpg', title: 'XVII Semana Tecnica', category: 'actual' }
    // Galería Histórica (Vacia por ahora según estructura de carpetas)
  ];

  get filteredItems() {
    return this.items.filter(item => item.category === this.activeTab);
  }

  setTab(tab: 'actual' | 'historica') {
    this.activeTab = tab;
  }

  openLightbox(item: GalleryItem) {
    this.selectedItem = item;
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.selectedItem = null;
    document.body.style.overflow = 'auto';
  }
}
