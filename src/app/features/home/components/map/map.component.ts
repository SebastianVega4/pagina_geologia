import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, MapPin, Navigation } from 'lucide-angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly icons = { MapPin, Navigation };
  
  private map?: L.Map;
  apiLoaded = false;

  markers = [
    {
      lat: 5.704709,
      lng: -72.941443,
      title: 'Auditorio Cacique Sugamuxi',
      label: 'Sede Magistral',
      info: 'Ubicación de ponencias magistrales y actos de apertura/clausura.'
    },
    {
      lat: 5.704917,
      lng: -72.942006,
      title: 'UPTC - Facultad Seccional Sogamoso',
      label: 'Acceso Principal',
      info: 'Sede oficial de la XVII Semana Técnica de Geología.'
    },
    {
      lat:5.705051,
      lng: -72.942076,
      title: 'Edificio de Ingeniería Geológica',
      label: 'Centro Operativo',
      info: 'Muestra comercial, registro de participantes y sesiones técnicas.'
    },
    {
      lat: 5.714721,
      lng: -72.927698,
      title: 'Plaza de la Villa',
      label: 'Centro de Sogamoso',
      info: 'Punto de referencia cultural y turístico de la ciudad.'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.apiLoaded = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    const center: L.LatLngExpression = [5.722, -72.915];
    
    this.map = L.map('map', {
      center: center,
      zoom: 14,
      scrollWheelZoom: false
    });

    // Dark tiles (CartoDB Dark Matter) or standard OSM?
    // Let's use a nice professional look:
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(this.map);

    // Add markers
    this.markers.forEach(m => {
      const marker = L.marker([m.lat, m.lng], {
        title: m.title
      }).addTo(this.map!);

      marker.bindPopup(`
        <div class="p-2">
          <h5 class="font-bold text-brand-primary mb-1">${m.title}</h5>
          <p class="text-xs text-brand-secondary font-bold mb-1">${m.label}</p>
          <p class="text-xs text-gray-600">${m.info}</p>
        </div>
      `);
    });

    // Fix for Leaflet not rendering correctly inside hidden elements initially
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 500);
  }
}
