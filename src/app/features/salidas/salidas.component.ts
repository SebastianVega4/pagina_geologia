import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, FileText, Download, ExternalLink, ChevronLeft, Map } from 'lucide-angular';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { RouterModule } from '@angular/router';

interface Salida {
  name: string;
  filename: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-salidas',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SafePipe, RouterModule],
  templateUrl: './salidas.component.html',
  styleUrl: './salidas.component.scss'
})
export class SalidasComponent {
  readonly icons = { FileText, Download, ExternalLink, ChevronLeft, Map };

  salidas: Salida[] = [
    /*{
      name: 'Salida de Campo — Zona Norte de Boyacá',
      filename: 'Guia_Salida_Zona_Norte.pdf',
      url: 'assets/SALIDAS/Guia_Salida_Zona_Norte.pdf',
      description: 'Itinerario detallado y paradas técnicas programadas para la zona norte del departamento.'
    },
    {
      name: 'Salida de Campo — Corredor Minero de Boyacá',
      filename: 'Guia_Salida_Corredor_Minero.pdf',
      url: 'assets/SALIDAS/Guia_Salida_Zona_Norte.pdf', // Placeholder
      description: 'Reconocimiento de depósitos de carbón y geología estructural del corredor minero. (Guía provisional)'
    },
    {
      name: 'Salida Geológica Especial — Región Carbonífera',
      filename: 'Guia_Salida_Region_Carbonifera.pdf',
      url: 'assets/SALIDAS/Guia_Salida_Zona_Norte.pdf', // Placeholder
      description: 'Estratigrafía y sedimentología de las secuencias cretácicas-paleógenas. (Guía provisional)'
    },
    {
      name: 'Travesía Geológica — Cordillera Oriental y Piedemonte Llanero',
      filename: 'Travesia_Cordillera_Piedemonte.pdf',
      url: 'assets/SALIDAS/Guia_Salida_Zona_Norte.pdf', // Placeholder
      description: 'Gran travesía de tres días analizando la evolución estructural y tectónica. (Guía provisional)'
    }*/
  ];

  selectedSalida: Salida = this.salidas[0];
  isPreviewLoaded = false;

  selectSalida(salida: Salida): void {
    if (this.selectedSalida.url !== salida.url || this.selectedSalida.name !== salida.name) {
      this.isPreviewLoaded = false;
      this.selectedSalida = salida;
    }
  }

  onIframeLoad(): void {
    this.isPreviewLoaded = true;
  }

  onMobileSelectChange(event: Event): void {
    const selectEl = event.target as HTMLSelectElement;
    const selectedName = selectEl.value;
    const found = this.salidas.find(s => s.name === selectedName);
    if (found) {
      this.selectSalida(found);
    }
  }
}
