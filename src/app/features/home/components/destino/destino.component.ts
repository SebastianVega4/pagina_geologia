import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatomoService } from '../../../../core/services/matomo.service';

interface Destino {
  emoji: string;
  name: string;
  meta: string;
  desc: string;
  mapQuery: string;
  mapsUrl: string;
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

  readonly destinos: Destino[] = [
    {
      emoji: '🏖️',
      name: 'Lago de Tota y Playa Blanca',
      meta: 'A 30 min de la sede',
      desc: 'El lago más grande de Colombia y una playa de arena blanca a 3.015 msnm — una de las más altas del mundo.',
      mapQuery: 'Playa%20Blanca%2C%20Lago%20de%20Tota%2C%20Boyac%C3%A1%2C%20Colombia',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Playa%20Blanca%2C%20Lago%20de%20Tota%2C%20Boyac%C3%A1%2C%20Colombia'
    },
    {
      emoji: '🏛️',
      name: 'Museo Arqueológico de Sogamoso',
      meta: 'En la ciudad',
      desc: 'La reconstrucción del Templo del Sol muisca, en la ciudad que fue centro religioso de la cultura que habitó este valle.',
      mapQuery: 'Museo%20Arqueol%C3%B3gico%20de%20Sogamoso%2C%20Boyac%C3%A1%2C%20Colombia',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Museo%20Arqueol%C3%B3gico%20de%20Sogamoso%2C%20Boyac%C3%A1%2C%20Colombia'
    },
    {
      emoji: '♨️',
      name: 'Termales de Paipa',
      meta: 'A 40 min de la sede',
      desc: 'Aguas termales de origen geotérmico — el mismo sistema que estudiamos en una de las salidas de campo del evento.',
      mapQuery: 'Termales%20de%20Paipa%2C%20Boyac%C3%A1%2C%20Colombia',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Termales%20de%20Paipa%2C%20Boyac%C3%A1%2C%20Colombia'
    },
    {
      emoji: '🗿',
      name: 'Pantano de Vargas',
      meta: 'A 30 min de la sede',
      desc: 'El monumento a los 14 Lanceros, escenario de la batalla decisiva de la campaña libertadora de 1819.',
      mapQuery: 'Monumento%20a%20Los%20Lanceros%2C%20Pantano%20de%20Vargas%2C%20Boyac%C3%A1',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Monumento%20a%20Los%20Lanceros%2C%20Pantano%20de%20Vargas%2C%20Boyac%C3%A1'
    },
    {
      emoji: '🏔️',
      name: 'Sierra Nevada del Cocuy',
      meta: 'Salida de campo oficial',
      desc: 'Picos glaciares por encima de los 5.000 msnm. Una de las salidas de campo insignia de la XVII STG.',
      mapQuery: 'Parque%20Nacional%20Natural%20El%20Cocuy%2C%20Boyac%C3%A1%2C%20Colombia',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Parque%20Nacional%20Natural%20El%20Cocuy%2C%20Boyac%C3%A1%2C%20Colombia'
    },
    {
      emoji: '🦴',
      name: 'Villa de Leyva',
      meta: 'A 2 h de la sede',
      desc: 'Fósiles marinos del Cretácico, el kronosaurio de El Fósil y una de las plazas coloniales más bellas de Colombia.',
      mapQuery: 'Villa%20de%20Leyva%2C%20Boyac%C3%A1%2C%20Colombia',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Villa%20de%20Leyva%2C%20Boyac%C3%A1%2C%20Colombia'
    }
  ];

  readonly sede = {
    name: 'UPTC Seccional Sogamoso',
    desc: 'Calle 4 Sur #15-134, Sogamoso, Boyacá. Todas las actividades del evento magistral ocurren en el campus. Desde Bogotá son ~3 horas por la vía Tunja; desde Tunja, ~1 hora.',
    mapQuery: 'UPTC+Seccional+Sogamoso,+Sogamoso,+Boyac%C3%A1',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=UPTC+Seccional+Sogamoso'
  };

  trackDestino(name: string) {
    this.matomo.trackEvent('Content', 'destino_click', name);
  }

  trackSede() {
    this.matomo.trackEvent('Map', 'click_google_maps', 'sede_uptc');
  }
}
