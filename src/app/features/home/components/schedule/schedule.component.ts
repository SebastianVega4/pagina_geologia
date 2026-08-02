import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DAYS, STATUS_LABEL, CHARLA_FLYERS } from './schedule.data';
import { MatomoService } from '../../../../core/services/matomo.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ScheduleComponent implements AfterViewInit, OnDestroy {
  @ViewChild('officialRoot', { static: true })
  officialRoot!: ElementRef<HTMLDivElement>;
  private listeners: (() => void)[] = [];
  private matomo = inject(MatomoService);

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderSchedule();
    this.setupThemeToggle();
    this.setupModalClose();
  }

  ngOnDestroy(): void {
    this.listeners.forEach((listener) => listener());
  }

  private renderSchedule(): void {
    const root = this.officialRoot.nativeElement;
    const tabsEl = root.querySelector('#tabs');
    const panelsEl = root.querySelector('#panels');

    if (!tabsEl || !panelsEl) return;

    tabsEl.innerHTML = '';
    panelsEl.innerHTML = '';

    DAYS.forEach((day: any, idx: number) => {
      const btn = this.renderer.createElement('button');
      this.renderer.addClass(btn, 'tab-btn');
      if (idx === 0) this.renderer.addClass(btn, 'active');
      btn.textContent = day.label;
      this.listeners.push(
        this.renderer.listen(btn, 'click', () => this.selectDay(idx)),
      );
      this.renderer.appendChild(tabsEl, btn);

      const panel = this.renderer.createElement('div');
      this.renderer.addClass(panel, 'day-panel');
      if (idx === 0) this.renderer.addClass(panel, 'active');
      this.renderer.setAttribute(panel, 'id', 'panel-' + day.id);

      if (day.type === 'dashboard') {
        panel.innerHTML = this.renderHorarioGrid();
      } else {
        this.renderDaySections(panel, day);
      }
      this.renderer.appendChild(panelsEl, panel);
    });

    this.selectDay(0);
  }

  // ============================================================
  //  HORARIO GENERAL - CUADRICULA
  // ============================================================
  private renderHorarioGrid(): string {
    const r = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return (h - 8) * 60 + m + 1;
    };

    const fmt = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      const a = h < 12 ? 'AM' : 'PM';
      const hh = h > 12 ? h - 12 : h === 0 ? 12 : h;
      return `${hh}:${m < 10 ? '0' : ''}${m}\u00a0${a}`;
    };

    const blk = (
      col: number | [number, number],
      t1: string,
      t2: string,
      cat: string,
      name: string,
      sub?: string,
    ) => {
      const cs = Array.isArray(col) ? `${col[0]} / span ${col[1]}` : `${col}`;
      return `<div class="hblk ${cat}" style="grid-column:${cs};grid-row:${r(t1)}/${r(t2)}">
        <div class="ht">${fmt(t1)}&thinsp;–&thinsp;${fmt(t2)}</div>
        <div class="hn">${name}</div>${sub ? `<div class="hs">${sub}</div>` : ''}
      </div>`;
    };

    const cmBlks = (
      col: number | [number, number],
      dayId: string,
      excludeCodes?: string[],
    ) => {
      const exc = new Set(excludeCodes || []);
      const day = DAYS.find((d: any) => d.id === dayId);
      if (!day) return '';
      return (day.rows as any[])
        .flatMap((row: any) =>
          (row.auditorio?.cms || []).map((cm: any) => {
            if (!cm.code || exc.has(cm.code)) return '';
            const pts = cm.time.split(/[^\d:]+/);
            const [t1, t2] = [pts[0], pts[1]];
            if (!t1 || !t2) return '';
            const cs = Array.isArray(col)
              ? `${col[0]} / span ${col[1]}`
              : `${col}`;
            const spOk = cm.speaker && cm.speaker !== 'Por confirmar';
            const clamp = r(t2) - r(t1) >= 40 ? 2 : 1;
            const magCls = cm.code.indexOf('CM') === 0 ? 'hb-cm-mag' : 'hb-cm-esp';
            return `<div class="hblk hb-cm ${magCls}" style="grid-column:${cs};grid-row:${r(t1)}/${r(t2)};justify-content:center;align-items:center;text-align:center;" data-code="${this.escapeHtml(cm.code)}">
              <div class="ht" style="width:100%;text-align:center">${fmt(t1)}\u2009\u2013\u2009${fmt(t2)} \u00b7 ${this.escapeHtml(cm.code)}</div>
              <div class="hn" style="line-height:1.25;color:#fff;display:-webkit-box;-webkit-line-clamp:${clamp};-webkit-box-orient:vertical;overflow:hidden;">${this.escapeHtml(cm.title)}</div>
              ${spOk ? `<div class="hs" style="font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;">${this.escapeHtml(cm.speaker)}</div>` : ''}
            </div>`;
          }),
        )
        .join('');
    };

    const ponBlk = (col: number | [number, number], dayId: string) => {
      const day = DAYS.find((d: any) => d.id === dayId);
      if (!day) return '';
      const min = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
      let n = 0, ini: string | null = null, fin: string | null = null;
      const salas = new Set<string>(), durs = new Set<number>();
      for (const row of (day.rows || [])) {
        for (const [sala, lst] of Object.entries(row.cells || {})) {
          if (!lst || !(lst as any[]).length) continue;
          salas.add(sala);
          for (const p of lst as any[]) {
            if (!p) continue;
            n++;
            if (!p.time) continue;
            const [a, b] = p.time.split('–');
            if (ini === null || min(a) < min(ini)) ini = a;
            if (fin === null || min(b) > min(fin)) fin = b;
            durs.add(min(b) - min(a));
          }
        }
      }
      if (!n || !ini) return '';
      const d = [...durs].sort((x, y) => y - x).join(' y ');
      return blk(col, ini!, fin!, 'hb-pon', 'PONENCIAS', `${n} ponencias · ${salas.size} salas · ${d} min`);
    };

    const horaRefrigerio = (dayId: string, ordinal: string): string | null => {
      const day = DAYS.find((d: any) => d.id === dayId);
      if (!day) return null;
      const esEse = (t: any) => /refrigerio/i.test(t || '') && new RegExp(ordinal, 'i').test(t || '');
      for (const row of (day.rows || [])) {
        if (row.type === 'info' && esEse(row.title)) return row.time as string;
        for (const c of ((row.auditorio || {}).cms || [])) {
          if (!c.code && esEse(c.title)) return c.time as string;
        }
      }
      return null;
    };

    const brk = (col: number | [number, number], dayId: string, ordinal: string, label: string) => {
      const t = horaRefrigerio(dayId, ordinal);
      if (!t) return '';
      const p = t.split(/[^\d:]+/);
      return blk(col, p[0], p[1], 'hb-brk', 'BREAK', label);
    };

    const GC = '55px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
    const tls = [
      '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
      '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
      '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
    ];
    const tlHtml = tls
      .map(
        (t) =>
          `<div style="grid-column:1;grid-row:${r(t)}/${r(t) + 10};font-family:'DM Mono',monospace;font-size:9px;color:var(--text-dim);display:flex;align-items:flex-start;justify-content:flex-end;padding-right:6px;padding-top:2px;border-right:1px solid var(--border);">${t}</div>`,
      )
      .join('');

    const mie = [
      blk([2, 2], '8:00', '9:00', 'hb-reg', 'REGISTRO', ''),
      blk([2, 2], '9:00', '10:30', 'hb-ap', 'BIENVENIDA', 'Apertura del evento'),
      cmBlks(2, 'mie', ['CM-3', 'CE-2', 'CE-3', 'CE-10', 'CE-11']),
      cmBlks([2, 3], 'mie', ['CM-1', 'CM-2', 'CE-2', 'CE-3', 'CE-10', 'CE-11']),
      blk(2, '14:00', '16:00', 'hb-cm hb-cm-esp', 'MINERÍA, INDUSTRIA E INNOVACIÓN', '4 charlas · toca para ver'),
      blk(4, '9:00', '12:30', 'hb-retx', 'RETRANSMISIÓN AUDITORIO', 'Salones Pangea y Gondwana'),
      blk(4, '14:00', '16:00', 'hb-pangea', 'SALÓN PANGEA', '4 charlas · toca para ver'),
      brk(2, 'mie', 'primer', 'Primer refrigerio'),
      blk(3, '10:30', '12:30', 'hb-geo', 'GEOLIMPIADAS', ''),
      blk([2, 9], '12:30', '14:00', 'hb-alm', 'ALMUERZO', ''),
      ponBlk(3, 'mie'),
      brk([2, 3], 'mie', 'segundo', 'Segundo refrigerio'),
      blk([2, 3], '17:10', '18:10', 'hb-pos', 'PÓSTERS', '60 pósters · 2 salones<br>Salón Pangea: Energía · CO₂/H₂ · Petrología · Mineralogía<br>Salón Gondwana: Estructural · Geofísica · Sedimentología · Paleontología'),
      blk([2, 3], '18:10', '19:00', 'hb-cie', 'TERMALES', '6:00 PM · máx. 7:00 PM'),
    ].join('');

    const sgc = [
      blk(7, '8:00', '12:30', 'hb-sgc', '110 años del servicio geológico', 'Salón Pangea'),
      blk(7, '14:00', '19:00', 'hb-sgc', '110 años del servicio geológico', 'Salón Pangea'),
    ].join('');

    const acggp = [
      blk(10, '8:00', '12:30', 'hb-sgc', 'ACGGP', '1 salón edificio de Artes<br>(mañana)'),
    ].join('');

    const jue = [
      cmBlks([5, 2], 'jue', ['CE-4', 'CE-5']),
      cmBlks(5, 'jue', ['CM-4', 'CM-5', 'CE-6']),
      ponBlk(6, 'jue'),
      brk([5, 2], 'jue', 'tercer', 'Tercer refrigerio'),
      blk([5, 2], '11:00', '12:30', 'hb-pan', 'GEOLOGÍA EN VIVO', 'Dos Expertos, Un Viaje al Corazón de la Tierra'),
      blk([5, 2], '14:00', '15:00', 'hb-pan', 'PANEL — GESTIÓN DEL RIESGO', 'Panel de discusión'),
      brk([5, 2], 'jue', 'cuarto', 'Cuarto refrigerio'),
      blk([5, 2], '17:10', '18:20', 'hb-pos', 'PÓSTERS', '31 pósters · Salón Gondwana<br>Hidrogeología · Geoeducación · Geotecnia'),
      blk([5, 2], '18:30', '20:00', 'hb-cie', 'CANELAZO', '6:30 – 8:00 PM'),
    ].join('');

    const vie = [
      cmBlks([8, 2], 'vie', ['CE-7', 'CE-8', 'SCG']),
      cmBlks(8, 'vie', ['CM-6', 'CM-7', 'SCG']),
      `<div class="hblk hb-scg" style="grid-column:8 / span 2;grid-row:${r('14:00')}/${r('16:20')};justify-content:center;align-items:center;text-align:center;padding:4px 8px;">
        <div class="ht" style="width:100%;text-align:center;font-size:8px;opacity:.8;">${fmt('14:00')} – ${fmt('16:20')}</div>
        <div class="hn" style="text-align:center;font-size:11px;">Jornada SCG</div>
        <div class="hs" style="text-align:center;">Soc. Colombiana de Geotecnia · 11 charlas · toca para ver</div>
      </div>`,
      ponBlk(9, 'vie'),
      brk([8, 2], 'vie', 'quinto', 'Quinto refrigerio'),
      blk([8, 2], '11:00', '12:30', 'hb-pan', 'PANEL · ANH', 'Energías, territorio y decisiones'),
      brk(10, 'vie', 'sexto', 'Sexto refrigerio'),
      blk(10, '16:20', '19:00', 'hb-retx', 'RETRANSMISIÓN AUDITORIO', 'Salones Pangea y Gondwana'),
      blk([8, 2], '17:00', '19:00', 'hb-cie', 'EVENTO DE CIERRE', '5:00 PM'),
      `<div class="hblk hb-cie" style="grid-column:8 / span 2;grid-row:${r('19:00')}/${r('20:00')};justify-content:center;align-items:center;text-align:center;">
        <div class="ht">8:00 PM →</div>
        <div class="hn">FIESTA FINAL</div>
      </div>`,
    ].join('');

    const hdrMain = `<div style="display:grid;grid-template-columns:${GC};background:var(--night-2);border-bottom:2px solid var(--border);min-width:1050px;">
      <div class="hh">Hora</div>
      <div class="hh" style="grid-column:2/span 3">Miércoles 19 Ago</div>
      <div class="hh" style="grid-column:5/span 3">Jueves 20 Ago</div>
      <div class="hh" style="grid-column:8/span 3">Viernes 21 Ago</div>
    </div>`;

    const hdrSub = `<div style="display:grid;grid-template-columns:${GC};background:var(--night-2);border-bottom:1px solid var(--border);min-width:1050px;">
      <div></div>
      <div class="hh hs-c">Charlas · Actividades</div>
      <div class="hh hs-p">Ponencias · Pósters</div>
      <div class="hh hs-pangea">Salón Pangea</div>
      <div class="hh hs-c">Charlas · Actividades</div>
      <div class="hh hs-p">Ponencias · Pósters</div>
      <div class="hh hs-g">110 años · SGC</div>
      <div class="hh hs-c">Charlas · Actividades</div>
      <div class="hh hs-p">Ponencias</div>
      <div class="hh hs-g">ACGGP / SCG</div>
    </div>`;

    return `<div style="overflow-x:auto;border:1px solid var(--border);border-radius:8px;">
      ${hdrMain}${hdrSub}
      <div style="display:grid;grid-template-columns:${GC};grid-template-rows:repeat(760,2px);position:relative;min-width:1050px;">
        ${tlHtml}${mie}${sgc}${jue}${acggp}${vie}
      </div>
    </div>`;
  }

  // ============================================================
  //  RENDER DIA ESPECIFICO - GRID-BASED (day-sections)
  // ============================================================
  private renderDaySections(panel: HTMLElement, day: any): void {
    const wrap = this.renderer.createElement('div');
    this.renderer.addClass(wrap, 'day-sections');

    // Inst banner
    const inst: any[] = [];
    const _seen: Record<string, number> = {};
    (day.rows || []).forEach((r: any) => {
      if (r.sgc === 'start' && r.sgcTitle && !_seen[r.sgcTitle]) {
        _seen[r.sgcTitle] = 1;
        inst.push({ t: r.sgcTitle, d: r.sgcDesc || '' });
      }
    });
    if (inst.length) {
      const b = this.renderer.createElement('div');
      this.renderer.addClass(b, 'inst-banner');
      b.innerHTML = inst
        .map(
          (i) =>
            `<span class="inst-name">${this.escapeHtml(i.t)}</span> <span class="inst-desc">${this.escapeHtml(i.d)}</span>`,
        )
        .join('<span class="inst-sep">·</span>');
      this.renderer.appendChild(wrap, b);
    }

    // SGC Charlas list
    if (day.sgcCharlas && day.sgcCharlas.length) {
      const groups: Record<string, any[]> = {};
      day.sgcCharlas.forEach((ch: any) => {
        const g = ch.direccion || 'Otras';
        (groups[g] = groups[g] || []).push(ch);
      });
      let html = '';
      Object.keys(groups).forEach((g) => {
        html += `<div class="sgc-group">${this.escapeHtml(g)} <span class="sgc-gn">(${groups[g].length})</span></div>`;
        html +=
          '<div class="sgc-grid">' +
          groups[g]
            .map(
              (ch: any) =>
                `<div class="sgc-item"><div class="si-title">${this.escapeHtml(ch.title)}</div><div class="si-exp">${this.escapeHtml(ch.expositor || 'Por confirmar')}</div>${ch.linea || ch.area ? `<div class="si-tags">${this.escapeHtml([ch.linea, ch.area].filter(Boolean).join(' · '))}</div>` : ''}</div>`,
            )
            .join('') +
          '</div>';
      });
      const box = this.renderer.createElement('div');
      this.renderer.addClass(box, 'sgc-list-box');
      box.innerHTML = `<div class="pm-head">Programación del Salón 110 años (SGC) — ${day.sgcCharlas.length} charlas</div><details><summary>Ver listado de charlas</summary><div class="poster-list">${html}</div></details>`;
      this.renderer.appendChild(wrap, box);
    }

    // Rows
    (day.rows || []).forEach((row: any) => {
      if (row.type === 'info') {
        this.renderer.appendChild(wrap, this.rowStrip(row.time, this.stripEl(row.category || 'info', row.title, row.note || '')));
        return;
      }
      if (row.type === 'panel') {
        this.renderer.appendChild(wrap, this.rowStrip(row.time, this.panelStripEl(row)));
        return;
      }
      if (row.type !== 'block') return;

      const cms = (row.auditorio && row.auditorio.cms) || [];
      const realCells = row.cells && day.rooms.some((r: string) => ((row.cells[r]) || []).length);
      const altReal = row.altBlock && !/en el auditorio/i.test(row.altBlock.title) ? row.altBlock : null;

      if (realCells) {
        this.renderer.appendChild(wrap, this.ponBlock(row, cms, day));
      } else if (altReal) {
        this.renderer.appendChild(wrap, this.actBlock(row, altReal, cms));
      } else if (row.posterBatch && row.posterBatch.length) {
        this.renderer.appendChild(wrap, this.rowStrip(row.time, this.posterNode(row)));
      } else {
        cms.slice().sort((a: any, b: any) => this._sm(a.time) - this._sm(b.time)).forEach((cm: any) => {
          if (cm.code) {
            this.renderer.appendChild(wrap, this.rowStrip(cm.time, this.charlaStripEl(cm)));
          } else {
            this.renderer.appendChild(wrap, this.rowStrip(cm.time, this.stripEl('break', cm.title, '')));
          }
        });
      }
    });

    this.renderer.appendChild(panel, wrap);
    this.attachHorarioClickListeners();
  }

  private _sm(t: string): number {
    const m = (t || '').match(/(\d{1,2}):(\d{2})/);
    return m ? +m[1] * 60 + +m[2] : 9999;
  }

  private rowStrip(hora: string, node: HTMLElement): HTMLElement {
    const row = this.renderer.createElement('div');
    this.renderer.addClass(row, 'dt-row');
    const h = this.renderer.createElement('div');
    this.renderer.addClass(h, 'dt-hora');
    h.textContent = hora || '';
    this.renderer.appendChild(row, h);
    this.renderer.addClass(node, 'dt-content');
    this.renderer.appendChild(row, node);
    return row;
  }

  private stripEl(cat: string, title: string, sub: string): HTMLElement {
    const d = this.renderer.createElement('div');
    this.renderer.addClass(d, 'seg-strip');
    this.renderer.addClass(d, 'cat-' + cat);
    d.innerHTML =
      `<span class="seg-title">${this.escapeHtml(title)}</span>` +
      (sub ? `<span class="seg-sub">${this.escapeHtml(sub)}</span>` : '');
    return d;
  }

  private charlaStripEl(cm: any): HTMLElement {
    const mag = (cm.code || '').indexOf('CM') === 0;
    const d = this.renderer.createElement('div');
    this.renderer.addClass(d, 'charla-strip');
    this.renderer.addClass(d, mag ? 'mag' : 'esp');
    if (cm.code) {
      this.renderer.addClass(d, 'clickable');
      this.listeners.push(
        this.renderer.listen(d, 'click', () => this.openCharla(cm.code)),
      );
    }
    d.innerHTML =
      `<div class="ch-head"><span class="ch-badge">${mag ? 'Charla magistral' : 'Charla especial'}${cm.code ? ' · ' + this.escapeHtml(cm.code) : ''}</span><span class="ch-time">Auditorio</span></div>` +
      `<div class="ch-title">${this.escapeHtml(cm.title)}</div>` +
      `<div class="ch-speaker">${this.escapeHtml(cm.speaker || 'Por confirmar')}${cm.org ? ' · ' + this.escapeHtml(cm.org) : ''}</div>`;
    return d;
  }

  private panelStripEl(row: any): HTMLElement {
    const d = this.renderer.createElement('div');
    this.renderer.addClass(d, 'charla-strip');
    this.renderer.addClass(d, 'panel-strip');
    d.innerHTML =
      `<div class="ch-head"><span class="ch-badge">Panel de discusión</span></div>` +
      `<div class="ch-title">${this.escapeHtml(row.title)}</div>` +
      (row.note ? `<div class="ch-speaker">${this.escapeHtml(row.note)}</div>` : '');
    return d;
  }

  private audCell(cm: any): HTMLElement {
    const d = this.renderer.createElement('div');
    if (!cm.code) {
      this.renderer.addClass(d, 'aud-cell');
      this.renderer.addClass(d, 'aud-break');
      d.innerHTML = `<div class="ac-time">${this.escapeHtml(cm.time || '')}</div><div class="ac-title">${this.escapeHtml(cm.title)}</div>`;
      return d;
    }
    const mag = cm.code.indexOf('CM') === 0;
    this.renderer.addClass(d, 'aud-cell');
    this.renderer.addClass(d, mag ? 'mag' : 'esp');
    this.renderer.addClass(d, 'clickable');
    this.listeners.push(
      this.renderer.listen(d, 'click', () => this.openCharla(cm.code)),
    );
    d.innerHTML =
      `<div class="ac-badge">${mag ? 'Magistral' : 'Especial'} · ${this.escapeHtml(cm.code)}</div>` +
      `<div class="ac-time">${this.escapeHtml(cm.time || '')}</div>` +
      `<div class="ac-title">${this.escapeHtml(cm.title)}</div>`;
    return d;
  }

  private ponBlock(row: any, cms: any[], day: any): HTMLElement {
    const rooms: string[] = day.rooms;
    const maxSlots = Math.max.apply(
      null,
      rooms.map((r: string) => ((row.cells && row.cells[r]) || []).length),
    );
    const g = this.renderer.createElement('div');
    this.renderer.addClass(g, 'dt-grid');
    g.style.gridTemplateColumns = `58px 1fr repeat(${rooms.length}, minmax(0,1fr))`;

    const place = (el: HTMLElement, col: string, rw: string) => {
      el.style.gridColumn = col;
      el.style.gridRow = rw;
      this.renderer.appendChild(g, el);
    };

    const hh = this.renderer.createElement('div');
    this.renderer.addClass(hh, 'dt-hhead');
    hh.textContent = 'Hora';
    place(hh, '1', '1');

    const ah = this.renderer.createElement('div');
    this.renderer.addClass(ah, 'dt-audhead');
    ah.textContent = 'Auditorio';
    place(ah, '2', '1');

    rooms.forEach((r: string, ci: number) => {
      const rh = this.renderer.createElement('div');
      this.renderer.addClass(rh, 'pon-room');
      rh.innerHTML = `<div class="pr-num">${this.escapeHtml(r)}</div><div class="pr-theme">${this.escapeHtml((day.themes || {})[r] || '')}</div>`;
      place(rh, `${3 + ci}`, '1');
    });

    const aud = this.renderer.createElement('div');
    this.renderer.addClass(aud, 'dt-audcol');
    cms
      .slice()
      .sort((a: any, b: any) => this._sm(a.time) - this._sm(b.time))
      .forEach((cm) => this.renderer.appendChild(aud, this.audCell(cm)));
    place(aud, '2', `2 / span ${maxSlots}`);

    for (let i = 0; i < maxSlots; i++) {
      let tt = '';
      for (const r of rooms) {
        const arr = (row.cells && row.cells[r]) || [];
        if (arr[i] && arr[i].time) {
          tt = arr[i].time;
          break;
        }
      }
      const tg = this.renderer.createElement('div');
      this.renderer.addClass(tg, 'dt-hora');
      tg.textContent = tt;
      place(tg, '1', String(i + 2));

      rooms.forEach((r: string, ci: number) => {
        const cData = ((row.cells && row.cells[r]) || [])[i];
        const cell = this.renderer.createElement('div');
        if (!cData) {
          this.renderer.addClass(cell, 'pon-cell');
          this.renderer.addClass(cell, 'empty');
        } else {
          this.renderer.addClass(cell, 'pon-cell');
          cell.innerHTML =
            `<div class="pc-title">${this.escapeHtml(cData.title)}</div>` +
            (cData.authors
              ? `<div class="pc-aut">${this.escapeHtml(cData.authors.split(/[,;]/)[0])}</div>`
              : '');
          this.listeners.push(
            this.renderer.listen(cell, 'click', () =>
              this.openModal(r, cData.time || row.time, cData),
            ),
          );
        }
        place(cell, `${3 + ci}`, String(i + 2));
      });
    }

    return g;
  }

  private actBlock(row: any, act: any, cms: any[]): HTMLElement {
    const g = this.renderer.createElement('div');
    this.renderer.addClass(g, 'dt-grid');
    g.style.gridTemplateColumns = '58px 1fr minmax(0,6fr)';

    const hg = this.renderer.createElement('div');
    this.renderer.addClass(hg, 'dt-hora');
    hg.textContent = row.time || act.time || '';
    hg.style.gridColumn = '1';
    hg.style.gridRow = '1';
    this.renderer.appendChild(g, hg);

    const aud = this.renderer.createElement('div');
    this.renderer.addClass(aud, 'dt-audcol');
    aud.style.gridColumn = '2';
    aud.style.gridRow = '1';
    cms
      .slice()
      .sort((a: any, b: any) => this._sm(a.time) - this._sm(b.time))
      .forEach((cm) => this.renderer.appendChild(aud, this.audCell(cm)));
    this.renderer.appendChild(g, aud);

    const main = this.renderer.createElement('div');
    this.renderer.addClass(main, 'act-main');
    this.renderer.addClass(main, 'seg-strip');
    this.renderer.addClass(main, 'cat-actividad');
    main.style.gridColumn = '3';
    main.style.gridRow = '1';
    main.innerHTML =
      `<span class="seg-title">${this.escapeHtml(act.title)}</span>` +
      (act.sub ? `<span class="seg-sub">${this.escapeHtml(act.sub)}</span>` : '');
    this.renderer.appendChild(g, main);

    return g;
  }

  private posterNode(row: any): HTMLElement {
    const d = this.renderer.createElement('div');
    this.renderer.addClass(d, 'poster-seg');

    const PSTATUS_ICON: Record<string, string> = {
      confirmado: '🔵',
      parcial: '🟡',
      pendiente: '⚪',
    };
    const hasSalon = row.posterBatch.some((p: any) => p.salon);
    let inner: string;

    if (hasSalon) {
      const salones = [
        ...new Set(row.posterBatch.map((p: any) => p.salon || 'Sin asignar')),
      ].sort() as string[];
      const cols = salones
        .map((s: string) => {
          const items = row.posterBatch.filter((p: any) => p.salon === s);
          const listHtml = items
            .map(
              (p: any) =>
                `<div class="p-item">${PSTATUS_ICON[p.status] || ''} <b>${this.escapeHtml(p.title)}</b><br><span style="opacity:.7">${this.escapeHtml(p.authors)}</span></div>`,
            )
            .join('');
          return `<div style="flex:1;min-width:0"><div class="pm-title">Salón ${this.escapeHtml(s)} &mdash; ${items.length} pósters</div><details><summary>Ver listado</summary><div class="poster-list">${listHtml}</div></details></div>`;
        })
        .join(
          '<div style="width:1px;background:var(--border);margin:0 10px"></div>',
        );
      inner = `<div class="poster-merged-cell" style="display:flex;gap:0">${cols}</div>`;
    } else {
      const listHtml = row.posterBatch
        .map(
          (p: any) =>
            `<div class="p-item">${PSTATUS_ICON[p.status] || ''} <b>${this.escapeHtml(p.title)}</b><br>${this.escapeHtml(p.authors)}</div>`,
        )
        .join('');
      inner = `<div class="poster-merged-cell"><div class="pm-title">${row.posterBatch.length} pósters en exhibición</div><details><summary>Ver listado completo</summary><div class="poster-list">${listHtml}</div></details></div>`;
    }

    d.innerHTML = `<div class="pm-head">Sesión de pósters</div>` + inner;
    return d;
  }

  // ============================================================
  //  CLICK LISTENERS
  // ============================================================
  private attachHorarioClickListeners(): void {
    const root = this.officialRoot.nativeElement;
    const cmBlocks = root.querySelectorAll('.hb-cm[data-code]');
    cmBlocks.forEach((block) => {
      const code = (block as HTMLElement).dataset['code'];
      if (code) {
        this.listeners.push(
          this.renderer.listen(block, 'click', () => this.openCharla(code)),
        );
      }
    });
    const charlaStrips = root.querySelectorAll('.charla-strip.clickable');
    charlaStrips.forEach((el) => {
      // listeners already attached in charlaStripEl
    });
  }

  // ============================================================
  //  SELECT DIA
  // ============================================================
  private selectDay(idx: number): void {
    const root = this.officialRoot.nativeElement;
    root.querySelectorAll('.tab-btn').forEach((b, i) => {
      b.classList.toggle('active', i === idx);
    });
    DAYS.forEach((d: any, i: number) => {
      const panel = root.querySelector('#panel-' + d.id);
      if (panel) panel.classList.toggle('active', i === idx);
    });
    const day = DAYS[idx];
    if (day) {
      this.matomo.trackEvent('Event', 'schedule_day_tab', day.label || day.id);
    }
  }

  // ============================================================
  //  MODAL
  // ============================================================
  private openModal(room: string, time: string, cell: any): void {
    this.matomo.trackEvent('Event', 'schedule_ponencia_click', cell.title?.slice(0, 80));
    const root = this.officialRoot.nativeElement;
    const modalBg = root.querySelector('#modalBg') as HTMLElement;
    if (!modalBg) return;

    const modalBadge = modalBg.querySelector('#modalBadge') as HTMLElement;
    const modalTitle = modalBg.querySelector('#modalTitle') as HTMLElement;
    const modalRoom = modalBg.querySelector('#modalRoom') as HTMLElement;
    const modalAuthors = modalBg.querySelector('#modalAuthors') as HTMLElement;
    const modalFlyerWrap = modalBg.querySelector('#modalFlyerWrap') as HTMLElement;
    const modalFlyer = modalBg.querySelector('#modalFlyer') as HTMLImageElement;

    modalBadge.style.display = 'none';
    modalTitle.textContent = cell.title;
    modalRoom.innerHTML = `<b>Salón / Hora:</b> ${this.escapeHtml(room)} · ${this.escapeHtml(time)}`;
    modalAuthors.innerHTML = cell.authors ? `<b>Autor(es):</b> ${this.escapeHtml(cell.authors)}` : '';

    if (modalFlyerWrap) {
      modalFlyerWrap.style.display = 'none';
      if (modalFlyer) modalFlyer.removeAttribute('src');
    }

    this.renderer.addClass(modalBg, 'show');
  }

  private openCharla(code: string): void {
    this.matomo.trackEvent('Event', 'schedule_item_click', code);
    for (const day of DAYS as any[]) {
      for (const row of day.rows || []) {
        const cms = (row.auditorio && row.auditorio.cms) || [];
        const cm = cms.find((c: any) => c.code === code);
        if (!cm) continue;
        const esMag = code.indexOf('CM') === 0;
        const tbd = !cm.speaker || cm.speaker === 'Por confirmar';

        const root = this.officialRoot.nativeElement;
        const modalBg = root.querySelector('#modalBg') as HTMLElement;
        if (!modalBg) return;

        const modalBadge = modalBg.querySelector('#modalBadge') as HTMLElement;
        const modalTitle = modalBg.querySelector('#modalTitle') as HTMLElement;
        const modalRoom = modalBg.querySelector('#modalRoom') as HTMLElement;
        const modalAuthors = modalBg.querySelector('#modalAuthors') as HTMLElement;
        const modalFlyerWrap = modalBg.querySelector('#modalFlyerWrap') as HTMLElement;
        const modalFlyer = modalBg.querySelector('#modalFlyer') as HTMLImageElement;

        modalBadge.style.display = '';
        modalBadge.className = 'badge ' + (tbd ? 'tbd' : 'confirmado');
        modalBadge.textContent =
          (esMag ? 'Charla magistral' : 'Charla especial') + ' · ' + code;
        modalTitle.textContent = cm.title;
        modalRoom.innerHTML = `<b>Día / Hora:</b> ${this.escapeHtml(day.label)} · ${this.escapeHtml(cm.time)} · Auditorio`;
        modalAuthors.innerHTML = `<b>Ponente:</b> ${this.escapeHtml(cm.speaker || 'Por confirmar')}${cm.org ? ' · ' + this.escapeHtml(cm.org) : ''}`;

        const flyerName = CHARLA_FLYERS[code];
        if (modalFlyerWrap && modalFlyer && flyerName) {
          const src = encodeURI('assets/CHARLAS/' + flyerName + '.png');
          modalFlyer.src = src;
          modalFlyer.onclick = () => {
            this.matomo.trackEvent('Event', 'schedule_flyer_view', code);
            window.open(src, '_blank');
          };
          modalFlyer.onerror = () => { modalFlyerWrap.style.display = 'none'; };
          modalFlyerWrap.style.display = '';
        } else if (modalFlyerWrap) {
          modalFlyerWrap.style.display = 'none';
          if (modalFlyer) modalFlyer.removeAttribute('src');
        }

        this.renderer.addClass(modalBg, 'show');
        return;
      }
    }
  }

  private closeModal(): void {
    const modalBg = this.officialRoot.nativeElement.querySelector('#modalBg');
    if (modalBg) {
      this.renderer.removeClass(modalBg, 'show');
    }
    this.matomo.trackEvent('Event', 'schedule_modal_close');
  }

  private setupModalClose(): void {
    const root = this.officialRoot.nativeElement;
    const modalBg = root.querySelector('#modalBg');
    const closeBtn = root.querySelector('.close');

    if (modalBg) {
      this.listeners.push(
        this.renderer.listen(modalBg, 'click', (event) => {
          if (event.target === modalBg) this.closeModal();
        }),
      );
    }
    if (closeBtn) {
      this.listeners.push(
        this.renderer.listen(closeBtn, 'click', () => this.closeModal()),
      );
    }
  }

  // ============================================================
  //  TEMA DIA / NOCHE
  // ============================================================
  private setupThemeToggle(): void {
    const root = this.officialRoot.nativeElement;
    const themeBtn = root.querySelector('#themeBtn');

    if (themeBtn) {
      this.listeners.push(
        this.renderer.listen(themeBtn, 'click', () => this.toggleTheme()),
      );
    }

    const saved = localStorage.getItem('stg-theme');
    if (saved === 'day') {
      this.applyDay();
    } else {
      this.applyNight();
    }
  }

  private toggleTheme(): void {
    const root = this.officialRoot.nativeElement;
    const wasDay = root.classList.contains('day-mode');
    if (wasDay) {
      this.applyNight();
      localStorage.setItem('stg-theme', 'night');
    } else {
      this.applyDay();
      localStorage.setItem('stg-theme', 'day');
    }
    this.matomo.trackEvent('Event', 'schedule_theme_toggle', wasDay ? 'night' : 'day');
  }

  private applyDay(): void {
    const root = this.officialRoot.nativeElement;
    this.renderer.addClass(root, 'day-mode');
    const themeIcon = root.querySelector('#themeIcon');
    const themeLabel = root.querySelector('#themeLabel');
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeLabel) themeLabel.textContent = 'Modo noche';
  }

  private applyNight(): void {
    const root = this.officialRoot.nativeElement;
    this.renderer.removeClass(root, 'day-mode');
    const themeIcon = root.querySelector('#themeIcon');
    const themeLabel = root.querySelector('#themeLabel');
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeLabel) themeLabel.textContent = 'Modo día';
  }

  // ============================================================
  //  UTILITY
  // ============================================================
  private escapeHtml(s: string): string {
    if (!s) return '';
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
