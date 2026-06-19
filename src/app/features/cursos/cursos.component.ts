import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, FileText, Download, ExternalLink, ChevronLeft, BookOpen } from 'lucide-angular';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { RouterModule } from '@angular/router';

interface Curso {
  name: string;
  filename: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SafePipe, RouterModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent {
  readonly icons = { FileText, Download, ExternalLink, ChevronLeft, BookOpen };

  cursos: Curso[] = [
    {
      name: 'Patología de la Construcción y Patrones de Fisuración en el Concreto',
      filename: 'CONCRELAB.pdf',
      url: 'assets/CURSOS/CONCRELAB.pdf',
      description: 'Dictado por CONCRELAB. Análisis detallado de patologías constructivas.'
    },
    {
      name: 'Diseño Geotécnico de Anclajes y Cimentaciones Especiales',
      filename: 'Curso Geo Consultores.pdf',
      url: 'assets/CURSOS/Curso Geo Consultores.pdf',
      description: 'Dictado por Geo Consultores. Métodos avanzados de cimentación y anclajes.'
    },
    {
      name: 'Modelamiento Geológico en 3D',
      filename: 'DISEÑOS 3D.pdf',
      url: 'assets/CURSOS/DISEÑOS 3D.pdf',
      description: 'Modelamiento tridimensional estructurado para yacimientos y geotecnia.'
    },
    {
      name: 'Micropaleontología Aplicada: Foraminíferos',
      filename: 'FORAMINIFEROS.pdf',
      url: 'assets/CURSOS/FORAMINIFEROS.pdf',
      description: 'Estratigrafía y reconstrucciones paleoambientales usando microfósiles.'
    },
    {
      name: 'Geocronología y Evolución Tectónica',
      filename: 'GEOCRONOLOGIA.pdf',
      url: 'assets/CURSOS/GEOCRONOLOGIA.pdf',
      description: 'Datación radiométrica y evolución de cinturones orogénicos.'
    },
    {
      name: 'Isótopos Radiogénicos en Geociencias',
      filename: 'ISÓTOPOS RADIOGÉNICOS.pdf',
      url: 'assets/CURSOS/ISÓTOPOS RADIOGÉNICOS.pdf',
      description: 'Técnicas analíticas e interpretación geoquímica en la cordillera.'
    },
    {
      name: 'Diseño y Construcción de Pilotes por Inyección',
      filename: 'PILOTES INYECCION.pdf',
      url: 'assets/CURSOS/PILOTES INYECCION.pdf',
      description: 'Técnicas de cimentación profunda y procesos de inyección de lechadas.'
    },
    {
      name: 'Termobarometría Metamórfica y Magmática',
      filename: 'TERMOBARIMETRIA.pdf',
      url: 'assets/CURSOS/TERMOBARIMETRIA.pdf',
      description: 'Cálculo de condiciones de P-T en rocas ígneas y metamórficas.'
    },
    {
      name: 'Visión Artificial y Machine Learning Aplicado a la Geología',
      filename: 'VISION ARTIFICIAL.pdf',
      url: 'assets/CURSOS/VISION ARTIFICIAL.pdf',
      description: 'Procesamiento de imágenes y clasificación automática de litofacies.'
    }
  ];

  selectedCurso: Curso = this.cursos[0];
  isPreviewLoaded = false;

  selectCurso(curso: Curso): void {
    if (this.selectedCurso.url !== curso.url) {
      this.isPreviewLoaded = false;
      this.selectedCurso = curso;
    }
  }

  onIframeLoad(): void {
    this.isPreviewLoaded = true;
  }

  onMobileSelectChange(event: Event): void {
    const selectEl = event.target as HTMLSelectElement;
    const selectedUrl = selectEl.value;
    const found = this.cursos.find(c => c.url === selectedUrl);
    if (found) {
      this.selectCurso(found);
    }
  }
}
