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
      title: 'Plantilla de Resúmenes',
      description: 'invita a enviar los resúmenes de ponencias para presentaciones orales o posters, que se llevarán acabo en modalidad presencial.',
      icon: 'FileText',
      link: 'https://docs.google.com/uc?export=download&id=1bRzalDnbFyu4gsaa4IRGfu4OHg5U4U1U',
      type: 'PDF / Word'
    },
    {
      title: 'Líneas Temáticas',
      description: 'Guía detallada con los ejes temáticos y áreas de investigación del evento.',
      icon: 'FileText',
      link: 'https://docs.google.com/uc?export=download&id=1rCKDAUUCXdq-GwVcHywFeBfxq3xCkiMi',
      type: 'PDF'
    },
    {
      title: 'Portafolio de Servicios',
      description: 'Información completa sobre niveles de patrocinio y beneficios comerciales.',
      icon: 'FileText',
      link: 'https://docs.google.com/uc?export=download&id=1uROI9_B0bpVaveday1LyKGI-ztLgNU9Q',
      type: 'PDF'
    }
  ];
}
