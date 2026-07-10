import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DAYS, STATUS_LABEL } from './schedule.data';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
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

  // ============================================================
  //  RENDER PRINCIPAL - IDÉNTICO AL HTML ORIGINAL
  // ============================================================
  private renderSchedule(): void {
    const root = this.officialRoot.nativeElement;
    const tabsEl = root.querySelector('#tabs');
    const tabDescEl = root.querySelector('#tabDesc');
    const panelsEl = root.querySelector('#panels');

    if (!tabsEl || !panelsEl) return;

    tabsEl.innerHTML = '';
    panelsEl.innerHTML = '';

    DAYS.forEach((day: any, idx: number) => {
      // Pestaña
      const btn = this.renderer.createElement('button');
      this.renderer.addClass(btn, 'tab-btn');
      if (idx === 0) this.renderer.addClass(btn, 'active');
      btn.textContent = day.label;
      this.listeners.push(
        this.renderer.listen(btn, 'click', () => this.selectDay(idx)),
      );
      this.renderer.appendChild(tabsEl, btn);

      // Panel
      const panel = this.renderer.createElement('div');
      this.renderer.addClass(panel, 'day-panel');
      if (idx === 0) this.renderer.addClass(panel, 'active');
      this.renderer.setAttribute(panel, 'id', 'panel-' + day.id);

      if (day.type === 'dashboard') {
        panel.innerHTML = this.renderHorarioGrid();
      } else {
        this.renderDayTable(panel, day);
      }
      this.renderer.appendChild(panelsEl, panel);
    });

    this.selectDay(0);
    this.attachHorarioClickListeners();
  }

  // ============================================================
  //  HORARIO GENERAL - CUADRICULA (IDÉNTICO AL ORIGINAL)
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
            return `<div class="hblk hb-cm" style="grid-column:${cs};grid-row:${r(t1)}/${r(t2)};justify-content:flex-start;align-items:flex-start;text-align:left;" data-code="${this.escapeHtml(cm.code)}">
              <div class="ht" style="width:100%;text-align:left">${fmt(t1)}\u2009\u2013\u2009${fmt(t2)} \u00b7 ${this.escapeHtml(cm.code)}</div>
              <div class="hn" style="line-height:1.25;color:var(--amber);display:-webkit-box;-webkit-line-clamp:${clamp};-webkit-box-orient:vertical;overflow:hidden;">${this.escapeHtml(cm.title)}</div>
              ${spOk ? `<div class="hs" style="font-style:italic;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;">${this.escapeHtml(cm.speaker)}</div>` : ''}
            </div>`;
          }),
        )
        .join('');
    };

    const GC = '55px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
    const tls = [
      '8:00',
      '8:30',
      '9:00',
      '9:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
    ];
    const tlHtml = tls
      .map(
        (t) =>
          `<div style="grid-column:1;grid-row:${r(t)}/${r(t) + 10};font-family:'DM Mono',monospace;font-size:9px;color:var(--text-dim);display:flex;align-items:flex-start;justify-content:flex-end;padding-right:6px;padding-top:2px;border-right:1px solid var(--border);">${t}</div>`,
      )
      .join('');

    const mie = [
      blk([2, 2], '8:00', '9:00', 'hb-reg', 'REGISTRO', ''),
      blk(
        [2, 2],
        '9:00',
        '10:00',
        'hb-ap',
        'BIENVENIDA',
        'Apertura del evento',
      ),
      cmBlks([2, 2], 'mie', ['CE-1', 'CE-2', 'CE-3']),
      cmBlks(2, 'mie', ['CM-1', 'CM-2']),
      blk(2, '10:40', '11:20', 'hb-brk', 'BREAK', 'Primer refrigerio'),
      blk(3, '10:30', '12:30', 'hb-geo', 'GEOLIMPIADAS', ''),
      blk([2, 8], '12:30', '14:00', 'hb-alm', 'ALMUERZO', ''),
      blk(
        3,
        '14:00',
        '16:00',
        'hb-pon',
        'PONENCIAS',
        '35 ponencias · 6 salas · 20 min',
      ),
      blk([2, 2], '16:00', '16:30', 'hb-brk', 'BREAK', 'Segundo refrigerio'),
      blk(3, '17:10', '18:10', 'hb-geo', 'PÓSTERS', '54 pósters · 2 salones'),
      blk(
        [2, 2],
        '18:10',
        '19:00',
        'hb-cie',
        'TERMALES',
        '6:00 PM · máx. 7:00 PM',
      ),
    ].join('');

    const sgc = [
      blk(
        4,
        '8:00',
        '12:30',
        'hb-sgc',
        'SGC',
        'Servicio Geológico<br>Colombiano<br>1 salón Bienestar',
      ),
      blk(4, '14:00', '19:00', 'hb-sgc', 'SGC', ''),
    ].join('');

    const acggp = [
      blk(
        7,
        '8:00',
        '12:30',
        'hb-sgc',
        'ACGGP',
        '1 salón Bienestar<br>(mañana)',
      ),
      blk(
        7,
        '14:00',
        '16:10',
        'hb-scg',
        'SCG',
        'Sociedad Colombiana<br>de Geotecnia<br>1 salón Bienestar',
      ),
    ].join('');

    const jue = [
      cmBlks([5, 2], 'jue', ['CE-4', 'CE-5']),
      cmBlks(5, 'jue', ['CM-3', 'CM-4', 'CE-6']),
      blk(
        6,
        '8:10',
        '9:25',
        'hb-pon',
        'PONENCIAS',
        '18 ponencias · 6 salas · 25 min',
      ),
      blk([5, 2], '10:30', '11:00', 'hb-brk', 'BREAK', 'Tercer refrigerio'),
      blk(
        [5, 2],
        '11:00',
        '12:30',
        'hb-pan',
        'PANEL — GESTIÓN DEL RIESGO',
        'Panel de discusión',
      ),
      blk(
        [5, 2],
        '14:00',
        '15:00',
        'hb-pan',
        'GEOLOGÍA EN VIVO',
        'Dos Expertos, Un Viaje al Corazón de la Tierra',
      ),
      blk([5, 2], '15:00', '15:30', 'hb-brk', 'BREAK', 'Cuarto refrigerio'),
      blk(
        [5, 2],
        '17:10',
        '18:20',
        'hb-geo',
        'PÓSTERS',
        '30 pósters · 1 salón',
      ),
      blk([5, 2], '19:00', '19:40', 'hb-cie', 'CANELAZO', '7:00 PM'),
    ].join('');

    const vie = [
      cmBlks([8, 2], 'vie', ['CE-7', 'CE-8']),
      cmBlks(8, 'vie', ['CM-5', 'CM-6', 'CM-7', 'CE-9']),
      blk(
        9,
        '8:10',
        '9:25',
        'hb-pon',
        'PONENCIAS',
        '18 ponencias · 6 salas · 25 min',
      ),
      blk([8, 2], '10:30', '11:00', 'hb-brk', 'BREAK', 'Quinto refrigerio'),
      blk(
        [8, 2],
        '11:00',
        '12:30',
        'hb-pan',
        'PANEL · ANH',
        'Energías, territorio y decisiones',
      ),
      blk([8, 2], '16:10', '16:40', 'hb-brk', 'BREAK', 'Sexto refrigerio'),
      blk([8, 2], '16:50', '19:00', 'hb-cie', 'EVENTO DE CIERRE', '4:50 PM'),
      blk([8, 2], '20:00', '20:40', 'hb-cie', 'FIESTA FINAL', '8:00 PM →'),
    ].join('');

    const hdrMain = `<div style="display:grid;grid-template-columns:${GC};background:var(--night-2);border-bottom:2px solid var(--border);min-width:940px;">
      <div class="hh">Hora</div>
      <div class="hh" style="grid-column:2/span 2">Miércoles 19 Ago</div>
      <div class="hh" style="color:var(--green);font-size:7px;padding:5px 3px;line-height:1.5;letter-spacing:.3px">SERVICIO<br>GEOLÓGICO<br>COLOMBIANO</div>
      <div class="hh" style="grid-column:5/span 2">Jueves 20 Ago</div>
      <div class="hh" style="color:var(--green);font-size:7px;padding:5px 3px;line-height:1.5;letter-spacing:.3px">SALÓN<br>ACGGP AM<br>SCG PM</div>
      <div class="hh" style="grid-column:8/span 2">Viernes 21 Ago</div>
    </div>`;

    const hdrSub = `<div style="display:grid;grid-template-columns:${GC};background:var(--night-2);border-bottom:1px solid var(--border);min-width:940px;">
      <div></div>
      <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--amber);opacity:.8">Charlas · Actividades</div>
      <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--teal);opacity:.8">Ponencias · Pósters</div>
      <div></div>
      <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--amber);opacity:.8">Charlas · Actividades</div>
      <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--teal);opacity:.8">Ponencias · Pósters</div>
      <div></div>
      <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--amber);opacity:.8">Charlas · Actividades</div>
      <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--teal);opacity:.8">Ponencias</div>
    </div>`;

    return `<div style="overflow-x:auto;border:1px solid var(--border);border-radius:8px;">
      ${hdrMain}${hdrSub}
      <div style="display:grid;grid-template-columns:${GC};grid-template-rows:repeat(760,2px);position:relative;min-width:940px;">
        ${tlHtml}${mie}${sgc}${jue}${acggp}${vie}
      </div>
    </div>`;
  }

  // ============================================================
  //  TABLA DE DIA ESPECIFICO - ESTRUCTURA IDÉNTICA AL HTML ORIGINAL
  // ============================================================
  private renderDayTable(panel: HTMLElement, day: any): void {
    const wrap = this.renderer.createElement('div');
    this.renderer.addClass(wrap, 'grid-wrap');
    const table = this.renderer.createElement('table');
    this.renderer.addClass(table, 'cal');

    // --- HEADER (idéntico al HTML original) ---
    const thead = this.renderer.createElement('thead');
    const trh = this.renderer.createElement('tr');
    let headerHtml = '<th class="time-col">Hora</th>';
    if (day.sgcColumn) {
      headerHtml += `<th style="width:64px;background:rgba(63,191,107,0.08);color:var(--green);font-size:9px;">${this.escapeHtml(day.sgcHeader || 'SGC')}</th>`;
    }
    headerHtml += '<th class="auditorio-col">Auditorio</th>';
    headerHtml += day.rooms
      .map(
        (r: string) =>
          `<th><div class="room-name">${this.escapeHtml(r)}</div><div class="room-theme">${this.escapeHtml((day.themes || {})[r] || '')}</div></th>`,
      )
      .join('');
    trh.innerHTML = headerHtml;
    this.renderer.appendChild(thead, trh);
    this.renderer.appendChild(table, thead);

    // --- BODY ---
    const tbody = this.renderer.createElement('tbody');

    day.rows.forEach((row: any) => {
      const tr = this.renderer.createElement('tr');

      if (row.type === 'panel') {
        // PANEL: igual que en el HTML original
        tr.className = 'panel-row';

        if (day.sgcColumn) {
          // Con columna SGC
          const tdTime = this.renderer.createElement('td');
          tdTime.className = 'time-cell';
          tdTime.textContent = row.time;
          this.renderer.appendChild(tr, tdTime);

          // Celda SGC si es start
          if (row.sgc === 'start') {
            tr.appendChild(this.createSgcTd(row));
          }

          // Celda principal: colSpan = salas + 1 (auditorio) + (1 si NO tiene SGC)
          const td = this.renderer.createElement('td');
          // En el HTML original: day.rooms.length + 1 + (row.sgc ? 0 : 1)
          const colSpan = day.rooms.length + 1 + (row.sgc ? 0 : 1);
          td.colSpan = colSpan;
          td.innerHTML = `<div class="panel-title">${this.escapeHtml(row.title)}</div>
                          <div class="panel-meta">${this.escapeHtml(row.note || '')}</div>`;
          this.renderer.appendChild(tr, td);
        } else {
          // Sin columna SGC: ocupa todas las columnas
          const td = this.renderer.createElement('td');
          td.colSpan = day.rooms.length + 2;
          td.innerHTML = `<div class="panel-meta">${this.escapeHtml(row.time)} · PANEL</div>
                          <div class="panel-title">${this.escapeHtml(row.title)}</div>
                          <div class="panel-meta">${this.escapeHtml(row.note || '')}</div>`;
          this.renderer.appendChild(tr, td);
        }
      } else if (row.type === 'info') {
        // INFO: igual que en el HTML original
        tr.className = 'info-row cat-' + this.escapeHtml(row.category || '');

        if (day.sgcColumn) {
          const tdTime = this.renderer.createElement('td');
          tdTime.className = 'time-cell';
          tdTime.textContent = row.time;
          this.renderer.appendChild(tr, tdTime);

          if (row.sgc === 'start') {
            tr.appendChild(this.createSgcTd(row));
          }

          const td = this.renderer.createElement('td');
          const colSpan = day.rooms.length + 1 + (row.sgc ? 0 : 1);
          td.colSpan = colSpan;
          td.innerHTML = `<div class="info-title">${this.escapeHtml(row.title)}</div>
                          ${row.note ? `<div class="info-meta">${this.escapeHtml(row.note)}</div>` : ''}`;
          this.renderer.appendChild(tr, td);
        } else {
          const td = this.renderer.createElement('td');
          td.colSpan = day.rooms.length + 2;
          td.innerHTML = `<div class="info-title">${this.escapeHtml(row.time)} · ${this.escapeHtml(row.title)}</div>
                          ${row.note ? `<div class="info-meta">${this.escapeHtml(row.note)}</div>` : ''}`;
          this.renderer.appendChild(tr, td);
        }
      } else if (row.type === 'block') {
        // BLOCK: igual que en el HTML original
        tr.className = 'block-row';

        const tdTime = this.renderer.createElement('td');
        tdTime.className = 'time-cell';
        tdTime.textContent = row.time;
        this.renderer.appendChild(tr, tdTime);

        // SGC
        if (row.sgc === 'start') {
          tr.appendChild(this.createSgcTd(row));
        }

        // Auditorio
        const tdAud = this.renderer.createElement('td');
        const aud = row.auditorio;
        if (!aud) {
          tdAud.innerHTML =
            '<div class="auditorio-cell"><div class="au-dash">—</div></div>';
        } else if (aud.special) {
          tdAud.innerHTML = `<div class="auditorio-cell"><div class="au-item"><div class="au-code">${this.escapeHtml(row.time)}</div><div class="au-title au-tbd">${this.escapeHtml(aud.text)}</div></div></div>`;
        } else if (aud.cms) {
          const items = aud.cms
            .map(
              (cm: any) =>
                `<div class="au-item${cm.code ? ' clickable' : ''}"${cm.code ? ` data-code="${this.escapeHtml(cm.code)}"` : ''}>
                  <div class="au-code">${cm.code ? this.escapeHtml(cm.code) + ' · ' : ''}${this.escapeHtml(cm.time)}</div>
                  <div class="au-title">${this.escapeHtml(cm.title)}</div>
                  <div class="au-speaker${cm.speaker === 'Por confirmar' ? ' au-tbd' : ''}">${this.escapeHtml(cm.speaker || '')}</div>
                </div>`,
            )
            .join('');
          tdAud.innerHTML = `<div class="auditorio-cell">${items}</div>`;
        }
        this.renderer.appendChild(tr, tdAud);

        // Celdas de salas o altBlock o posterBatch
        if (row.altBlock) {
          const td = this.renderer.createElement('td');
          td.colSpan = day.rooms.length;
          if (row.altBlock.span) td.rowSpan = row.altBlock.span;
          td.style.background = 'rgba(212,160,23,0.08)';
          td.style.borderLeft = '3px solid var(--gold)';
          td.style.verticalAlign = 'middle';
          td.style.padding = '14px 16px';
          td.innerHTML =
            (row.altBlock.time
              ? `<div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--gold);opacity:.8;margin-bottom:2px;">${this.escapeHtml(row.altBlock.time)}</div>`
              : '') +
            `<div style="font-family:'Playfair Display',serif;color:var(--gold);font-size:13px;">${this.escapeHtml(row.altBlock.title)}</div>
             <div style="font-size:11px;color:var(--text-dim);margin-top:4px;">${this.escapeHtml(row.altBlock.sub)}</div>`;
          this.renderer.appendChild(tr, td);
        } else if (row.posterBatch) {
          const td = this.renderer.createElement('td');
          td.colSpan = day.rooms.length;
          td.innerHTML = this.renderPosterBatch(row.posterBatch);
          this.renderer.appendChild(tr, td);
        } else if (row.cells) {
          // Ponencias normales: una celda por sala
          day.rooms.forEach((room: string) => {
            const td = this.renderer.createElement('td');
            const items = (row.cells && row.cells[room]) || [];
            if (items.length === 0) {
              td.innerHTML = '<div class="cell empty">— cerrado —</div>';
            } else {
              const stack = this.renderer.createElement('div');
              this.renderer.addClass(stack, 'cell-stack');
              items.forEach((cell: any) => {
                const div = this.renderer.createElement('div');
                const status = cell.status || 'pendiente';
                div.className = 'cell ' + status + (cell.dup ? ' dup' : '');
                let meta =
                  STATUS_LABEL[status as keyof typeof STATUS_LABEL] || '';
                if (status === 'confirmado' || status === 'parcial') {
                  meta =
                    (status === 'confirmado' ? '🟢 ' : '🟡 ') +
                    (cell.authors ? cell.authors.split(',')[0] : '');
                } else if (status === 'pendiente') {
                  meta = '⚪ Pendiente' + (cell.dup ? ' · 🔁 dup' : '');
                } else if (status === 'tbd') {
                  meta = '🔵 Cupo TBD';
                }
                div.innerHTML = `<div class="title">${this.escapeHtml(cell.title)}</div><div class="meta">${this.escapeHtml(meta)}</div>`;
                this.listeners.push(
                  this.renderer.listen(div, 'click', () =>
                    this.openModal(room, cell.time || row.time, cell),
                  ),
                );
                this.renderer.appendChild(stack, div);
              });
              this.renderer.appendChild(td, stack);
            }
            this.renderer.appendChild(tr, td);
          });
        } else {
          // Sin datos: celdas vacías
          day.rooms.forEach(() => {
            const td = this.renderer.createElement('td');
            td.innerHTML = '<div class="cell empty">—</div>';
            this.renderer.appendChild(tr, td);
          });
        }
      }

      this.renderer.appendChild(tbody, tr);
    });

    this.renderer.appendChild(table, tbody);
    this.renderer.appendChild(wrap, table);
    this.renderer.appendChild(panel, wrap);

    this.attachAuditorioClickListeners(panel);
  }

  // ============================================================
  //  POSTER BATCH RENDER (IDÉNTICO AL HTML ORIGINAL)
  // ============================================================
  private renderPosterBatch(batch: any[]): string {
    const PSTATUS_ICON: any = {
      confirmado: '🟢',
      parcial: '🟡',
      pendiente: '⚪',
    };
    const hasSalon = batch.some((p: any) => p.salon);

    if (hasSalon) {
      const salones = [
        ...new Set(batch.map((p: any) => p.salon || 'Sin asignar')),
      ].sort() as string[];
      const cols = salones
        .map((s: string) => {
          const items = batch.filter((p: any) => p.salon === s);
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
      return `<div class="poster-merged-cell" style="display:flex;gap:0">${cols}</div>`;
    } else {
      const listHtml = batch
        .map(
          (p: any) =>
            `<div class="p-item">${PSTATUS_ICON[p.status] || ''} <b>${this.escapeHtml(p.title)}</b><br>${this.escapeHtml(p.authors)}${p.note ? `<br><i>${this.escapeHtml(p.note)}</i>` : ''}</div>`,
        )
        .join('');
      return `<div class="poster-merged-cell"><div class="pm-title">${batch.length} pósters en exhibición</div><details><summary>Ver listado completo</summary><div class="poster-list">${listHtml}</div></details></div>`;
    }
  }

  // ============================================================
  //  SGC TD (IDÉNTICO AL HTML ORIGINAL)
  // ============================================================
  private createSgcTd(row: any): HTMLTableCellElement {
    const td = this.renderer.createElement('td');
    td.rowSpan = row.sgcSpan || 1;
    td.style.background = 'rgba(63,191,107,0.06)';
    td.style.borderRight = '2px solid var(--green)';
    td.style.verticalAlign = 'middle';
    td.style.textAlign = 'center';
    td.style.padding = '8px 4px';
    td.innerHTML = `<div style="font-family:'Playfair Display',serif;color:var(--green);font-size:11px;">${this.escapeHtml(row.sgcTitle || 'SGC')}</div>
      <div style="font-size:8px;color:var(--text-dim);margin-top:4px;line-height:1.25;">${this.escapeHtml(row.sgcDesc || 'Servicio Geológico Colombiano — programación propia, 1 salón de Bienestar')}</div>`;
    return td;
  }

  // ============================================================
  //  CLICK LISTENERS
  // ============================================================
  private attachAuditorioClickListeners(panel: HTMLElement): void {
    const items = panel.querySelectorAll('.au-item.clickable');
    items.forEach((item) => {
      const code = (item as HTMLElement).dataset['code'];
      if (code) {
        this.listeners.push(
          this.renderer.listen(item, 'click', () => this.openCharla(code)),
        );
      }
    });
  }

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
    const tabDescEl = root.querySelector('#tabDesc');
    if (tabDescEl) {
      tabDescEl.innerHTML = `<b>${this.escapeHtml(DAYS[idx].label)}</b> &mdash; ${DAYS[idx].sub}<br>${DAYS[idx].desc}`;
    }
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
    const modalEmail = modalBg.querySelector('#modalEmail') as HTMLElement;
    const modalDate = modalBg.querySelector('#modalDate') as HTMLElement;
    const modalNote = modalBg.querySelector('#modalNote') as HTMLElement;

    modalBadge.className = 'badge ' + cell.status;
    modalBadge.textContent =
      STATUS_LABEL[cell.status as keyof typeof STATUS_LABEL] || cell.status;
    modalTitle.textContent = cell.title;
    modalRoom.innerHTML = `<b>Salón / Hora:</b> ${this.escapeHtml(room)} · ${this.escapeHtml(time)}`;
    modalAuthors.innerHTML = cell.authors
      ? `<b>Autor(es):</b> ${this.escapeHtml(cell.authors)}`
      : '';
    modalEmail.innerHTML = cell.email
      ? `<b>Contacto:</b> ${this.escapeHtml(cell.email)}`
      : '';
    modalDate.innerHTML = cell.date
      ? `<b>Inscrito desde:</b> ${this.escapeHtml(cell.date)}`
      : '';
    modalNote.innerHTML = cell.note
      ? `<b>Nota:</b> ${this.escapeHtml(cell.note)}`
      : '';

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
        this.openModalFromCharla(day, cm, esMag, tbd);
        return;
      }
    }
  }

  private openModalFromCharla(
    day: any,
    cm: any,
    esMag: boolean,
    tbd: boolean,
  ): void {
    const root = this.officialRoot.nativeElement;
    const modalBg = root.querySelector('#modalBg') as HTMLElement;
    if (!modalBg) return;

    const modalBadge = modalBg.querySelector('#modalBadge') as HTMLElement;
    const modalTitle = modalBg.querySelector('#modalTitle') as HTMLElement;
    const modalRoom = modalBg.querySelector('#modalRoom') as HTMLElement;
    const modalAuthors = modalBg.querySelector('#modalAuthors') as HTMLElement;
    const modalEmail = modalBg.querySelector('#modalEmail') as HTMLElement;
    const modalDate = modalBg.querySelector('#modalDate') as HTMLElement;
    const modalNote = modalBg.querySelector('#modalNote') as HTMLElement;

    modalBadge.className = 'badge ' + (tbd ? 'tbd' : 'confirmado');
    modalBadge.textContent =
      (esMag ? 'Charla magistral' : 'Charla especial') + ' · ' + cm.code;
    modalTitle.textContent = cm.title;
    modalRoom.innerHTML = `<b>Día / Hora:</b> ${this.escapeHtml(day.label)} · ${this.escapeHtml(cm.time)} · Auditorio`;
    modalAuthors.innerHTML = `<b>Ponente:</b> ${this.escapeHtml(cm.speaker || 'Por confirmar')}${cm.org ? ` · ${this.escapeHtml(cm.org)}` : ''}`;
    modalEmail.innerHTML = '';
    modalDate.innerHTML = '';
    modalNote.innerHTML = cm.note
      ? `<b>Nota:</b> ${this.escapeHtml(cm.note)}`
      : '';

    this.renderer.addClass(modalBg, 'show');
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
