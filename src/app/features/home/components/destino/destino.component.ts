import { Component, inject, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatomoService } from '../../../../core/services/matomo.service';

@Component({
  selector: 'app-destino',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destino.component.html',
  styleUrl: './destino.component.scss'
})
export class DestinoComponent implements OnInit, AfterViewInit {
  private matomo = inject(MatomoService);

  @ViewChildren('mapContainer') mapContainers!: QueryList<ElementRef>;

  destinos = [
    { emoji: '🏖️', name: 'Lago de Tota y Playa Blanca', meta: 'A 30 min de la sede', desc: 'El lago más grande de Colombia y una playa de arena blanca a 3.015 msnm — una de las más altas del mundo.', query: 'Playa Blanca, Lago de Tota, Boyacá, Colombia', link: 'https://www.google.com/maps/search/?api=1&query=Playa%20Blanca%2C%20Lago%20de%20Tota%2C%20Boyac%C3%A1%2C%20Colombia' },
    { emoji: '🏛️', name: 'Museo Arqueológico de Sogamoso', meta: 'En la ciudad', desc: 'La reconstrucción del Templo del Sol muisca, en la ciudad que fue centro religioso de la cultura que habitó este valle.', query: 'Museo Arqueológico de Sogamoso, Boyacá, Colombia', link: 'https://www.google.com/maps/search/?api=1&query=Museo%20Arqueol%C3%B3gico%20de%20Sogamoso%2C%20Boyac%C3%A1%2C%20Colombia' },
    { emoji: '♨️', name: 'Termales de Paipa', meta: 'A 40 min de la sede', desc: 'Aguas termales de origen geotérmico — el mismo sistema que estudiamos en una de las salidas de campo del evento.', query: 'Termales de Paipa, Boyacá, Colombia', link: 'https://www.google.com/maps/search/?api=1&query=Termales%20de%20Paipa%2C%20Boyac%C3%A1%2C%20Colombia' },
    { emoji: '🗿', name: 'Pantano de Vargas', meta: 'A 30 min de la sede', desc: 'El monumento a los 14 Lanceros, escenario de la batalla decisiva de la campaña libertadora de 1819.', query: 'Monumento a Los Lanceros, Pantano de Vargas, Boyacá', link: 'https://www.google.com/maps/search/?api=1&query=Monumento%20a%20Los%20Lanceros%2C%20Pantano%20de%20Vargas%2C%20Boyac%C3%A1' },
    { emoji: '🏔️', name: 'Sierra Nevada del Cocuy', meta: 'Salida de campo oficial', desc: 'Picos glaciares por encima de los 5.000 msnm. Una de las salidas de campo insignia de la XVII STG.', query: 'Parque Nacional Natural El Cocuy, Boyacá, Colombia', link: 'https://www.google.com/maps/search/?api=1&query=Parque%20Nacional%20Natural%20El%20Cocuy%2C%20Boyac%C3%A1%2C%20Colombia' },
    { emoji: '🦴', name: 'Villa de Leyva', meta: 'A 2 h de la sede', desc: 'Fósiles marinos del Cretácico, el kronosaurio de El Fósil y una de las plazas coloniales más bellas de Colombia.', query: 'Villa de Leyva, Boyacá, Colombia', link: 'https://www.google.com/maps/search/?api=1&query=Villa%20de%20Leyva%2C%20Boyac%C3%A1%2C%20Colombia' }
  ];

  sedeQuery = 'UPTC Seccional Sogamoso, Sogamoso, Boyacá';
  sedeLink = 'https://www.google.com/maps/search/?api=1&query=UPTC+Seccional+Sogamoso';

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createIframes();
    }, 100);
  }

  private createIframes(): void {
    const containers = this.mapContainers.toArray();

    this.destinos.forEach((d, i) => {
      if (containers[i]) {
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.google.com/maps?q=' + encodeURIComponent(d.query) + '&output=embed';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        iframe.title = 'Ubicación de ' + d.name;
        iframe.style.width = '100%';
        iframe.style.height = '160px';
        iframe.style.border = '0';
        iframe.style.display = 'block';
        containers[i].nativeElement.appendChild(iframe);
      }
    });

    const sedeContainer = containers[this.destinos.length];
    if (sedeContainer) {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=' + encodeURIComponent(this.sedeQuery) + '&output=embed';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.title = 'Ubicación de la UPTC Seccional Sogamoso';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.minHeight = '320px';
      iframe.style.border = '0';
      iframe.style.display = 'block';
      sedeContainer.nativeElement.appendChild(iframe);
    }
  }

  trackDestino(name: string) {
    this.matomo.trackEvent('Content', 'destino_click', name);
  }

  trackSede() {
    this.matomo.trackEvent('Map', 'click_google_maps', 'sede_uptc');
  }
}
