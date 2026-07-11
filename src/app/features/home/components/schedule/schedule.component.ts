import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DAYS, STATUS_LABEL, CHARLA_FLYERS } from './schedule.data';

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

    const GC = '55px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
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
      blk([2, 2], '9:00', '10:00', 'hb-ap', 'BIENVENIDA', 'Apertura del evento'),
      cmBlks([2, 2], 'mie', ['CE-1', 'CE-2', 'CE-3']),
      cmBlks(2, 'mie', ['CM-1', 'CM-2']),
      blk(2, '10:40', '11:20', 'hb-brk', 'BREAK', 'Primer refrigerio'),
      blk(3, '10:30', '12:30', 'hb-geo', 'GEOLIMPIADAS', ''),
      blk([2, 8], '12:30', '14:00', 'hb-alm', 'ALMUERZO', ''),
      blk(3, '14:00', '16:00', 'hb-pon', 'PONENCIAS', '35 ponencias · 6 salas · 20 min'),
      blk([2, 2], '16:00', '16:30', 'hb-brk', 'BREAK', 'Segundo refrigerio'),
      blk([2, 2], '17:10', '18:10', 'hb-pos', 'PÓSTERS', '58 pósters · 2 salones\nSalón A: Energía · CO₂/H₂ · Petrología · Mineralogía\nSalón B: Estructural · Geofísica · Sedimentología · Paleontología'),
      blk([2, 2], '18:10', '19:00', 'hb-cie', 'TERMALES', '6:00 PM · máx. 7:00 PM'),
    ].join('');

    const sgc = [
      blk(6, '8:00', '12:30', 'hb-sgc', 'Salón 110 años', 'Servicio Geológico Colombiano'),
      blk(6, '14:00', '19:00', 'hb-sgc', 'Salón 110 años', ''),
    ].join('');

    const acggp = [
      blk(9, '8:00', '12:30', 'hb-sgc', 'ACGGP', '1 salón edificio de Artes<br>(mañana)'),
      blk(9, '14:00', '16:10', 'hb-scg', 'SCG', 'Sociedad Colombiana<br>de Geotecnia<br>1 salón edificio de Artes'),
    ].join('');

    const jue = [
      cmBlks([4, 2], 'jue', ['CE-4', 'CE-5']),
      cmBlks(4, 'jue', ['CM-3', 'CM-4', 'CE-6']),
      blk(5, '8:10', '9:10', 'hb-pon', 'PONENCIAS', '18 ponencias · 6 salas · 20 min'),
      blk([4, 2], '10:30', '11:00', 'hb-brk', 'BREAK', 'Tercer refrigerio'),
      blk([4, 2], '11:00', '12:30', 'hb-pan', 'PANEL — GESTIÓN DEL RIESGO', 'Panel de discusión'),
      blk([4, 2], '14:00', '15:00', 'hb-pan', 'GEOLOGÍA EN VIVO', 'Dos Expertos, Un Viaje al Corazón de la Tierra'),
      blk([4, 2], '15:00', '15:30', 'hb-brk', 'BREAK', 'Cuarto refrigerio'),
      blk([4, 2], '17:10', '18:20', 'hb-pos', 'PÓSTERS', '28 pósters · 1 salón<br>Hidrogeología · Geoeducación · Geotecnia'),
      blk([4, 2], '18:30', '20:00', 'hb-cie', 'CANELAZO', '6:30 – 8:00 PM'),
    ].join('');

    const vie = [
      cmBlks([7, 2], 'vie', ['CE-7', 'CE-8']),
      cmBlks(7, 'vie', ['CM-5', 'CM-6', 'CM-7', 'CE-9']),
      blk(8, '8:10', '9:10', 'hb-pon', 'PONENCIAS', '18 ponencias · 6 salas · 20 min'),
      blk([7, 2], '10:30', '11:00', 'hb-brk', 'BREAK', 'Quinto refrigerio'),
      blk([7, 2], '11:00', '12:30', 'hb-pan', 'PANEL · ANH', 'Energías, territorio y decisiones'),
      blk([7, 2], '16:10', '16:40', 'hb-brk', 'BREAK', 'Sexto refrigerio'),
      blk([7, 2], '16:50', '19:00', 'hb-cie', 'EVENTO DE CIERRE', '4:50 PM'),
      blk([7, 2], '20:00', '20:40', 'hb-cie', 'FIESTA FINAL', '8:00 PM →'),
    ].join('');

    const hdrMain = `<div style="display:grid;grid-template-columns:${GC};background:var(--night-2);border-bottom:2px solid var(--border);min-width:940px;">
      <div class="hh">Hora</div>
      <div class="hh" style="grid-column:2/span 2">Miércoles 19 Ago</div>
      <div class="hh" style="grid-column:4/span 3">Jueves 20 Ago</div>
      <div class="hh" style="grid-column:7/span 3">Viernes 21 Ago</div>
    </div>`;

    const hdrSub = `<div style="display:grid;grid-template-columns:${GC};background:var(--night-2);border-bottom:1px solid var(--border);min-width:940px;">
      <div></div>
      <div class="hh hs-c">Charlas · Actividades</div>
      <div class="hh hs-p">Ponencias · Pósters</div>
      <div class="hh hs-c">Charlas · Actividades</div>
      <div class="hh hs-p">Ponencias · Pósters</div>
      <div class="hh hs-g">110 años · SGC</div>
      <div class="hh hs-c">Charlas · Actividades</div>
      <div class="hh hs-p">Ponencias</div>
      <div class="hh hs-g">ACGGP / SCG</div>
    </div>`;

    return `<div style="overflow-x:auto;border:1px solid var(--border);border-radius:8px;">
      ${hdrMain}${hdrSub}
      <div style="display:grid;grid-template-columns:${GC};grid-template-rows:repeat(760,2px);position:relative;min-width:940px;">
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
  }

  // ============================================================
  //  MODAL
  // ============================================================
  private openModal(room: string, time: string, cell: any): void {
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
          modalFlyer.onclick = () => window.open(src, '_blank');
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
    if (root.classList.contains('day-mode')) {
      this.applyNight();
      localStorage.setItem('stg-theme', 'night');
    } else {
      this.applyDay();
      localStorage.setItem('stg-theme', 'day');
    }
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
