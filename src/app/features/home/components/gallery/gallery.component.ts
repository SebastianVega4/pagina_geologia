import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Image, History, Maximize2 } from 'lucide-angular';

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
  readonly icons = { Image, History, Maximize2 };

  activeTab: 'actual' | 'historica' = 'actual';

  items: GalleryItem[] = [
    { url: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop', title: 'Salida de Campo 2024', category: 'actual' },
    { url: 'https://images.unsplash.com/photo-1518176259654-82559cc52d6a?q=80&w=2670&auto=format&fit=crop', title: 'Laboratorio de Petrografía', category: 'actual' },
    { url: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2573&auto=format&fit=crop', title: 'Ponencia Magistral', category: 'actual' },
    { url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2573&auto=format&fit=crop', title: 'Archivo Histórico 1995', category: 'historica' },
    { url: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=2570&auto=format&fit=crop', title: 'Primer Simposio UPTC', category: 'historica' },
    { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop', title: 'Graduación Promoción 1980', category: 'historica' }
  ];

  get filteredItems() {
    return this.items.filter(item => item.category === this.activeTab);
  }

  setTab(tab: 'actual' | 'historica') {
    this.activeTab = tab;
  }
}
