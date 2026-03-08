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
      title: 'Guía de Resúmenes',
      description: 'Normas de estilo y extensiones para el envío de trabajos de investigación.',
      icon: 'FileText',
      link: '#',
      type: 'PDF'
    },
    {
      title: 'Plantilla de Póster',
      description: 'Dimensiones y legibilidad recomendada para la sesión de posters científicos.',
      icon: 'Download',
      link: '#',
      type: 'AI / PDF / PPTX'
    },
    {
      title: 'Guía de Salidas de Campo',
      description: 'Información logística, equipo necesario y rutas detalladas de las jornadas.',
      icon: 'MapIcon',
      link: '#',
      type: 'PDF'
    }
  ];
}
