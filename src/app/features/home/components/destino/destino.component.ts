import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatomoService } from '../../../../core/services/matomo.service';

interface Destino {
  emoji: string;
  name: string;
  meta: string;
  desc: string;
  osmLat: number;
  osmLng: number;
  osmZoom: number;
}

@Component({
  selector: 'app-destino',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destino.component.html',
  styleUrl: './destino.component.scss'
})
export class DestinoComponent {
  private matomo = inject(MatomoService);
  private sanitizer = inject(DomSanitizer);

  readonly destinos: Destino[] = [
    {
      emoji: '🏖️',
      name: 'Lago de Tota y Playa Blanca',
      meta: 'A 30 min de la sede',
      desc: 'El lago más grande de Colombia y una playa de arena blanca a 3.015 msnm — una de las más altas del mundo.',
      osmLat: 5.5167,
      osmLng: -72.9167,
      osmZoom: 12
    },
    {
      emoji: '🏛️',
      name: 'Museo Arqueológico de Sogamoso',
      meta: 'En la ciudad',
      desc: 'La reconstrucción del Templo del Sol muisca, en la ciudad que fue centro religioso de la cultura que habitó este valle.',
      osmLat: 5.7167,
      osmLng: -72.9333,
      osmZoom: 16
    },
    {
      emoji: '♨️',
      name: 'Termales de Paipa',
      meta: 'A 40 min de la sede',
      desc: 'Aguas termales de origen geotérmico — el mismo sistema que estudiamos en una de las salidas de campo del evento.',
      osmLat: 5.7667,
      osmLng: -73.1167,
      osmZoom: 13
    },
    {
      emoji: '🗿',
      name: 'Pantano de Vargas',
      meta: 'A 30 min de la sede',
      desc: 'El monumento a los 14 Lanceros, escenario de la batalla decisiva de la campaña libertadora de 1819.',
      osmLat: 5.8167,
      osmLng: -73.05,
      osmZoom: 14
    },
    {
      emoji: '🏔️',
      name: 'Sierra Nevada del Cocuy',
      meta: 'Salida de campo oficial',
      desc: 'Picos glaciares por encima de los 5.000 msnm. Una de las salidas de campo insignia de la XVII STG.',
      osmLat: 6.4167,
      osmLng: -72.25,
      osmZoom: 11
    },
    {
      emoji: '🦴',
      name: 'Villa de Leyva',
      meta: 'A 2 h de la sede',
      desc: 'Fósiles marinos del Cretácico, el kronosaurio de El Fósil y una de las plazas coloniales más bellas de Colombia.',
      osmLat: 5.6333,
      osmLng: -73.5167,
      osmZoom: 13
    }
  ];

  readonly sede = {
    name: 'UPTC Seccional Sogamoso',
    desc: 'Calle 4 Sur #15-134, Sogamoso, Boyacá. Todas las actividades del evento magistral ocurren en el campus. Desde Bogotá son ~3 horas por la vía Tunja; desde Tunja, ~1 hora.',
    osmLat: 5.7047,
    osmLng: -72.9414,
    osmZoom: 16,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=UPTC+Seccional+Sogamoso'
  };

  getOsmUrl(d: Destino): SafeResourceUrl {
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${d.osmLng - 0.01}%2C${d.osmLat - 0.01}%2C${d.osmLng + 0.01}%2C${d.osmLat + 0.01}&layer=mapnik&marker=${d.osmLat}%2C${d.osmLng}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getSedeOsmUrl(): SafeResourceUrl {
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${this.sede.osmLng - 0.005}%2C${this.sede.osmLat - 0.005}%2C${this.sede.osmLng + 0.005}%2C${this.sede.osmLat + 0.005}&layer=mapnik&marker=${this.sede.osmLat}%2C${this.sede.osmLng}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getOsmLink(d: Destino): string {
    return `https://www.openstreetmap.org/?mlat=${d.osmLat}&mlon=${d.osmLng}#map=${d.osmZoom}/${d.osmLat}/${d.osmLng}`;
  }

  trackDestino(name: string) {
    this.matomo.trackEvent('Content', 'destino_click', name);
  }

  trackSede() {
    this.matomo.trackEvent('Map', 'click_google_maps', 'sede_uptc');
  }
}
