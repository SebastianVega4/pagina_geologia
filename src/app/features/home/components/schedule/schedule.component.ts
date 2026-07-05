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
  }

  ngOnDestroy(): void {
    this.listeners.forEach((listener) => listener());
  }

  // ============================================================
  //  RENDER PRINCIPAL
  // ============================================================
  private renderSchedule(): void {
    const tabsEl = this.officialRoot.nativeElement.querySelector('#tabs');
    const panelsEl = this.officialRoot.nativeElement.querySelector('#panels');

    if (!tabsEl || !panelsEl) return;

    DAYS.forEach((day, idx) => {
      // --- TAB ---
      const btn = this.renderer.createElement('button');
      this.renderer.addClass(btn, 'tab-btn');
      if (idx === 0) this.renderer.addClass(btn, 'active');
      btn.textContent = day.label;
      this.listeners.push(
        this.renderer.listen(btn, 'click', () => this.selectDay(idx)),
      );
      this.renderer.appendChild(tabsEl, btn);

      // --- PANEL ---
      const panel = this.renderer.createElement('div');
      this.renderer.addClass(panel, 'day-panel');
      if (idx === 0) this.renderer.addClass(panel, 'active');
      this.renderer.setAttribute(panel, 'id', 'panel-' + day.id);

      if (day.type === 'dashboard') {
        // Vista "Horario General" - la cuadrícula grande
        panel.innerHTML = this.renderHorarioGrid();
      } else {
        // Vista de día específico con tabla
        panel.innerHTML = this.renderDayTable(day);
      }
      this.renderer.appendChild(panelsEl, panel);
    });

    this.selectDay(0);
    this.attachCellClickListeners();
  }

  // ============================================================
  //  HORARIO GENERAL - CUADRICULA COMPLETA (como en el guía)
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

    // Genera bloques de charlas magistrales desde los datos
    const cmBlks = (
      col: number | [number, number],
      dayId: string,
      excludeCodes?: string[],
    ) => {
      const exc = new Set(excludeCodes || []);
      const day = DAYS.find((d) => d.id === dayId);
      if (!day || !('rows' in day) || !day.rows) return '';
      return (day.rows as any[])
        .flatMap((row: any) =>
          (row.auditorio?.cms || []).map((cm: any) => {
            if (exc.has(cm.code)) return '';
            const pts = cm.time.split(/[^\d:]+/);
            const [t1, t2] = [pts[0], pts[1]];
            if (!t1 || !t2) return '';
            const cs = Array.isArray(col)
              ? `${col[0]} / span ${col[1]}`
              : `${col}`;
            const spOk = cm.speaker && cm.speaker !== 'Por confirmar';
            const title = cm.title;
            return `<div class="hblk hb-cm" style="grid-column:${cs};grid-row:${r(t1)}/${r(t2)};justify-content:flex-start;align-items:flex-start;text-align:left;">
          <div class="ht" style="width:100%;text-align:left">${fmt(t1)}\u2009\u2013\u2009${fmt(t2)}</div>
          <div style="font-size:7px;opacity:.4;font-family:'DM Mono',monospace;letter-spacing:.2px;margin-bottom:1px">${this.escapeHtml(cm.code)}</div>
          <div style="font-size:9px;font-weight:700;line-height:1.25;color:var(--amber)">${this.escapeHtml(title)}</div>
          ${spOk ? `<div style="font-size:7.5px;opacity:.6;font-style:italic;margin-top:2px;line-height:1.2">${this.escapeHtml(cm.speaker)}</div>` : ''}
        </div>`;
          }),
        )
        .join('');
    };

    const GC = '55px 1fr 1fr 1fr 1fr 1fr 1fr 1fr';
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
    ];
    const tlHtml = tls
      .map(
        (t) => `<div style="grid-column:1;grid-row:${r(t)}/${r(t) + 10};
    font-family:'DM Mono',monospace;font-size:9px;color:var(--text-dim);
    display:flex;align-items:flex-start;justify-content:flex-end;
    padding-right:6px;padding-top:2px;border-right:1px solid var(--border);">${t}</div>`,
      )
      .join('');

    // ── MIERCOLES cols 2=CMs·Actividades · 3=Posters·Ponencias ──────────────────────
    const mie = [
      blk(
        [2, 2],
        '8:00',
        '9:00',
        'hb-reg',
        'REGISTRO',
        'Entrega primer refrigerio',
      ),
      blk(
        [2, 2],
        '9:00',
        '10:00',
        'hb-ap',
        'BIENVENIDA',
        'Apertura del evento',
      ),
      blk(2, '10:00', '12:30', 'hb-geo', 'GEOLIMPIADAS', ''),
      blk(3, '10:00', '12:30', 'hb-geo', 'POSTERS', '46 turnos · 2 salones'),
      blk([2, 7], '12:30', '14:00', 'hb-alm', 'ALMUERZO', ''),
      cmBlks(2, 'mie'),
      blk(3, '14:10', '15:40', 'hb-pon', 'PONENCIAS', '18 ponencias · 6 salas'),
      blk(
        [2, 2],
        '15:50',
        '16:20',
        'hb-brk',
        'BREAK',
        'Entrega segundo refrigerio',
      ),
      blk(3, '16:30', '18:00', 'hb-pon', 'PONENCIAS', '18 ponencias · 6 salas'),
      blk([2, 2], '18:00', '19:00', 'hb-cie', 'TERMALES', 'Máx. 7:00 PM'),
    ].join('');

    // ── SGC Servicio Geológico Colombiano (col 4) ───────────────────────────────────
    const sgc = [
      blk(
        4,
        '8:10',
        '12:30',
        'hb-sgc',
        'SGC',
        'Servicio Geológico Colombiano<br>1 salón Bienestar',
      ),
      blk(4, '14:00', '19:00', 'hb-sgc', 'SGC', ''),
    ].join('');

    // ── JUEVES cols 5=CMs·Actividades · 6=Posters·Ponencias ───────────────────────
    const jue = [
      cmBlks(5, 'jue'),
      blk(6, '8:10', '10:20', 'hb-geo', 'POSTERS', '31 turnos · 1 salón'),
      blk(
        [5, 2],
        '10:30',
        '11:00',
        'hb-brk',
        'BREAK',
        'Entrega tercer refrigerio',
      ),
      blk(
        [5, 2],
        '11:00',
        '12:30',
        'hb-pan',
        'GEOLOGÍA EN VIVO',
        'Dos Expertos, Un Viaje al Corazón de la Tierra',
      ),
      blk(
        [5, 2],
        '14:10',
        '15:40',
        'hb-pan',
        'PANEL - GESTIÓN DEL RIESGO',
        'Panel de Discusión',
      ),
      blk(
        [5, 2],
        '15:50',
        '16:20',
        'hb-brk',
        'BREAK',
        'Entrega cuarto refrigerio',
      ),
      blk(6, '16:30', '18:00', 'hb-pon', 'PONENCIAS', '18 ponencias · 6 salas'),
      blk([5, 2], '18:00', '18:40', 'hb-cie', 'CANELAZO', ''),
    ].join('');

    // ── VIERNES cols 7=CMs·Actividades · 8=Ponencias AM / SCG PM ─────────────
    const vie = [
      cmBlks(7, 'vie'),
      blk(8, '8:10', '10:30', 'hb-pon', 'PONENCIAS', '18 ponencias · 6 salas'),
      blk(
        [7, 2],
        '10:30',
        '11:00',
        'hb-brk',
        'BREAK',
        'Entrega quinto refrigerio',
      ),
      blk(
        [7, 2],
        '11:00',
        '12:30',
        'hb-pan',
        'PANEL · ANH',
        'Energías, territorio y decisiones',
      ),
      blk(
        8,
        '14:10',
        '16:20',
        'hb-scg',
        'SCG',
        'Sociedad Colombiana<br>de Geotecnia<br>1 salón Bienestar',
      ),
      blk(
        [7, 2],
        '16:20',
        '19:00',
        'hb-cie',
        'EVENTO DE CIERRE',
        '4:20 – 7:00 PM',
      ),
      blk([7, 2], '19:00', '19:30', 'hb-cie', 'FIESTA FINAL', '7:00 PM →'),
    ].join('');

    const hdrMain = `<div style="display:grid;grid-template-columns:${GC};
    background:var(--night-2);border-bottom:2px solid var(--border);min-width:840px;">
    <div class="hh">Hora</div>
    <div class="hh" style="grid-column:2/span 2">Miércoles 19 Ago</div>
    <div class="hh" style="grid-column:4/span 3">Jueves 20 Ago</div>
    <div class="hh" style="grid-column:7/span 2">Viernes 21 Ago</div>
  </div>`;

    const hdrSub = `<div style="display:grid;grid-template-columns:${GC};
    background:var(--night-2);border-bottom:1px solid var(--border);min-width:840px;">
    <div></div>
    <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--amber);opacity:.8">Charlas Magistrales</div>
    <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--teal);opacity:.8">Pósters · Ponencias</div>
    <div class="hh" style="font-size:6.5px;padding:3px 3px;letter-spacing:0;color:var(--green);opacity:.8;line-height:1.3;">SERVICIO<br>GEOLÓGICO<br>COLOMBIANO</div>
    <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--amber);opacity:.8">Charlas Magistrales</div>
    <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--teal);opacity:.8">Pósters · Ponencias</div>
    <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--amber);opacity:.8">Charlas Magistrales</div>
    <div class="hh" style="font-size:7.5px;padding:3px 5px;letter-spacing:0;color:var(--teal);opacity:.8">Ponencias · SCG PM</div>
  </div>`;

    return `<div style="overflow-x:auto;border:1px solid var(--border);border-radius:8px;">
    ${hdrMain}${hdrSub}
    <div style="display:grid;grid-template-columns:${GC};
      grid-template-rows:repeat(700,2px);position:relative;min-width:840px;">
      ${tlHtml}${mie}${sgc}${jue}${vie}
    </div>
  </div>`;
  }

  // ============================================================
  //  TABLA DE DÍA ESPECÍFICO (como en el guía)
  // ============================================================
  private renderDayTable(day: any): string {
    const sgcCol = day.sgcColumn
      ? `<th style="width:64px;background:rgba(63,191,107,0.08);color:var(--green);font-size:9px;">SGC</th>`
      : '';

    const header = `
      <div class="grid-wrap">
        <table class="cal">
          <thead>
            <tr>
              <th class="time-col">Hora</th>
              ${sgcCol}
              <th class="auditorio-col">Auditorio</th>
              ${day.rooms.map((r: string) => `<th><div class="room-name">${this.escapeHtml(r)}</div><div class="room-theme">${this.escapeHtml((day.themes || {})[r] || '')}</div></th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${day.rows.map((row: any) => this.renderTableRow(row, day)).join('')}
          </tbody>
        </table>
      </div>`;
    return header;
  }

  // ============================================================
  //  FILA DE TABLA (info, panel, block)
  // ============================================================
  private renderTableRow(row: any, day: any): string {
    const sgcCol = day.sgcColumn;

    // --- INFO ROW ---
    if (row.type === 'info') {
      let sgcTd = '';
      if (sgcCol) {
        if (row.sgc === 'start') {
          sgcTd = `<td rowspan="${row.sgcSpan || 1}" style="background:rgba(63,191,107,0.06);border-right:2px solid var(--green);vertical-align:middle;text-align:center;padding:8px 4px;">
            <div style="font-family:'Playfair Display',serif;color:var(--green);font-size:11px;">SGC</div>
            <div style="font-size:8px;color:var(--text-dim);margin-top:4px;line-height:1.25;">Servicio Geológico Colombiano — programación propia, 1 salón de Bienestar</div>
          </td>`;
        } else if (row.sgc === 'continue') {
          sgcTd = ''; // cell cubierto por rowspan anterior
        } else {
          sgcTd = '<td></td>';
        }
      }
      const catClass = row.category
        ? `cat-${this.escapeHtml(row.category)}`
        : '';
      const colSpan = sgcCol
        ? row.sgc === 'continue'
          ? day.rooms.length + 1
          : day.rooms.length + 1
        : day.rooms.length + 2;
      // Ajuste: si es continue, ya hay un td menos
      const actualColSpan =
        sgcCol && row.sgc === 'continue'
          ? day.rooms.length + 1
          : sgcCol
            ? day.rooms.length + 1
            : day.rooms.length + 2;

      let cells = `<td class="time-cell">${this.escapeHtml(row.time)}</td>`;
      if (sgcCol && row.sgc === 'start') {
        cells += sgcTd;
      }
      const infoTd = `<td colspan="${actualColSpan}"><div class="info-title">${this.escapeHtml(row.title)}</div>${row.note ? `<div class="info-meta">${this.escapeHtml(row.note)}</div>` : ''}</td>`;
      cells += infoTd;

      return `<tr class="info-row ${catClass}">${cells}</tr>`;
    }

    // --- PANEL ROW ---
    if (row.type === 'panel') {
      let sgcTd = '';
      if (sgcCol && row.sgc === 'start') {
        sgcTd = `<td rowspan="${row.sgcSpan || 1}" style="background:rgba(63,191,107,0.06);border-right:2px solid var(--green);vertical-align:middle;text-align:center;padding:8px 4px;">
          <div style="font-family:'Playfair Display',serif;color:var(--green);font-size:11px;">SGC</div>
          <div style="font-size:8px;color:var(--text-dim);margin-top:4px;line-height:1.25;">Servicio Geológico Colombiano</div>
        </td>`;
      }
      const colSpan = sgcCol
        ? row.sgc === 'continue'
          ? day.rooms.length + 1
          : day.rooms.length + 1
        : day.rooms.length + 2;
      const actualColSpan =
        sgcCol && row.sgc === 'continue'
          ? day.rooms.length + 1
          : sgcCol
            ? day.rooms.length + 1
            : day.rooms.length + 2;

      let cells = `<td class="time-cell">${this.escapeHtml(row.time)}</td>`;
      if (sgcCol && row.sgc === 'start') cells += sgcTd;
      const panelTd = `<td colspan="${actualColSpan}">
        <div class="panel-title">${this.escapeHtml(row.title)}</div>
        <div class="panel-meta">${this.escapeHtml(row.note)}</div>
      </td>`;
      cells += panelTd;
      return `<tr class="panel-row">${cells}</tr>`;
    }

    // --- BLOCK ROW ---
    if (row.type === 'block') {
      let sgcTd = '';
      if (sgcCol && row.sgc === 'start') {
        sgcTd = `<td rowspan="${row.sgcSpan || 1}" style="background:rgba(63,191,107,0.06);border-right:2px solid var(--green);vertical-align:middle;text-align:center;padding:8px 4px;">
          <div style="font-family:'Playfair Display',serif;color:var(--green);font-size:11px;">SGC</div>
          <div style="font-size:8px;color:var(--text-dim);margin-top:4px;line-height:1.25;">Servicio Geológico Colombiano</div>
        </td>`;
      }

      let cells = `<td class="time-cell">${this.escapeHtml(row.time)}</td>`;
      if (sgcCol && row.sgc === 'start') cells += sgcTd;

      // Auditorio
      const aud = row.auditorio;
      let audHtml =
        '<div class="auditorio-cell"><div class="au-dash">—</div></div>';
      if (aud && aud.cms) {
        const items = aud.cms
          .map(
            (cm: any) => `
          <div class="au-item">
            <div class="au-code">${this.escapeHtml(cm.code)} · ${this.escapeHtml(cm.time)}</div>
            <div class="au-title">${this.escapeHtml(cm.title)}</div>
            <div class="au-speaker${cm.speaker === 'Por confirmar' ? ' au-tbd' : ''}">${this.escapeHtml(cm.speaker)}</div>
          </div>`,
          )
          .join('');
        audHtml = `<div class="auditorio-cell">${items}</div>`;
      } else if (aud && aud.special) {
        audHtml = `<div class="auditorio-cell"><div class="au-item"><div class="au-code">${this.escapeHtml(row.time)}</div><div class="au-title au-tbd">${this.escapeHtml(aud.text)}</div></div></div>`;
      }
      cells += `<td>${audHtml}</td>`;

      // AltBlock
      if (row.altBlock) {
        const td = `<td colspan="${day.rooms.length}" rowspan="${row.altBlock.span || 1}" style="background:rgba(212,160,23,0.08);border-left:3px solid var(--gold);vertical-align:middle;padding:14px 16px;">
          ${row.altBlock.time ? `<div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--gold);opacity:.8;margin-bottom:2px;">${this.escapeHtml(row.altBlock.time)}</div>` : ''}
          <div style="font-family:'Playfair Display',serif;color:var(--gold);font-size:13px;">${this.escapeHtml(row.altBlock.title)}</div>
          <div style="font-size:11px;color:var(--text-dim);margin-top:4px;">${this.escapeHtml(row.altBlock.sub)}</div>
        </td>`;
        cells += td;
        return `<tr class="block-row">${cells}</tr>`;
      }

      if (row.altBlockContinuation) {
        // No se añade celda, está cubierta por rowspan
        return '';
      }

      // PosterBatch
      if (row.posterBatch) {
        const PSTATUS_ICON: any = {
          confirmado: '🟢',
          parcial: '🟡',
          pendiente: '⚪',
        };
        const hasSalon = row.posterBatch.some((p: any) => p.salon);
        let posterHtml = '';
        if (hasSalon) {
          const salones = [
            ...new Set(
              (row.posterBatch as any[]).map((p: any) => p.salon || 'Sin asignar'),
            ),
          ].sort() as string[];
          posterHtml = salones
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
        } else {
          const listHtml = row.posterBatch
            .map(
              (p: any) =>
                `<div class="p-item">${PSTATUS_ICON[p.status] || ''} <b>${this.escapeHtml(p.title)}</b><br>${this.escapeHtml(p.authors)}${p.note ? `<br><i>${this.escapeHtml(p.note)}</i>` : ''}</div>`,
            )
            .join('');
          posterHtml = `<div class="pm-title">${row.posterBatch.length} pósters en exhibición</div><details><summary>Ver listado completo</summary><div class="poster-list">${listHtml}</div></details>`;
        }
        const td = `<td colspan="${day.rooms.length}"><div class="poster-merged-cell" style="${hasSalon ? 'display:flex;gap:0;' : ''}">${posterHtml}</div></td>`;
        cells += td;
        return `<tr class="block-row">${cells}</tr>`;
      }

      // Celdas normales por sala
      const roomCells = day.rooms
        .map((room: string) => {
          const items = (row.cells && row.cells[room]) || [];
          if (items.length === 0) {
            return '<td><div class="cell empty">— cerrado —</div></td>';
          }
          const stackHtml = items
            .map((cell: any) => {
              let meta =
                STATUS_LABEL[cell.status as keyof typeof STATUS_LABEL] || '';
              if (cell.status === 'confirmado' || cell.status === 'parcial') {
                meta =
                  (cell.status === 'confirmado' ? '🟢 ' : '🟡 ') +
                  (cell.authors ? cell.authors.split(',')[0] : '');
              } else if (cell.status === 'pendiente') {
                meta = '⚪ Pendiente' + (cell.dup ? ' · 🔁 dup' : '');
              } else if (cell.status === 'tbd') {
                meta = '🔵 Cupo TBD';
              }
              return `<div class="cell ${cell.status || 'pendiente'}${cell.dup ? ' dup' : ''}"
                       data-room="${this.escapeHtml(room)}"
                       data-time="${this.escapeHtml(cell.time || row.time)}"
                       data-title="${this.escapeHtml(cell.title)}"
                       data-authors="${this.escapeHtml(cell.authors)}"
                       data-status="${this.escapeHtml(cell.status)}">
                    <div class="title">${this.escapeHtml(cell.title)}</div>
                    <div class="meta">${this.escapeHtml(meta)}</div>
                 </div>`;
            })
            .join('');
          return `<td><div class="cell-stack">${stackHtml}</div></td>`;
        })
        .join('');
      cells += roomCells;
      return `<tr class="block-row">${cells}</tr>`;
    }

    return '';
  }

  // ============================================================
  //  CLICK EN CELDAS -> MODAL
  // ============================================================
  private attachCellClickListeners(): void {
    const cells =
      this.officialRoot.nativeElement.querySelectorAll('.cell[data-title]');
    cells.forEach((cell) => {
      this.listeners.push(
        this.renderer.listen(cell, 'click', (event) => {
          const target = event.currentTarget as HTMLElement;
          this.openModal(
            target.dataset['room'] || '',
            target.dataset['time'] || '',
            {
              title: target.dataset['title'] || '',
              authors: target.dataset['authors'] || '',
              status: target.dataset['status'] || 'pendiente',
            },
          );
        }),
      );
    });
  }

  // ============================================================
  //  SELECCIONAR DÍA (tabs)
  // ============================================================
  private selectDay(idx: number): void {
    const root = this.officialRoot.nativeElement;
    root.querySelectorAll('.tab-btn').forEach((b, i) => {
      b.classList.toggle('active', i === idx);
    });
    root.querySelectorAll('.day-panel').forEach((p, i) => {
      p.classList.toggle('active', i === idx);
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

    modalBadge.className = 'badge ' + cell.status;
    modalBadge.textContent =
      STATUS_LABEL[cell.status as keyof typeof STATUS_LABEL] || cell.status;
    modalTitle.textContent = cell.title;
    modalRoom.innerHTML = `<b>Salón / Hora:</b> ${this.escapeHtml(room)} · ${this.escapeHtml(time)}`;
    modalAuthors.innerHTML = cell.authors
      ? `<b>Autor(es):</b> ${this.escapeHtml(cell.authors)}`
      : '';

    this.renderer.addClass(modalBg, 'show');
  }

  private closeModal(): void {
    const modalBg = this.officialRoot.nativeElement.querySelector('#modalBg');
    if (modalBg) {
      this.renderer.removeClass(modalBg, 'show');
    }
  }

  // ============================================================
  //  TEMA DÍA / NOCHE
  // ============================================================
  private setupThemeToggle(): void {
    const root = this.officialRoot.nativeElement;
    const themeBtn = root.querySelector('#themeBtn');
    const modalBg = root.querySelector('#modalBg');
    const closeBtn = root.querySelector('.close');

    if (themeBtn) {
      this.listeners.push(
        this.renderer.listen(themeBtn, 'click', () => this.toggleTheme()),
      );
    }
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

    const saved = localStorage.getItem('stg-theme');
    if (saved === 'night') {
      this.applyNight();
    } else {
      this.applyDay();
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
    return (s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
