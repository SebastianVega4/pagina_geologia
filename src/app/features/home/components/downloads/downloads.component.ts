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
      title: 'titulo',
      description: 'descripcion',
      icon: 'Presentation',
      link: 'link',
      type: 'PDF'
    },
    {
      title: 'titulo',
      description: 'descripcion',
      icon: 'Presentation',
      link: 'link',
      type: 'AI / PDF / PPTX'
    }
  ];
}
