import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrackClickDirective } from '../../shared/directives/track-click.directive';

interface Tier {
  est: string;
  egr: string;
  prof: string;
  label: string;
}

interface Curso {
  id: string;
  folder: string;
  imgs: number;
  titulo: string;
  instructor: string;
  fecha: string;
  duracion: string;
  cupos: number;
  tier: 'A' | 'B' | 'ANCLA';
  proximamente?: boolean;
  form?: string;
}

interface Salida {
  id: string;
  folder?: string;
  imgs?: number;
  titulo: string;
  instructor: string;
  fecha: string;
  cupos: number;
  casiAgotado?: boolean;
  placeholder?: boolean;
  precios: {
    est: string;
    egr: string;
    prof: string;
  };
  form?: string;
}

interface Charla {
  folder?: string;
  titulo: string;
  instructor: string;
  fecha: string;
}

interface LightboxItem {
  kind: string;
  folder: string;
  imgs: number;
  idx: number;
}

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule, TrackClickDirective],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class CursosComponent implements AfterViewInit {
  @ViewChild('gridCursos') gridCursos!: ElementRef<HTMLDivElement>;
  @ViewChild('gridSalidas') gridSalidas!: ElementRef<HTMLDivElement>;
  @ViewChild('gridCharlas') gridCharlas!: ElementRef<HTMLDivElement>;

  readonly EVENTO_FORM = 'https://forms.gle/pEavT8emjqy12rt36';

  readonly TIERS: Record<'A' | 'B' | 'ANCLA', Tier> = {
    A:     { est: '100K', egr: '150K', prof: '170K', label: 'Curso estándar' },
    B:     { est: '70K',  egr: '90K',  prof: '120K', label: 'Curso corto' },
    ANCLA: { est: '170K', egr: '270K', prof: '370K', label: 'Curso insignia' },
  };

  readonly CURSOS: Curso[] = [
    { id: 'c1', folder: 'Isótopos radiogénicos en paleoceanografía aplicaciones al estudio de la circulación oceánica y el cambio climático', imgs: 3,
      titulo: 'Isótopos radiogénicos en paleoceanografía', instructor: 'Paloma Olarte', fecha: '22 Ago', duracion: '9 hr · 8 AM–5 PM', cupos: 25, tier: 'A',
      form: 'https://docs.google.com/forms/d/e/1FAIpQLSehNeRjj3HyW8y5rmf6s5njJrCEJAkO8M-_pfBTd0oJIobXAg/viewform' },
    { id: 'c2', folder: 'Introducción a la termobarometría', imgs: 3,
      titulo: 'Introducción a la termobarometría', instructor: 'Astrid Siachoque Velandia', fecha: '18 Ago', duracion: '8 hr · 8 AM–4 PM', cupos: 18, tier: 'A',
      form: 'https://docs.google.com/forms/d/e/1FAIpQLSe9-9SQln1TgICk38Js7y_-r-wY77qum5B4EGm0SwllPZdZSw/viewform' },
    { id: 'c3', folder: 'Diseño de levantamientos sísmicos 3D', imgs: 3,
      titulo: 'Diseño de levantamientos sísmicos 3D', instructor: 'Jaime Checa', fecha: '22 Ago', duracion: '4–6 hr · 9 AM–4 PM', cupos: 20, tier: 'A',
      form: 'https://docs.google.com/forms/d/e/1FAIpQLScWjMMXThNnFRMln4t3JlIT3U1SQ7ozI-hTzamqfF1VzyXiSg/viewform' },
    { id: 'c4', folder: 'Geosciences and the Energy Transition Challenge', imgs: 3,
      titulo: 'Geosciences and the Energy Transition Challenge', instructor: 'Eilard Hoogerduijn Strating', fecha: '17–18 Ago', duracion: '16 hr · 8 AM–6 PM', cupos: 25, tier: 'ANCLA', proximamente: true,
      form: 'https://docs.google.com/forms/d/e/1FAIpQLSejgIgDtXy33p3FwRgWPfhZsCdxpwcTCtNMvD8sxu5njJDAAQ/viewform' },
    { id: 'c5', folder: 'Pilotes con inyección de lechada (post grouting) diseño, mecanismos y aplicaciones', imgs: 3,
      titulo: 'Pilotes con inyección de lechada (post grouting)', instructor: 'Danny José Useche Infante', fecha: '17 Ago', duracion: '4 hr · 8 AM–12 M', cupos: 20, tier: 'B',
      form: 'https://docs.google.com/forms/d/e/1FAIpQLSfNH9gZt1rnuHftr0aXC0thd99b4IAY8ZZ5XHF0sSGGzbtxng/viewform' },
    { id: 'c6', folder: 'Visión Artificial y Deep Learning para la Gestión del Riesgo Automatización de la Cartografía de Deslizamientos en la Cordillera Oriental', imgs: 3,
      titulo: 'Visión Artificial y Deep Learning para la Gestión del Riesgo', instructor: 'Ernesto Gutiérrez — Semillero GIS & GR', fecha: '18 Ago', duracion: '4 hr · 8 AM–12 M', cupos: 30, tier: 'B',
      form: 'https://docs.google.com/forms/d/e/1FAIpQLSffvtJs1TiQ10g9tVsnpEDDQXJhPCwsckMr2AXjmHkAncCzsQ/viewform' },
    { id: 'c7', folder: 'Introducción a la Geocronología y Termocronología Aplicada', imgs: 3,
      titulo: 'Introducción a la Geocronología y Termocronología Aplicada', instructor: 'Mauricio Bermúdez y Carolina Sandoval', fecha: '22 Ago', duracion: '6 hr · 9 AM–5 PM', cupos: 14, tier: 'A',
      form: 'https://docs.google.com/forms/d/e/1FAIpQLSeH63Ax6RICob3xbRX948E73VAZtoJsJ5qAGu8mBF1vesJPwg/viewform' },
    { id: 'c8', folder: 'Aplicaciones de los foraminíferos en ambientes recientes y pasados', imgs: 3,
      titulo: 'Aplicaciones de los foraminíferos en ambientes recientes y pasados', instructor: 'Germán David Patarroyo Camargo', fecha: '16 Ago', duracion: '7 hr · 9 AM–4 PM', cupos: 17, tier: 'A',
      form: 'https://docs.google.com/forms/d/e/1FAIpQLSfs8IZ3v7gWl9485CJH9zFck-rUNhn_cAf805lNYYVUAzDxSw/viewform' },
    { id: 'c9', folder: 'Petrografía Aplicada a la Construcción Alcances, Aplicaciones y Fundamentos de la Inspección Petrográfica bajo ASTM C295-19 y ASTM C856-25', imgs: 3,
      titulo: 'Petrografía Aplicada a la Construcción (ASTM C295/C856)', instructor: 'Julián Esteban Hernández Roca', fecha: '17 Ago', duracion: '8 hr · 8 AM–6 PM', cupos: 17, tier: 'A',
      form: 'https://docs.google.com/forms/d/e/1FAIpQLSfwE39muZW2iGZo0PUMzTrev9yJzxJI7psGOWzjfaTRPAE9nQ/viewform' },
  ];

  readonly SALIDAS: Salida[] = [
    { id: 's1', folder: 'Nevado del Cocuy - Güican', imgs: 2,
      titulo: 'Nevado del Cocuy – Güicán', instructor: 'Ing. Ernesto Gutiérrez', fecha: '15–16–17 Ago', cupos: 25, casiAgotado: true,
      precios: { est: '400K', egr: '450K', prof: '500K' },
      form: 'https://docs.google.com/forms/d/e/1FAIpQLSf3eWKnC37X720WseIqyJn27TO3under-ejZ_VmblWttxACAQ/viewform' },
    { id: 's2', folder: 'Estilos estructurales en la zona axial de la Cordillera Oriental de Colombia', imgs: 2,
      titulo: 'Paz de Río – Capitanejo', instructor: 'Francisco Velandia · Javier Idárraga', fecha: '17–18 Ago', cupos: 22,
      precios: { est: '330K', egr: '380K', prof: '430K' },
      form: 'https://docs.google.com/forms/d/e/1FAIpQLScUTFo7zpRvdtfogVD-o1ZTb_SxFr8NwiTSPPogH82-qcQEtA/viewform' },
    { id: 's3', folder: 'Sistema geotérmico de Paipa', imgs: 2,
      titulo: 'Sistema geotérmico de Paipa', instructor: 'AGEOCOL · Semillero de Geotérmica UPTC', fecha: '16 Ago', cupos: 25,
      precios: { est: '70K', egr: '90K', prof: '120K' },
      form: 'https://docs.google.com/forms/d/e/1FAIpQLScYSHeeAkDhlXfKBpgfkS0Qtwqi_7Vemk3o5Bewp3ZjMqib0A/viewform' },
    { id: 's4', folder: 'Borde llanero', imgs: 2,
      titulo: 'Borde Llanero', instructor: 'Jorge Mariño', fecha: '22–23 Ago', cupos: 28,
      precios: { est: '330K', egr: '380K', prof: '430K' },
      form: 'https://docs.google.com/forms/d/e/1FAIpQLSd1sSbdaVv_CQYcxoes3mGe4OQ7kwtNHTGF6-1oZZz0VQV6FQ/viewform' },
    { id: 's5', titulo: 'Floresta', instructor: 'Por confirmar', fecha: '18 Ago (tentativo)', cupos: 23, placeholder: true,
      precios: { est: '100K', egr: '150K', prof: '170K' } },
    { id: 's6', titulo: 'Villa de Leyva', instructor: 'Por confirmar', fecha: '17 Ago (tentativo)', cupos: 23, placeholder: true,
      precios: { est: '100K', egr: '150K', prof: '170K' } },
    { id: 's7', titulo: 'Siderúrgica Paz de Río (tren)', instructor: 'Acerías Paz de Río', fecha: '18 Ago (tentativo, aún por confirmar)', cupos: 28, placeholder: true,
      precios: { est: '100K', egr: '150K', prof: '170K' } },
  ];

  readonly CHARLAS: Charla[] = [
    { folder: 'Elementos para entender el fracking en Colombia', titulo: 'Elementos para entender el fracking en Colombia', instructor: 'Jaime Checa Jiménez', fecha: '21 Ago' },
    { titulo: 'Territorio, energía y decisiones: las geociencias como brújula del Estado', instructor: 'Flover Rodríguez-Portillo', fecha: '20 Ago' },
    { folder: 'La otra falla geológica nuestra relación con las comunidades y el ingreso a territorio', titulo: 'La otra falla geológica: nuestra relación con las comunidades y el ingreso a territorio', instructor: 'Cesar Augusto Otálvaro Sierra', fecha: '19 Ago' },
    { folder: 'Caracterización de rezumaderos a partir de productos de sensores remotos', titulo: 'Caracterización de rezumaderos a partir de productos de sensores remotos', instructor: 'Iván Rodrigo Plata Arango', fecha: '21 Ago' },
    { folder: 'Artificial Intelligence and Seismic Networks in the Ecuador-Colombia Subduction Zone', titulo: 'Artificial Intelligence and Seismic Networks in the Ecuador-Colombia Subduction Zone', instructor: 'Alexander Wickham-Piotrowski', fecha: '20 Ago' },
    { folder: 'Simulando la corteza y el manto en el laboratorio uso de la petrología experimental para entender la distribución de los elementos químicos', titulo: 'Simulando la corteza y el manto en el laboratorio', instructor: 'Andrés Salazar', fecha: '19 Ago' },
    { folder: 'Tectónica y fuentes sismogénicas el NE de Colombia', titulo: 'Tectónica y fuentes sismogénicas en el NE de Colombia', instructor: 'Francisco Velandia', fecha: '19 Ago' },
    { titulo: 'The Changing Role of Geosciences in the Energy Transition', instructor: 'Eilard Hoogerduijn Strating', fecha: '21 Ago' },
    { titulo: 'Minerales Estratégicos y Transición Energética: Nuevas Oportunidades', instructor: 'Esteban Castillo', fecha: '21 Ago' },
    { titulo: 'La temperatura: un factor subestimado en la interpretación estructural', instructor: 'Eduardo Rossello', fecha: '20 Ago' },
    { titulo: 'Espacio institucional — TRANSFIGURA', instructor: 'Por confirmar', fecha: '19 Ago' },
    { titulo: 'Espacio institucional — Sociedad Colombiana de Geotecnia (SCG)', instructor: 'Por confirmar', fecha: '21 Ago' },
    { titulo: 'Espacio institucional — Servicio Geológico Colombiano (SGC)', instructor: 'Por confirmar', fecha: '20 Ago' },
    { titulo: 'Espacio institucional — ANH', instructor: 'Por confirmar', fecha: '21 Ago' },
    { titulo: 'Charla por confirmar', instructor: 'Ponente por confirmar', fecha: '20 Ago' },
  ];

  isPrevDisabled = { cursos: true, salidas: true, charlas: true };
  isNextDisabled = { cursos: false, salidas: false, charlas: false };

  currentLightbox: LightboxItem | null = null;

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateAllNavStates();
    }, 150);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateAllNavStates();
  }

  scrollCarousel(track: HTMLDivElement, direction: number, key: 'cursos' | 'salidas' | 'charlas') {
    const scrollAmount = track.clientWidth * 0.9;
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    setTimeout(() => this.updateNavState(key), 300);
  }

  updateNavState(key: 'cursos' | 'salidas' | 'charlas') {
    let track: HTMLDivElement | null = null;
    if (key === 'cursos') track = this.gridCursos?.nativeElement;
    else if (key === 'salidas') track = this.gridSalidas?.nativeElement;
    else if (key === 'charlas') track = this.gridCharlas?.nativeElement;

    if (track) {
      const max = track.scrollWidth - track.clientWidth;
      this.isPrevDisabled[key] = track.scrollLeft <= 4;
      this.isNextDisabled[key] = track.scrollLeft >= max - 4;
    }
  }

  updateAllNavStates() {
    this.updateNavState('cursos');
    this.updateNavState('salidas');
    this.updateNavState('charlas');
  }

  imgPath(kind: string, folder: string | undefined, n: number): string {
    if (!folder) return '';
    if (kind === 'charla') {
      return encodeURI(`assets/CHARLAS/${folder}.png`);
    }
    const sub = kind === 'curso' ? 'CURSOS' : 'SALIDAS';
    return encodeURI(`assets/${sub}/${folder}/${n}.png`);
  }

  openLightbox(kind: string, folder: string | undefined, imgs: number | undefined) {
    if (!folder || !imgs) return;
    this.currentLightbox = {
      kind,
      folder,
      imgs: Number(imgs),
      idx: 0
    };
  }

  closeLightbox() {
    this.currentLightbox = null;
  }

  prevLightbox() {
    if (!this.currentLightbox) return;
    const current = this.currentLightbox;
    current.idx = (current.idx - 1 + current.imgs) % current.imgs;
  }

  nextLightbox() {
    if (!this.currentLightbox) return;
    const current = this.currentLightbox;
    current.idx = (current.idx + 1) % current.imgs;
  }

  onLightboxContainerClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('lightbox')) {
      this.closeLightbox();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.currentLightbox) return;
    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowLeft' && this.currentLightbox.imgs > 1) {
      this.prevLightbox();
    } else if (event.key === 'ArrowRight' && this.currentLightbox.imgs > 1) {
      this.nextLightbox();
    }
  }

  scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Avoid being covered by sticky navs
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }

  getMailtoLink(title: string, isSalida: boolean = false): string {
    const subject = isSalida ? `Interés salida ${title}` : `Aviso ${title}`;
    return `mailto:xvii.semanatecnica@uptc.edu.co?subject=${encodeURIComponent(subject)}`;
  }
}
