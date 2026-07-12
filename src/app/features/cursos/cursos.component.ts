import { Component, AfterViewInit, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TrackClickDirective } from '../../shared/directives/track-click.directive';
import { MatomoService } from '../../core/services/matomo.service';

interface Tier {
  est: string;
  egr: string;
  prof: string;
  label: string;
}

interface CursoRaw {
  id: string; folder: string; imgs: number;
  titulo: string; instructor: string; fecha: string; duracion: string;
  cupos: number; tier: 'A' | 'B' | 'ANCLA';
  form?: string;
}

interface SalidaRaw {
  id: string; folder?: string; imgs?: number;
  titulo: string; instructor: string; fecha: string; cupos: number;
  casiAgotado?: boolean; placeholder?: boolean;
  precios: { est: string; egr: string; prof: string };
  form?: string;
}

interface CharlaRaw {
  folder?: string; titulo: string; instructor: string; fecha: string;
  org?: string; tbd?: boolean;
}

interface DeckDOM {
  deck: HTMLElement; cards: HTMLElement[]; info: HTMLElement;
  listItems: HTMLElement[]; marker: HTMLElement | null;
}

interface DeckItem {
  kind: string; folder: string; imgs: number;
  titulo: string; sub: string; extra: string;
  cupos: number | null; badge: string | null; waitlist: boolean;
  prices: [string, string][] | null;
  note: string;
  cta: { href: string; label: string; ghost: boolean };
  kindLabel?: string;
}

interface DeckState {
  cur: number;
  isSwapping: boolean;
  infoTimer: ReturnType<typeof setTimeout> | null;
}

interface MetricsResult {
  CW: number; IW: number; fr: number;
  peeks: { poke: number; s: number; y: number; ry: number; zR: number; zL: number }[];
}

interface LightboxState {
  kind: string; folder: string; imgs: number; idx: number;
}

type DeckId = 'cursos' | 'salidas' | 'charlas' | 'especiales' | 'paneles';

const ALL_DECKS: DeckId[] = ['cursos', 'salidas', 'charlas', 'especiales', 'paneles'];

const BASE_IMG = 'assets';

const TIERS: Record<'A' | 'B' | 'ANCLA', Tier> = {
  A:     { est: '100K', egr: '150K', prof: '170K', label: 'Curso estándar' },
  B:     { est: '70K',  egr: '90K',  prof: '120K', label: 'Curso corto' },
  ANCLA: { est: '170K', egr: '270K', prof: '370K', label: 'Curso insignia' },
};

const CURSOS_RAW: CursoRaw[] = [
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
    titulo: 'Geosciences and the Energy Transition Challenge', instructor: 'Eilard Hoogerduijn Strating', fecha: '17–18 Ago', duracion: '16 hr · 8 AM–6 PM', cupos: 25, tier: 'ANCLA',
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

const SALIDAS_RAW: SalidaRaw[] = [
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

const CHARLAS_MAG_RAW: CharlaRaw[] = [
  { folder: 'Simulando la corteza y el manto en el laboratorio uso de la petrología experimental para entender la distribución de los elementos químicos', titulo: 'Simulando la corteza y el manto en el laboratorio', instructor: 'Andrés Salazar', org: 'Universidad de São Paulo', fecha: '19 Ago' },
  { titulo: 'Espacio institucional — CPG', instructor: 'Colombian Petroleum Group', org: 'CPG', fecha: '19 Ago', tbd: true },
  { folder: 'Artificial Intelligence and Seismic Networks in the Ecuador-Colombia Subduction Zone', titulo: 'Artificial Intelligence and Seismic Networks in the Ecuador-Colombia Subduction Zone', instructor: 'Alexander Wickham-Piotrowski', org: 'Institut de France', fecha: '20 Ago' },
  { folder: 'La temperatura un factor subestimado en la interpretación estructural', titulo: 'La temperatura: un factor subestimado en la interpretación estructural', instructor: 'Eduardo Rossello', org: 'Servicio Geológico Argentino', fecha: '20 Ago' },
  { folder: 'The Changing Role of Geosciences in the Energy Transition', titulo: 'The Changing Role of Geosciences in the Energy Transition', instructor: 'Eilard Hoogerduijn Strating', org: 'Internacional', fecha: '21 Ago' },
  { titulo: 'Espacio institucional — ANH', instructor: 'Agencia Nacional de Hidrocarburos', org: 'ANH', fecha: '21 Ago', tbd: true },
  { folder: 'Territorio, energía y decisiones las geociencias como brújula del Estado', titulo: 'Territorio, energía y decisiones: las geociencias como brújula del Estado', instructor: 'Flover Rodríguez-Portillo', org: 'ACGGP', fecha: '21 Ago' },
];

const ESPECIALES_RAW: CharlaRaw[] = [
  { folder: 'Tectónica y fuentes sismogénicas el NE de Colombia', titulo: 'Tectónica y fuentes sismogénicas en el NE de Colombia', instructor: 'Francisco Velandia', org: 'UIS', fecha: '19 Ago' },
  { titulo: 'Espacio institucional — Transfigura', instructor: 'Transfigura', org: 'Transfigura', fecha: '19 Ago', tbd: true },
  { titulo: 'Espacio institucional — Collective Mining', instructor: 'Collective Mining', org: 'Collective Mining', fecha: '19 Ago', tbd: true },
  { folder: 'La otra falla geológica nuestra relación con las comunidades y el ingreso a territorio', titulo: 'La otra falla geológica: nuestra relación con las comunidades y el ingreso a territorio', instructor: 'César Otálvaro', org: 'Universidad Nacional', fecha: '20 Ago' },
  { titulo: 'Espacio institucional — Servicio Geológico Colombiano (SGC)', instructor: 'Servicio Geológico Colombiano', org: 'SGC', fecha: '20 Ago', tbd: true },
  { folder: 'Elementos para entender el fracking en Colombia', titulo: 'Elementos para entender el fracking en Colombia', instructor: 'Jaime Checa Jiménez', org: 'ACGGP', fecha: '20 Ago' },
  { folder: 'Minerales Estratégicos y Transición Energética Nuevas Oportunidades', titulo: 'Minerales Estratégicos y Transición Energética: Nuevas Oportunidades', instructor: 'Esteban Castillo', org: 'ANM', fecha: '21 Ago' },
  { folder: 'Caracterización de rezumaderos a partir de productos de sensores remotos', titulo: 'Caracterización de rezumaderos a partir de productos de sensores remotos', instructor: 'Iván Plata', org: 'Ecopetrol', fecha: '21 Ago' },
  { titulo: 'Espacio institucional — Sociedad Colombiana de Geotecnia (SCG)', instructor: 'Sociedad Colombiana de Geotecnia', org: 'SCG', fecha: '21 Ago', tbd: true },
];

const PANELES_RAW: { kind: string; folder: string; titulo: string; instructor: string; fecha: string }[] = [
  { kind: 'panel', folder: 'Geología en Vivo Dos Expertos, Un Viaje al Corazón de la Tierra', titulo: 'Geología en Vivo: Dos Expertos, Un Viaje al Corazón de la Tierra', instructor: 'Italo Reyes y Manuel García', fecha: '20 Ago · Auditorio Cacique Suamox' },
];

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule, TrackClickDirective],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursosComponent implements AfterViewInit {
  readonly EVENTO_FORM = 'https://forms.gle/pEavT8emjqy12rt36';

  readonly deckItems: Record<DeckId, DeckItem[]> = {
    cursos: [], salidas: [], charlas: [], especiales: [], paneles: []
  };
  readonly deckStates: Record<DeckId, DeckState> = {
    cursos: { cur: 0, isSwapping: false, infoTimer: null },
    salidas: { cur: 0, isSwapping: false, infoTimer: null },
    charlas: { cur: 0, isSwapping: false, infoTimer: null },
    especiales: { cur: 0, isSwapping: false, infoTimer: null },
    paneles: { cur: 0, isSwapping: false, infoTimer: null }
  };
  private deckEls: Record<DeckId, DeckDOM> = {} as Record<DeckId, DeckDOM>;
  private metricsCache: Record<string, MetricsResult | null> = {};
  private resizeTimer: ReturnType<typeof setTimeout> | null = null;

  currentInfoHTML: Record<DeckId, SafeHtml> = {} as Record<DeckId, SafeHtml>;

  currentLightbox: LightboxState | null = null;
  private matomo = inject(MatomoService);

  constructor(
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {
    this.deckItems.cursos = CURSOS_RAW.map(c => {
      const p = TIERS[c.tier];
      return {
        kind: 'curso' as const, folder: c.folder, imgs: c.imgs, titulo: c.titulo, sub: c.instructor,
        extra: `${c.fecha} · ${c.duracion}`, cupos: c.cupos,
        badge: c.tier === 'ANCLA' ? 'Insignia' : null, waitlist: false,
        prices: [['Estudiante', p.est], ['Egresado', p.egr], ['Profesional', p.prof]] as [string, string][],
        note: 'Cupo limitado · certificado con horas académicas',
        cta: c.form
          ? { href: c.form, label: 'Inscribirme →', ghost: false }
          : { href: this.mailtoLink('Aviso ' + c.titulo), label: 'Quiero que me avisen →', ghost: true }
      };
    });
    this.deckItems.salidas = SALIDAS_RAW.map(s => ({
      kind: 'salida' as const, folder: s.folder || '', imgs: s.imgs || 0, titulo: s.titulo, sub: s.instructor,
      extra: s.fecha, cupos: s.cupos,
      badge: s.casiAgotado ? 'Casi agotado' : null, waitlist: !!s.casiAgotado,
      prices: [['Estudiante', s.precios.est], ['Egresado', s.precios.egr], ['Profesional', s.precios.prof]] as [string, string][],
      note: 'Cupo limitado · el detalle completo está en el flyer',
      cta: s.form
        ? { href: s.form, label: 'Inscribirme →', ghost: false }
        : { href: this.mailtoLink('Interés salida ' + s.titulo, true), label: 'Preguntar por cupo →', ghost: true }
    }));
    this.deckItems.charlas = CHARLAS_MAG_RAW.map(ch => ({
      kind: 'charla' as const, folder: ch.folder || '', imgs: ch.folder ? 1 : 0, titulo: ch.titulo,
      sub: ch.tbd ? 'Espacio institucional · por confirmar' : ch.instructor,
      extra: ch.fecha + (ch.org ? ' · ' + ch.org : ''), cupos: null, kindLabel: 'Charla magistral',
      badge: null, waitlist: false, prices: null,
      note: 'Incluida en la inscripción al evento magistral (19–21 ago) — no se vende por separado.',
      cta: { href: this.EVENTO_FORM, label: 'Inscribirme al evento →', ghost: true }
    }));
    this.deckItems.especiales = ESPECIALES_RAW.map(ch => ({
      kind: 'charla' as const, folder: ch.folder || '', imgs: ch.folder ? 1 : 0, titulo: ch.titulo,
      sub: ch.tbd ? 'Espacio institucional · por confirmar' : ch.instructor,
      extra: ch.fecha + (ch.org ? ' · ' + ch.org : ''), cupos: null, kindLabel: 'Charla especial',
      badge: null, waitlist: false, prices: null,
      note: 'Charla especial dentro del evento magistral (19–21 ago) — incluida en la inscripción.',
      cta: { href: this.EVENTO_FORM, label: 'Inscribirme al evento →', ghost: true }
    }));
    this.deckItems.paneles = PANELES_RAW.map(p => ({
      kind: 'panel' as const, folder: p.folder, imgs: 1, titulo: p.titulo, sub: p.instructor,
      extra: p.fecha, cupos: null, kindLabel: 'Panel · conversatorio',
      badge: null, waitlist: false, prices: null,
      note: 'Conversatorio abierto dentro del evento magistral (19–21 ago) — incluido en la inscripción.',
      cta: { href: this.EVENTO_FORM, label: 'Inscribirme al evento →', ghost: true }
    }));

    ALL_DECKS.forEach(id => {
      this.currentInfoHTML[id] = this.buildInfoHTML(this.deckItems[id][0]);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      ALL_DECKS.forEach(id => this.initDeck(id));
      this.setupDeckClickTracking();
    });
  }

  private setupDeckClickTracking(): void {
    document.addEventListener('click', (e: Event) => {
      const target = (e.target as HTMLElement).closest('.hero-cta') as HTMLElement | null;
      if (!target) return;
      const kind = target.getAttribute('data-track-kind') || '';
      const title = target.getAttribute('data-track-title') || '';
      this.matomo.trackEvent('Event', 'click_inscripcion_curso', kind + ' · ' + title);
    });
  }

  private mailtoLink(subject: string, _isSalida = false): string {
    return `mailto:xvii.semanatecnica@uptc.edu.co?subject=${encodeURIComponent(subject)}`;
  }

  imgPath(kind: string, folder: string | undefined, n: number): string {
    if (!folder) return '';
    if (kind === 'charla') return encodeURI(`${BASE_IMG}/CHARLAS/${folder}.png`);
    if (kind === 'panel') return encodeURI(`${BASE_IMG}/PANELES/${folder}.png`);
    const sub = kind === 'curso' ? 'CURSOS' : 'SALIDAS';
    return encodeURI(`${BASE_IMG}/${sub}/${folder}/${n}.png`);
  }

  pad(n: number, total: number): string {
    const digits = total.toString().length;
    return String(n).padStart(digits, '0') + ' / ' + String(total).padStart(digits, '0');
  }

  private esc(s: string): string {
    return String(s).replace(/"/g, '&quot;');
  }

  buildInfoHTML(item: DeckItem): SafeHtml {
    const kindLabel = item.kindLabel || (item.kind === 'curso' ? 'Curso técnico' : item.kind === 'salida' ? 'Salida de campo' : 'Charla');
    const prices = item.prices
      ? `<div class="hero-prices">${item.prices.map(([l, v]) => `<span>${l} <b>${v}</b> COP</span>`).join('')}</div>`
      : '';
    const html = `<div class="hero-kind">${kindLabel}</div>
    <div class="hero-title">${this.esc(item.titulo)}</div>
    <div class="hero-sub">${this.esc(item.sub)}</div>
    <div class="hero-extra">${this.esc(item.extra)}</div>
    ${prices}
    <div class="hero-note">${item.note}</div>
    <a class="hero-cta${item.cta.ghost ? ' ghost' : ''}" href="${item.cta.href}"${item.cta.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''} data-track-kind="${this.esc(item.kind)}" data-track-title="${this.esc(item.titulo)}">${item.cta.label}</a>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private initDeck(deckId: DeckId) {
    const deckEl = document.getElementById(`deck-${deckId}`) as HTMLElement;
    if (!deckEl) return;
    const info = deckEl.querySelector('.deck-info') as HTMLElement;
    const cards = Array.from(deckEl.querySelectorAll('.dcard')) as HTMLElement[];
    const listItems = Array.from(deckEl.querySelectorAll('.dl-item')) as HTMLElement[];
    const marker = deckEl.querySelector('.dl-marker') as HTMLElement | null;
    this.deckEls[deckId] = { deck: deckEl, cards, info, listItems, marker };
    this.layoutDeck(deckId);
  }

  private metrics(deckId: DeckId, force = false): MetricsResult | null {
    if (!force && this.metricsCache[deckId]) return this.metricsCache[deckId];
    const deck = this.deckEls[deckId]?.deck;
    if (!deck) return null;
    const cs = getComputedStyle(deck);
    const num = (v: string, d: number) => { const x = parseFloat(cs.getPropertyValue(v)); return isNaN(x) ? d : x; };
    const CW = num('--cw', 300);
    const IW = num('--iw', 340);
    const fr = (CW + IW) / 2;
    const peeks = [
      { poke: 34, s: 0.80, y: 14, ry: 16, zR: 8, zL: 22 },
      { poke: 58, s: 0.68, y: 28, ry: 20, zR: 7, zL: 21 },
      { poke: 72, s: 0.58, y: 40, ry: 22, zR: 6, zL: 20 },
    ];
    const m = { CW, IW, fr, peeks };
    this.metricsCache[deckId] = m;
    return m;
  }

  private slotFor(rel: number, m: MetricsResult) {
    if (rel === 0) return { x: -m.IW / 2, y: 0, s: 1, ry: 0, z: 40, op: 1 };
    const side = rel > 0 ? 1 : -1;
    const p = m.peeks[Math.min(Math.abs(rel), 3) - 1];
    const x = side > 0
      ? (m.fr + p.poke - m.CW * p.s / 2)
      : (-m.fr - p.poke + m.CW * p.s / 2);
    return { x, y: p.y, s: p.s, ry: side > 0 ? -p.ry : p.ry, z: side > 0 ? p.zR : p.zL, op: Math.abs(rel) <= 3 ? 1 : 0 };
  }

  private layoutDeck(deckId: DeckId) {
    const el = this.deckEls[deckId];
    if (!el) return;
    const m = this.metrics(deckId);
    if (!m) return;
    const n = this.deckItems[deckId].length;
    const cur = this.deckStates[deckId].cur;
    el.cards.forEach((card: HTMLElement, i: number) => {
      let rel = (i - cur + n) % n;
      if (rel > n / 2) rel -= n;
      const s = this.slotFor(rel, m);
      card.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) scale(${s.s}) rotateY(${s.ry || 0}deg)`;
      card.style.opacity = String(s.op);
      card.style.zIndex = String(s.z);
      card.classList.toggle('is-hero', i === cur);
    });
    el.listItems.forEach((li: HTMLElement, i: number) => li.classList.toggle('is-active', i === cur));
    const act = el.listItems[cur];
    if (act && el.marker) {
      el.marker.style.transform = `translateY(${act.offsetTop}px)`;
      el.marker.style.height = act.offsetHeight + 'px';
      act.scrollIntoView({ block: 'nearest' });
    }
  }

  goTo(deckId: DeckId, idx: number) {
    const state = this.deckStates[deckId];
    const n = this.deckItems[deckId].length;
    idx = ((idx % n) + n) % n;
    if (idx === state.cur) return;
    const prev = state.cur;
    state.cur = idx;
    const item = this.deckItems[deckId][idx];
    this.matomo.trackEvent('Event', 'deck_nav', deckId + ' · ' + (item?.titulo?.slice(0, 60) || ''), prev < idx ? 1 : -1);
    this.layoutDeck(deckId);
    this.currentInfoHTML[deckId] = this.buildInfoHTML(this.deckItems[deckId][idx]);
    state.isSwapping = true;
    clearTimeout(state.infoTimer!);
    state.infoTimer = setTimeout(() => {
      state.isSwapping = false;
      this.cdr.markForCheck();
    }, 190);
    this.cdr.markForCheck();
  }

  onCardClick(deckId: DeckId, i: number, item: DeckItem) {
    if (i === this.deckStates[deckId].cur) {
      this.matomo.trackEvent('Event', 'deck_card_lightbox', deckId + ' · ' + (item.titulo?.slice(0, 60) || ''));
      if (item.folder) this.openLightbox(item.kind, item.folder, item.imgs);
    } else {
      this.matomo.trackEvent('Event', 'deck_card_select', deckId + ' · ' + (item.titulo?.slice(0, 60) || ''));
      this.goTo(deckId, i);
    }
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    const card = img.closest('.dcard') as HTMLElement | null;
    if (card) {
      card.classList.add('noimg');
      const existingImg = card.querySelector('img');
      if (existingImg) existingImg.remove();
    }
  }

  onDeckKeydown(event: KeyboardEvent, deckId: DeckId) {
    if (event.key === 'ArrowRight') { event.preventDefault(); this.goTo(deckId, this.deckStates[deckId].cur + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); this.goTo(deckId, this.deckStates[deckId].cur - 1); }
  }

  @HostListener('window:resize')
  onResize() {
    this.metricsCache = {};
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      ALL_DECKS.forEach(id => {
        if (this.deckEls[id]) this.layoutDeck(id);
      });
    }, 100);
  }

  openLightbox(kind: string, folder: string | undefined, imgs: number) {
    if (!folder || !imgs) return;
    this.currentLightbox = { kind, folder, imgs: Number(imgs), idx: 0 };
    this.matomo.trackEvent('Event', 'cursos_lightbox_open', kind + ' · ' + folder?.slice(0, 60));
  }

  closeLightbox() {
    if (this.currentLightbox) {
      this.matomo.trackEvent('Event', 'cursos_lightbox_close', this.currentLightbox.kind);
    }
    this.currentLightbox = null;
  }

  prevLightbox() {
    if (!this.currentLightbox) return;
    this.currentLightbox.idx = (this.currentLightbox.idx - 1 + this.currentLightbox.imgs) % this.currentLightbox.imgs;
    this.matomo.trackEvent('Event', 'cursos_lightbox_nav', 'prev');
  }

  nextLightbox() {
    if (!this.currentLightbox) return;
    this.currentLightbox.idx = (this.currentLightbox.idx + 1) % this.currentLightbox.imgs;
    this.matomo.trackEvent('Event', 'cursos_lightbox_nav', 'next');
  }

  onLightboxContainerClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('lightbox')) this.closeLightbox();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.currentLightbox) return;
    if (event.key === 'Escape') { this.closeLightbox(); }
    else if (event.key === 'ArrowLeft' && this.currentLightbox.imgs > 1) { this.prevLightbox(); }
    else if (event.key === 'ArrowRight' && this.currentLightbox.imgs > 1) { this.nextLightbox(); }
  }

  scrollToSection(id: string) {
    this.matomo.trackEvent('Event', 'cursos_scroll_nav', id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  }
}
