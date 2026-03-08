import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { LucideAngularModule, MapPin, Navigation } from 'lucide-angular';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, LucideAngularModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  readonly icons = { MapPin, Navigation };
  
  apiLoaded = false;
  center: any = { lat: 5.725, lng: -72.915 }; // Sogamoso center
  zoom = 14;

  options: any = {
    mapId: 'GEO_CONGRESO_MAP',
    disableDefaultUI: false,
    scrollwheel: false,
    styles: [
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [ { "color": "#7c93a3" }, { "lightness": "-10" } ]
      }
    ]
  };

  markers = [
    {
      position: { lat: 5.7288, lng: -72.9095 },
      title: 'UPTC Seccional Sogamoso',
      label: 'Sede Principal del Congreso',
      info: 'Auditorio Cacique Sugamuxi'
    },
    {
      position: { lat: 5.7155, lng: -72.9304 },
      title: 'Plaza de la Villa',
      label: 'Punto de Encuentro Centro',
      info: 'Centro Histórico'
    },
    {
      position: { lat: 5.722, lng: -72.923 },
      title: 'Zona Hotelera Recomendada',
      label: 'Alojamientos Aliados',
      info: 'Calle 11 con Carrera 11'
    }
  ];

  ngOnInit(): void {
    // Check if google maps script is loaded
    this.apiLoaded = typeof google !== 'undefined' && typeof google.maps !== 'undefined';
  }
}
