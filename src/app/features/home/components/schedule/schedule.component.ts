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
    this.renderStats();
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
      onclick?: string,
    ) => {
      const cs = Array.isArray(col) ? `${col[0]} / span ${col[1]}` : `${col}`;
      const cls = 'hblk ' + cat + (onclick ? ' hb-click' : '');
      return `<div class="${cls}" style="grid-column:${cs};grid-row:${r(t1)}/${r(t2)}"${onclick ? ` data-onclick="${this.escapeHtml(onclick)}"` : ''}>
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
            const pts = (cm.gridTime || cm.time).split(/[^\d:]+/);
            const lbl = cm.time.split(/[^\d:]+/);
            const [t1, t2] = [pts[0], pts[1]];
            const [l1, l2] = [lbl[0] || pts[0], lbl[1] || pts[1]];
            if (!t1 || !t2) return '';
            const cs = Array.isArray(col)
              ? `${col[0]} / span ${col[1]}`
              : `${col}`;
            const spOk = cm.speaker && cm.speaker !== 'Por confirmar';
            const clamp = r(t2) - r(t1) >= 40 ? 2 : 1;
            const magCls = cm.code.indexOf('CM') === 0 ? 'hb-cm-mag' : 'hb-cm-esp';
            return `<div class="hblk hb-cm ${magCls}" style="grid-column:${cs};grid-row:${r(t1)}/${r(t2)};justify-content:center;align-items:center;text-align:center;" data-code="${this.escapeHtml(cm.code)}">
              <div class="ht" style="width:100%;text-align:center">${fmt(l1)}\u2009\u2013\u2009${fmt(l2)} \u00b7 ${this.escapeHtml(cm.code)}</div>
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
      blk(2, '14:00', '16:00', 'hb-cm hb-cm-esp', 'MINERÍA, INDUSTRIA E INNOVACIÓN', '4 charlas · toca para ver', 'openMineriaModal()'),
      blk(4, '9:00', '12:30', 'hb-retx', 'RETRANSMISIÓN AUDITORIO', 'Salones Pangea y Gondwana'),
      blk(4, '14:00', '16:00', 'hb-pangea', 'SALÓN PANGEA', '4 charlas · toca para ver', "openPangeaListModal('mie')"),
      brk(2, 'mie', 'primer', 'Primer refrigerio'),
      blk(3, '10:30', '12:30', 'hb-geo', 'GEOLIMPIADAS', ''),
      blk([2, 9], '12:30', '14:00', 'hb-alm', 'ALMUERZO LIBRE', ''),
      ponBlk(3, 'mie'),
      brk([2, 3], 'mie', 'segundo', 'Segundo refrigerio'),
      blk([2, 3], '17:10', '18:00', 'hb-cie', 'TERMALES', 'Salida 6:00 PM'),
    ].join('');

    const acggp = [
      blk(10, '8:00', '12:30', 'hb-sgc', 'Jornada ACGGP', '1 salón edificio de Artes<br>5 espacios · toca para ver', "openSgcModal('acggp')"),
    ].join('');

    const jue = [
      cmBlks([5, 2], 'jue', ['CE-4', 'CE-5']),
      cmBlks(5, 'jue', ['CM-4', 'CM-5', 'CE-6']),
      ponBlk(6, 'jue'),
      brk([5, 2], 'jue', 'tercer', 'Tercer refrigerio'),
      blk([5, 2], '11:00', '12:30', 'hb-pan', 'GEOLOGÍA EN VIVO', 'Dos Expertos, Un Viaje al Corazón de la Tierra', "openPanelPorTitulo('Geología en Vivo')"),
      blk(5, '14:00', '15:00', 'hb-pan', 'PANEL — GESTIÓN DEL RIESGO', 'Panel de discusión'),
      blk(7, '8:10', '12:30', 'hb-retx', 'RETRANSMISIÓN AUDITORIO', 'Salón Pangea'),
      blk(7, '14:00', '17:00', 'hb-retx', 'RETRANSMISIÓN AUDITORIO', 'Salón Pangea'),
      blk(6, '14:00', '15:00', 'hb-pangea', 'SALÓN GONDWANA', '1 charla especial · toca para ver', "openPangeaListModal('jue')"),
      brk([5, 2], 'jue', 'cuarto', 'Cuarto refrigerio'),
      blk([5, 2], '17:10', '18:20', 'hb-pos', 'PÓSTERS', '35 pósters · Salón Gondwana<br>Hidrogeología · Geoeducación · Geotecnia'),
      blk([5, 2], '18:30', '20:00', 'hb-cie', 'CANELAZO', '6:30 – 8:00 PM'),
    ].join('');

    const vie = [
      cmBlks([8, 2], 'vie', ['CE-7', 'CE-8', 'SCG']),
      cmBlks(8, 'vie', ['CM-6', 'CM-7', 'SCG']),
      `<div class="hblk hb-scg" style="grid-column:8 / span 2;grid-row:${r('14:00')}/${r('16:40')};cursor:pointer;justify-content:center;align-items:center;text-align:center;padding:4px 8px;" data-onclick="openSgcModal('scg')">
        <div class="ht" style="width:100%;text-align:center;font-size:8px;opacity:.8;">${fmt('14:00')} – ${fmt('16:40')}</div>
        <div class="hn" style="text-align:center;font-size:11px;">Jornada SCG</div>
        <div class="hs" style="text-align:center;">Soc. Colombiana de Geotecnia · 11 charlas · toca para ver</div>
      </div>`,
      ponBlk(9, 'vie'),
      brk([8, 2], 'vie', 'quinto', 'Quinto refrigerio'),
      blk([8, 2], '11:00', '12:30', 'hb-pan', 'PANEL · ANH', 'Energías, territorio y decisiones'),
      brk(10, 'vie', 'sexto', 'Sexto refrigerio'),
      blk(10, '14:20', '15:30', 'hb-pos', 'PÓSTERS', '58 pósters · 2 salones<br>Salón Pangea · Salón Gondwana'),
      blk(10, '16:40', '19:20', 'hb-retx', 'RETRANSMISIÓN AUDITORIO', 'Salones Pangea y Gondwana'),
      blk([8, 2], '17:20', '19:20', 'hb-cie', 'EVENTO DE CIERRE', '5:20 – 7:20 PM'),
      `<div class="hblk hb-cie" style="grid-column:8 / span 2;grid-row:${r('19:20')}/${r('20:00')};justify-content:center;align-items:center;text-align:center;">
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
      <div class="hh hs-retx">Retransmisión</div>
      <div class="hh hs-c">Charlas · Actividades</div>
      <div class="hh hs-p">Ponencias</div>
      <div class="hh hs-g">ACGGP / SCG</div>
    </div>`;

    return `<div style="overflow-x:auto;border:1px solid var(--border);border-radius:8px;">
      ${hdrMain}${hdrSub}
      <div style="display:grid;grid-template-columns:${GC};grid-template-rows:repeat(760,2px);position:relative;min-width:1050px;">
        ${tlHtml}${mie}${jue}${acggp}${vie}
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
      const _sm2 = (t: string) => { const x = (t || '').match(/(\d{1,2}):(\d{2})/); return x ? (+x[1]) * 60 + (+x[2]) : 0; };
      const parts = (t: string) => { const p = (t || '').split('–'); return { s: (p[0] || '').trim(), e: (p[1] || p[0] || '').trim(), sm: _sm2(p[0]), em: _sm2(p[1] || p[0]) }; };
      const lista = day.sgcCharlas.slice().sort((a: any, b: any) => _sm2(a.time) - _sm2(b.time));
      let html = '', buff: string[] = [], prevEnd: number | null = null, prevEndStr = '';
      const flush = () => { if (buff.length) { html += '<div class="sgc-grid">' + buff.join('') + '</div>'; buff = []; } };
      lista.forEach((ch: any) => {
        const p = parts(ch.time);
        if (prevEnd !== null && p.sm > prevEnd) {
          flush();
          const lbl = (p.sm - prevEnd) >= 60 ? 'Almuerzo' : 'Receso';
          html += `<div class="sgc-break">${lbl} · ${this.escapeHtml(prevEndStr)}–${this.escapeHtml(p.s)}</div>`;
        }
        buff.push(`<div class="sgc-item"><div class="si-title">${ch.time ? `<b class="si-time">${this.escapeHtml(ch.time)}</b> ` : ''}${this.escapeHtml(ch.title)}</div><div class="si-exp">${this.escapeHtml(ch.expositor || 'Por confirmar')}</div>${ch.direccion ? `<div class="si-tags">${this.escapeHtml(ch.direccion)}</div>` : ''}</div>`);
        prevEnd = p.em; prevEndStr = p.e;
      });
      flush();
      const box = this.renderer.createElement('div');
      this.renderer.addClass(box, 'sgc-list-box');
      box.innerHTML = `<div class="pm-head">110 años del Servicio Geológico (SGC) · Salón Pangea — ${day.sgcCharlas.length} charlas</div><details><summary>Ver programación completa · 08:00–17:40</summary><div class="poster-list">${html}</div></details>`;
      this.renderer.appendChild(wrap, box);
    }

    // ACGGP / SCG clickable boxes for Friday
    [
      { k: 'acggpPrograma', which: 'acggp', t: 'Jornada ACGGP — Asoc. Colombiana de Geólogos y Geofísicos de la Energía', h: '8:00 AM – 12:30 PM · 1 salón del edificio de Artes' },
      { k: 'scgPrograma', which: 'scg', t: 'Jornada SCG — Sociedad Colombiana de Geotecnia', h: '2:00 – 4:40 PM · 1 salón del edificio de Artes' },
    ].forEach((cfg: any) => {
      const lista = day[cfg.k];
      if (!lista || !lista.length) return;
      const box = this.renderer.createElement('div');
      this.renderer.addClass(box, 'sgc-list-box');
      this.renderer.addClass(box, 'clickable');
      (box as HTMLElement).style.cursor = 'pointer';
      box.innerHTML = `<div class="pm-head">${this.escapeHtml(cfg.t)} — ${lista.length} espacios</div>`
        + `<div class="pm-title" style="padding:10px 12px">${this.escapeHtml(cfg.h)} · `
        + `<span style="text-decoration:underline">toca para ver la programación</span></div>`;
      this.listeners.push(
        this.renderer.listen(box, 'click', () => this.openSgcModal(cfg.which)),
      );
      this.renderer.appendChild(wrap, box);
    });

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
      } else if (row.pangea) {
        this.renderer.appendChild(wrap, this.rowStrip(row.time, this.pangeaNode(row)));
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
    if (cm.sgcModal) {
      this.renderer.addClass(d, 'esp');
      this.renderer.addClass(d, 'clickable');
      this.listeners.push(
        this.renderer.listen(d, 'click', () => this.openSgcModal('scg')),
      );
    } else {
      this.renderer.addClass(d, mag ? 'mag' : 'esp');
      if (cm.code) {
        this.renderer.addClass(d, 'clickable');
        this.listeners.push(
          this.renderer.listen(d, 'click', () => this.openCharla(cm.code)),
        );
      }
    }
    const badge = cm.sgcModal ? 'Jornada institucional' : (mag ? 'Charla magistral' : 'Charla especial') + (cm.code ? ' · ' + this.escapeHtml(cm.code) : '');
    d.innerHTML =
      `<div class="ch-head"><span class="ch-badge">${badge}</span><span class="ch-time">Auditorio Cacique Sugamuxi · Edif. de Artes</span></div>` +
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
    if (row.flyer) {
      this.renderer.addClass(d, 'clickable');
      this.listeners.push(
        this.renderer.listen(d, 'click', () => this.openPanel(row)),
      );
    }
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
    g.style.gridTemplateColumns = `58px 1fr repeat(${rooms.length}, minmax(0,1fr))${row.pangea ? ' minmax(0,1.35fr)' : ''}`;

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
    ah.textContent = 'Auditorio Cacique Sugamuxi';
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
          const _star = cData.destacada ? '<span title="Reconocimiento especial" style="color:#FEC601">\u2605 </span>' : '';
          cell.innerHTML =
            `<div class="pc-title">${_star}${this.escapeHtml(cData.title)}</div>` +
            (cData.authors
              ? `<div class="pc-aut">${this.escapeHtml(cData.authors.split(/[,;]/)[0])}</div>`
              : '');
          if (cData.destacada) {
            (cell as HTMLElement).style.border = '2px solid #FEC601';
            (cell as HTMLElement).style.boxShadow = '0 0 6px rgba(254,198,1,.4)';
            (cell as HTMLElement).style.borderRadius = '6px';
          }
          this.listeners.push(
            this.renderer.listen(cell, 'click', () =>
              this.openModal(r, cData.time || row.time, cData),
            ),
          );
        }
        place(cell, `${3 + ci}`, String(i + 2));
      });
    }

    if (row.pangea) {
      const pc = 3 + rooms.length;
      const ph = this.renderer.createElement('div');
      this.renderer.addClass(ph, 'pon-room');
      this.renderer.addClass(ph, 'pangea-head');
      ph.innerHTML = `<div class="pr-num">${this.escapeHtml(row.pangea.title || 'Salón Pangea')}</div><div class="pr-theme">${this.escapeHtml(row.pangea.sub || 'Charlas especiales')}</div>`;
      place(ph, String(pc), '1');
      const pcell = this.renderer.createElement('div');
      this.renderer.addClass(pcell, 'dt-audcol');
      (row.pangea.charlas || []).forEach((ch: any) => {
        const s = this.renderer.createElement('div');
        this.renderer.addClass(s, 'aud-cell');
        this.renderer.addClass(s, 'pangea-cell');
        this.renderer.addClass(s, 'clickable');
        s.innerHTML = `<div class="ac-badge">Divulgación</div><div class="ac-time">${this.escapeHtml(ch.time || '')}</div><div class="ac-title">${this.escapeHtml(ch.title)}</div>`;
        this.listeners.push(
          this.renderer.listen(s, 'click', () => {
            this.matomo.trackEvent('Event', 'schedule_pangea_click', ch.title?.slice(0, 80));
            this.openPangeaModal(ch);
          }),
        );
        this.renderer.appendChild(pcell, s);
      });
      place(pcell, String(pc), `2 / span ${maxSlots}`);
    }

    return g;
  }

  private actBlock(row: any, act: any, cms: any[]): HTMLElement {
    const g = this.renderer.createElement('div');
    this.renderer.addClass(g, 'dt-grid');
    g.style.gridTemplateColumns = act.balanced ? '58px 1fr 1fr' : '58px 1fr minmax(0,6fr)';

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
    this.renderer.addClass(main, 'cat-geolimpiadas');
    main.style.gridColumn = '3';
    main.style.gridRow = '1';
    main.innerHTML =
      `<span class="seg-title">${this.escapeHtml(act.title)}</span>` +
      (act.sub ? `<span class="seg-sub">${this.escapeHtml(act.sub)}</span>` : '') +
      (act.onclick ? `<span class="seg-sub" style="margin-top:6px;opacity:.9">▸ Ver programación</span>` : '');
    if (act.onclick) {
      (main as HTMLElement).style.cursor = 'pointer';
      this.listeners.push(
        this.renderer.listen(main, 'click', () => this.openPanelPorTitulo(act.title)),
      );
    }
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

  private pangeaNode(row: any): HTMLElement {
    const d = this.renderer.createElement('div');
    this.renderer.addClass(d, 'poster-seg');
    const items = (row.pangea.charlas || []).map((ch: any, i: number) =>
      `<div class="p-item pangea-charla-item" data-i="${i}" style="cursor:pointer">`
      + `<b style="color:#be123c">${this.escapeHtml(ch.time || '')}</b> ${this.escapeHtml(ch.title)}`
      + (ch.speaker ? `<br><span style="opacity:.7">${this.escapeHtml(ch.speaker)}</span>` : '')
      + `</div>`).join('');
    d.innerHTML = `<div class="pm-head">${this.escapeHtml(row.pangea.title || 'Salón Pangea')} &mdash; `
      + `${this.escapeHtml(row.pangea.sub || 'Charlas especiales')}</div>`
      + `<div class="poster-merged-cell"><div class="pm-title">`
      + `En paralelo a las actividades del auditorio</div>${items}</div>`;
    d.querySelectorAll('.pangea-charla-item').forEach((el: Element) => {
      this.listeners.push(
        this.renderer.listen(el, 'click', () => {
          const idx = parseInt((el as HTMLElement).dataset['i'] || '0', 10);
          this.openPangeaModal((row.pangea.charlas || [])[idx]);
        }),
      );
    });
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
    const onclickBlocks = root.querySelectorAll('[data-onclick]');
    onclickBlocks.forEach((block) => {
      const action = (block as HTMLElement).dataset['onclick'];
      if (action && action.startsWith('openPangeaListModal(')) {
        const match = action.match(/openPangeaListModal\('(\w+)'\)/);
        const dayId = match ? match[1] : undefined;
        this.listeners.push(
          this.renderer.listen(block, 'click', () => this.openPangeaListModal(dayId)),
        );
      } else if (action && action.startsWith('openSgcModal(')) {
        const match = action.match(/openSgcModal\('(\w+)'\)/);
        const which = match ? match[1] : 'sgc';
        this.listeners.push(
          this.renderer.listen(block, 'click', () => this.openSgcModal(which)),
        );
      } else if (action === 'openMineriaModal()') {
        this.listeners.push(
          this.renderer.listen(block, 'click', () => this.openMineriaModal()),
        );
      } else if (action && action.startsWith("openPanelPorTitulo('")) {
        const match = action.match(/openPanelPorTitulo\('(.+)'\)/);
        const prefijo = match ? match[1] : '';
        this.listeners.push(
          this.renderer.listen(block, 'click', () => this.openPanelPorTitulo(prefijo)),
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

    const modalNote = modalBg.querySelector('#modalNote') as HTMLElement;
    if (modalNote) {
      modalNote.innerHTML = '';
      if (cell.reconocimiento) {
        modalNote.innerHTML = `<div style="margin-top:10px;padding:12px 14px;border-left:3px solid #FEC601;background:rgba(254,198,1,0.10);border-radius:0 6px 6px 0;font-size:13px;line-height:1.6"><b style="color:#D4A017">\u2605 Reconocimiento especial</b><br>${this.escapeHtml(cell.reconocimiento)}</div>`;
      }
    }

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
        modalRoom.innerHTML = `<b>Día / Hora:</b> ${this.escapeHtml(day.label)} · ${this.escapeHtml(cm.time)} · Auditorio Cacique Sugamuxi`;
        modalAuthors.innerHTML = `<b>Ponente:</b> ${this.escapeHtml(cm.speaker || 'Por confirmar')}${cm.org ? ' · ' + this.escapeHtml(cm.org) : ''}`;

        const modalNote = modalBg.querySelector('#modalNote') as HTMLElement;
        if (modalNote) modalNote.innerHTML = '';

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

  private openPangeaModal(ch: any): void {
    const root = this.officialRoot.nativeElement;
    const modalBg = root.querySelector('#modalBg') as HTMLElement;
    if (!modalBg) return;

    const modalBadge = modalBg.querySelector('#modalBadge') as HTMLElement;
    const modalTitle = modalBg.querySelector('#modalTitle') as HTMLElement;
    const modalRoom = modalBg.querySelector('#modalRoom') as HTMLElement;
    const modalAuthors = modalBg.querySelector('#modalAuthors') as HTMLElement;
    const modalNote = modalBg.querySelector('#modalNote') as HTMLElement;
    const modalFlyerWrap = modalBg.querySelector('#modalFlyerWrap') as HTMLElement;
    const modalFlyer = modalBg.querySelector('#modalFlyer') as HTMLImageElement;

    modalBadge.style.display = '';
    modalBadge.className = 'badge confirmado';
    const _sal = ch.salon || 'Salón Pangea';
    modalBadge.textContent = 'Charla especial · ' + _sal;
    modalTitle.textContent = ch.title;
    modalRoom.innerHTML = `<b>${this.escapeHtml(ch.dia || 'Miércoles')} · ${this.escapeHtml(ch.time || '')} · ${this.escapeHtml(_sal)}</b>`;
    modalAuthors.innerHTML = (ch.speaker ? `<b>Ponente:</b> ${this.escapeHtml(ch.speaker)}` : '') + (ch.coautores ? `<div style="margin-top:6px"><b>Coautores:</b> ${this.escapeHtml(ch.coautores)}</div>` : '');
    if (modalNote) modalNote.innerHTML = '';

    if (modalFlyerWrap) {
      modalFlyerWrap.style.display = 'none';
      if (modalFlyer) modalFlyer.removeAttribute('src');
    }

    this.renderer.addClass(modalBg, 'show');
  }

  private openPangeaListModal(dayId?: string): void {
    const dias = (DAYS as any[]).filter((d: any) => !dayId || d.id === dayId);
    const grupos: any[] = [];
    dias.forEach((d: any) => {
      (d.rows || []).forEach((row: any) => {
        if (row.pangea && (row.pangea.charlas || []).length) {
          grupos.push({ dia: d.label, salon: row.pangea.title || 'Salón Pangea', hora: row.time || '', charlas: row.pangea.charlas });
        }
      });
    });
    if (!grupos.length) return;

    const root = this.officialRoot.nativeElement;
    const modalBg = root.querySelector('#modalBg') as HTMLElement;
    if (!modalBg) return;

    const modalBadge = modalBg.querySelector('#modalBadge') as HTMLElement;
    const modalTitle = modalBg.querySelector('#modalTitle') as HTMLElement;
    const modalRoom = modalBg.querySelector('#modalRoom') as HTMLElement;
    const modalAuthors = modalBg.querySelector('#modalAuthors') as HTMLElement;
    const modalNote = modalBg.querySelector('#modalNote') as HTMLElement;
    const modalFlyerWrap = modalBg.querySelector('#modalFlyerWrap') as HTMLElement;
    const modalFlyer = modalBg.querySelector('#modalFlyer') as HTMLImageElement;

    const total = grupos.reduce((n: number, g: any) => n + g.charlas.length, 0);
    const uno = grupos.length === 1 ? grupos[0] : null;

    modalBadge.style.display = '';
    modalBadge.className = 'badge confirmado';
    modalBadge.textContent = 'Charlas especiales · Edificio de Artes';
    modalTitle.textContent = uno ? uno.salon : [...new Set(grupos.map((g: any) => g.salon))].join(' y ');
    modalRoom.innerHTML = uno
      ? `<b>${this.escapeHtml(uno.dia)} · ${this.escapeHtml(uno.hora)} · ${total} charlas</b>`
      : `<b>${total} charlas · ${this.escapeHtml(grupos.map((g: any) => g.dia).join(' y '))}</b>`;
    modalAuthors.innerHTML = '';

    const items = grupos.map((g: any) => {
      const fila = g.charlas.map((ch: any) => {
        const _t = ch.time ? `<b style="color:#be123c">${this.escapeHtml(ch.time)}</b> ` : '';
        const _sp = ch.speaker ? ` — <span style="opacity:.75">${this.escapeHtml(ch.speaker)}</span>` : '';
        return `<div style="padding:7px 0;border-bottom:1px solid rgba(128,128,128,.25)">${_t}${this.escapeHtml(ch.title)}${_sp}</div>`;
      }).join('');
      const cab = uno ? '' : `<div style="margin-top:10px;font-weight:700;opacity:.8">${this.escapeHtml(g.dia)} · ${this.escapeHtml(g.salon)}</div>`;
      return cab + fila;
    }).join('');
    if (modalNote) modalNote.innerHTML = `<div style="max-height:52vh;overflow:auto;text-align:left;margin-top:6px">${items}</div>`;

    if (modalFlyerWrap) {
      modalFlyerWrap.style.display = 'none';
      if (modalFlyer) modalFlyer.removeAttribute('src');
    }

    this.renderer.addClass(modalBg, 'show');
  }

  private openSgcModal(which: string): void {
    this.matomo.trackEvent('Event', 'schedule_item_click', 'sgc_' + which);
    const jue = (DAYS as any[]).find((d: any) => d.id === 'jue');
    const vie = (DAYS as any[]).find((d: any) => d.id === 'vie');
    let titulo: string, sub: string, lista: any[];

    if (which === 'acggp') {
      titulo = 'Jornada ACGGP — Asoc. Colombiana de Geólogos y Geofísicos de la Energía';
      sub = 'Viernes · 8:00 AM–12:30 PM · 1 salón del edificio de Artes';
      lista = (vie && vie.acggpPrograma) || [];
    } else if (which === 'scg') {
      titulo = 'Jornada SCG — Sociedad Colombiana de Geotecnia';
      sub = 'Viernes · 2:00–4:40 PM · 1 salón del edificio de Artes';
      lista = (vie && vie.scgPrograma) || [];
    } else {
      titulo = '110 años del Servicio Geológico Colombiano';
      sub = 'Jueves · todo el día · Salón Pangea';
      lista = (jue && (jue.sgcCharlasArchivo || jue.sgcCharlas)) || [];
    }

    const root = this.officialRoot.nativeElement;
    const modalBg = root.querySelector('#modalBg') as HTMLElement;
    if (!modalBg) return;

    const modalBadge = modalBg.querySelector('#modalBadge') as HTMLElement;
    const modalTitle = modalBg.querySelector('#modalTitle') as HTMLElement;
    const modalRoom = modalBg.querySelector('#modalRoom') as HTMLElement;
    const modalAuthors = modalBg.querySelector('#modalAuthors') as HTMLElement;
    const modalNote = modalBg.querySelector('#modalNote') as HTMLElement;
    const modalFlyerWrap = modalBg.querySelector('#modalFlyerWrap') as HTMLElement;
    const modalFlyer = modalBg.querySelector('#modalFlyer') as HTMLImageElement;

    modalBadge.style.display = '';
    modalBadge.className = 'badge confirmado';
    modalBadge.textContent = 'Programación institucional';
    modalTitle.textContent = titulo;
    modalRoom.innerHTML = `<b>${this.escapeHtml(sub)}</b>`;
    modalAuthors.innerHTML = '';

    const items = lista.map((it: any) => {
      const _t = it.time ? `<b style="color:var(--green,#3fbf6b)">${this.escapeHtml(it.time)}</b> ` : '';
      const _q = it.expositor || it.speaker;
      const _m = _q ? ` — <span style="opacity:.75">${this.escapeHtml(_q)}</span>` : '';
      const _a = it.area ? `<br><span style="opacity:.55;font-size:11px">${this.escapeHtml(it.area)}</span>` : '';
      return `<div style="padding:5px 0;border-bottom:1px solid rgba(128,128,128,.25)">${_t}${this.escapeHtml(it.title)}${_m}${_a}</div>`;
    }).join('');
    if (modalNote) modalNote.innerHTML = `<div style="max-height:52vh;overflow:auto;text-align:left;margin-top:6px">${items || 'Programación por confirmar.'}</div>`;

    if (modalFlyerWrap) {
      modalFlyerWrap.style.display = 'none';
      if (modalFlyer) modalFlyer.removeAttribute('src');
    }

    this.renderer.addClass(modalBg, 'show');
  }

  private openMineriaModal(): void {
    this.matomo.trackEvent('Event', 'schedule_item_click', 'mineria_bloque');
    const mie = (DAYS as any[]).find((d: any) => d.id === 'mie');
    if (!mie) return;
    const codes = ['CE-2', 'CE-3', 'CE-11', 'CE-10'];
    const _m = (t: string) => { const x = (t || '').match(/(\d{1,2}):(\d{2})/); return x ? (+x[1]) * 60 + (+x[2]) : 9999; };
    let cms: any[] = [];
    (mie.rows || []).forEach((row: any) => {
      ((row.auditorio || {}).cms || []).forEach((cm: any) => {
        if (codes.indexOf(cm.code) >= 0) cms.push(cm);
      });
    });
    cms.sort((a: any, b: any) => _m(a.time) - _m(b.time));

    const root = this.officialRoot.nativeElement;
    const modalBg = root.querySelector('#modalBg') as HTMLElement;
    if (!modalBg) return;

    const modalBadge = modalBg.querySelector('#modalBadge') as HTMLElement;
    const modalTitle = modalBg.querySelector('#modalTitle') as HTMLElement;
    const modalRoom = modalBg.querySelector('#modalRoom') as HTMLElement;
    const modalAuthors = modalBg.querySelector('#modalAuthors') as HTMLElement;
    const modalNote = modalBg.querySelector('#modalNote') as HTMLElement;
    const modalFlyerWrap = modalBg.querySelector('#modalFlyerWrap') as HTMLElement;
    const modalFlyer = modalBg.querySelector('#modalFlyer') as HTMLImageElement;

    modalBadge.style.display = '';
    modalBadge.className = 'badge confirmado';
    modalBadge.textContent = 'Bloque de charlas especiales';
    modalTitle.textContent = 'Minería, industria e innovación';
    modalRoom.innerHTML = '<b>Miércoles · 2:00–4:00 PM · Auditorio Cacique Sugamuxi (Edif. de Artes)</b>';
    modalAuthors.innerHTML = '';
    const items = cms.map((cm: any) => {
      const _t = cm.time ? `<b style="color:var(--green,#3fbf6b)">${this.escapeHtml(cm.time)}</b> ` : '';
      return `<div data-code="${this.escapeHtml(cm.code)}" style="padding:7px 0;border-bottom:1px solid rgba(128,128,128,.25);cursor:pointer">${_t}${this.escapeHtml(cm.title)} <span style="opacity:.5;font-size:11px">· ${this.escapeHtml(cm.code)}</span></div>`;
    }).join('');
    if (modalNote) modalNote.innerHTML = `<div style="max-height:52vh;overflow:auto;text-align:left;margin-top:6px">${items || 'Por confirmar.'}</div>`;

    // Attach click listeners for each charla item
    if (modalNote) {
      modalNote.querySelectorAll('[data-code]').forEach((el) => {
        this.listeners.push(
          this.renderer.listen(el, 'click', () => {
            const code = (el as HTMLElement).dataset['code'];
            if (code) this.openCharla(code);
          }),
        );
      });
    }

    if (modalFlyerWrap) {
      modalFlyerWrap.style.display = 'none';
      if (modalFlyer) modalFlyer.removeAttribute('src');
    }

    this.renderer.addClass(modalBg, 'show');
  }

  private openPanelPorTitulo(prefijo: string): void {
    for (const day of DAYS as any[]) {
      for (const row of (day.rows || [])) {
        if (row.type === 'panel' && row.title && row.title.indexOf(prefijo) === 0) {
          this.openPanel(row);
          return;
        }
      }
    }
  }

  private openPanel(row: any): void {
    this.matomo.trackEvent('Event', 'schedule_item_click', 'panel_' + (row.title || '').slice(0, 40));
    const root = this.officialRoot.nativeElement;
    const modalBg = root.querySelector('#modalBg') as HTMLElement;
    if (!modalBg) return;

    const modalBadge = modalBg.querySelector('#modalBadge') as HTMLElement;
    const modalTitle = modalBg.querySelector('#modalTitle') as HTMLElement;
    const modalRoom = modalBg.querySelector('#modalRoom') as HTMLElement;
    const modalAuthors = modalBg.querySelector('#modalAuthors') as HTMLElement;
    const modalNote = modalBg.querySelector('#modalNote') as HTMLElement;
    const modalFlyerWrap = modalBg.querySelector('#modalFlyerWrap') as HTMLElement;
    const modalFlyer = modalBg.querySelector('#modalFlyer') as HTMLImageElement;

    modalBadge.style.display = '';
    modalBadge.className = 'badge confirmado';
    modalBadge.textContent = 'Panel de discusión';
    modalTitle.textContent = row.title;
    modalRoom.innerHTML = `<b>Hora:</b> ${this.escapeHtml(row.time || '')}`;
    modalAuthors.innerHTML = row.note ? `<b>Participan:</b> ${this.escapeHtml(row.note)}` : '';
    if (modalNote) modalNote.innerHTML = '';

    if (modalFlyerWrap && modalFlyer && row.flyer) {
      const src = encodeURI(row.flyer);
      modalFlyer.src = src;
      modalFlyer.onclick = () => window.open(src, '_blank');
      modalFlyer.onerror = () => { modalFlyerWrap.style.display = 'none'; };
      modalFlyerWrap.style.display = '';
    } else if (modalFlyerWrap) {
      modalFlyerWrap.style.display = 'none';
      if (modalFlyer) modalFlyer.removeAttribute('src');
    }

    this.renderer.addClass(modalBg, 'show');
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
  //  STATS
  // ============================================================
  private renderStats(): void {
    const root = this.officialRoot.nativeElement;
    const statsEl = root.querySelector('#stats');
    if (!statsEl) return;

    let pon = 0, pos = 0;
    const cms = new Set<string>(), ces = new Set<string>();
    for (const d of DAYS as any[]) {
      for (const row of (d.rows || [])) {
        for (const lst of Object.values(row.cells || {})) {
          pon += ((lst as any[]) || []).filter(Boolean).length;
        }
        pos += (row.posterBatch || []).length;
        for (const c of ((row.auditorio || {}).cms || [])) {
          if (!c.code) continue;
          (c.code.indexOf('CM') === 0 ? cms : ces).add(c.code);
        }
      }
    }

    const statCard = (n: number, l: string) =>
      `<div class="stat"><div class="num">${n}</div><div class="lbl">${this.escapeHtml(l)}</div></div>`;
    statsEl.innerHTML = [
      [pon, 'Ponencias'],
      [cms.size, 'Charlas magistrales'],
      [ces.size, 'Charlas especiales'],
      [pos, 'Pósters'],
    ].map(([n, l]) => statCard(n as number, l as string)).join('');
  }

  // ============================================================
  //  UTILITY
  // ============================================================
  private escapeHtml(s: string): string {
    if (!s) return '';
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
