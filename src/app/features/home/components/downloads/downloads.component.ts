import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Download, FileText, Presentation, MapIcon } from 'lucide-angular';

const ICONS = { Download, FileText, Presentation, MapIcon };
type IconKey = keyof typeof ICONS;

interface Resource {
  title: string;
  description: string;
  icon: IconKey;
  link: string;
  type: string;
}

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss'
})
export class DownloadsComponent {
  readonly icons = ICONS;

  resources: Resource[] = [
    {
      title: 'Plantilla de Diapositivas',
      description: 'Formato oficial para presentaciones magistrales y técnicas (16:9).',
      icon: 'Presentation',
      link: '#', // Drive link placeholder
      type: 'PowerPoint / Google Slides'
    },
    {
      title: 'Guía del Participante',
      description: 'Manual completo con la logística, recomendaciones de alojamiento y transporte en Sogamoso.',
      icon: 'FileText',
      link: '#',
      type: 'PDF'
    },
    {
      title: 'Mapa Geológico de la Región',
      description: 'Mapa detallado del Sinclinal de Sogamoso para uso en las salidas de campo programadas.',
      icon: 'MapIcon',
      link: '#',
      type: 'PDF / Resolución 4K'
    }
  ];
}
