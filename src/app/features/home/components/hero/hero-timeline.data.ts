export interface HeroActivity {
  title: string;
  location: string;
  type: 'magistral' | 'especial' | 'ponencias' | 'panel' | 'actividad' | 'break' | 'almuerzo' | 'cierre';
}

export interface HeroTimeSlot {
  day: 'mie' | 'jue' | 'vie';
  dayLabel: string;
  date: string;
  start: string;
  end: string;
  activities: HeroActivity[];
}

export const EVENT_START = new Date('2026-08-19T08:00:00');
export const EVENT_END = new Date('2026-08-21T22:00:00');

export const HERO_TIMELINE: readonly HeroTimeSlot[] = [
  // ═══════════════════════════════════════════
  // MIÉRCOLES 19
  // ═══════════════════════════════════════════
  {
    day: 'mie', dayLabel: 'Miércoles 19 de Agosto', date: '2026-08-19',
    start: '08:00', end: '09:00',
    activities: [
      { title: 'Registro de asistentes', location: 'Vestíbulo', type: 'actividad' },
    ]
  },
  {
    day: 'mie', dayLabel: 'Miércoles 19 de Agosto', date: '2026-08-19',
    start: '09:00', end: '10:30',
    activities: [
      { title: 'Bienvenida y apertura del evento', location: 'Auditorio', type: 'actividad' },
    ]
  },
  {
    day: 'mie', dayLabel: 'Miércoles 19 de Agosto', date: '2026-08-19',
    start: '10:30', end: '11:10',
    activities: [
      { title: 'CM-1: ANH — Agencia Nacional de Hidrocarburos', location: 'Auditorio', type: 'magistral' },
      { title: 'Geolimpiadas — Competencia por equipos', location: 'Exterior', type: 'actividad' },
    ]
  },
  {
    day: 'mie', dayLabel: 'Miércoles 19 de Agosto', date: '2026-08-19',
    start: '11:10', end: '11:40',
    activities: [
      { title: 'Break — entrega primer refrigerio', location: 'Vestíbulo', type: 'break' },
      { title: 'Geolimpiadas — Competencia por equipos', location: 'Exterior', type: 'actividad' },
    ]
  },
  {
    day: 'mie', dayLabel: 'Miércoles 19 de Agosto', date: '2026-08-19',
    start: '11:40', end: '12:30',
    activities: [
      { title: 'CM-2: Socialización del anteproyecto de ley — CPG', location: 'Auditorio', type: 'magistral' },
      { title: 'Geolimpiadas — Competencia por equipos', location: 'Exterior', type: 'actividad' },
    ]
  },
  {
    day: 'mie', dayLabel: 'Miércoles 19 de Agosto', date: '2026-08-19',
    start: '12:30', end: '14:00',
    activities: [
      { title: 'Almuerzo libre', location: '', type: 'almuerzo' },
    ]
  },
  {
    day: 'mie', dayLabel: 'Miércoles 19 de Agosto', date: '2026-08-19',
    start: '14:00', end: '16:00',
    activities: [
      { title: 'CE-2: Charla especial', location: 'Auditorio', type: 'especial' },
      { title: 'CE-3: Collective Mining', location: 'Auditorio', type: 'especial' },
      { title: 'CE-11: Rocas y minerales industriales — Sumicol', location: 'Auditorio', type: 'especial' },
      { title: 'CE-10: Perforación diamantina — Coprocarbon', location: 'Auditorio', type: 'especial' },
      { title: 'Ponencias: 6 salas (201-206)', location: 'Salones 201-206', type: 'ponencias' },
      { title: '4 charlas especiales — Salón Pangea', location: 'Salón Pangea', type: 'especial' },
    ]
  },
  {
    day: 'mie', dayLabel: 'Miércoles 19 de Agosto', date: '2026-08-19',
    start: '16:00', end: '16:30',
    activities: [
      { title: 'Break — entrega segundo refrigerio', location: 'Vestíbulo', type: 'break' },
    ]
  },
  {
    day: 'mie', dayLabel: 'Miércoles 19 de Agosto', date: '2026-08-19',
    start: '16:30', end: '17:10',
    activities: [
      { title: 'CM-3: Petrología experimental — Distribución de elementos químicos', location: 'Auditorio', type: 'magistral' },
    ]
  },
  {
    day: 'mie', dayLabel: 'Miércoles 19 de Agosto', date: '2026-08-19',
    start: '17:10', end: '18:00',
    activities: [
      { title: 'Termales — evento de networking', location: 'Salida 6:00 PM', type: 'cierre' },
    ]
  },

  // ═══════════════════════════════════════════
  // JUEVES 20
  // ═══════════════════════════════════════════
  {
    day: 'jue', dayLabel: 'Jueves 20 de Agosto', date: '2026-08-20',
    start: '08:10', end: '09:10',
    activities: [
      { title: 'CE-4: La otra falla geológica — Comunidades y territorio', location: 'Auditorio', type: 'especial' },
      { title: 'CE-5: Charla especial', location: 'Auditorio', type: 'especial' },
      { title: 'Ponencias: 6 salas (201-206)', location: 'Salones 201-206', type: 'ponencias' },
    ]
  },
  {
    day: 'jue', dayLabel: 'Jueves 20 de Agosto', date: '2026-08-20',
    start: '09:10', end: '09:30',
    activities: [
      { title: 'Ponencias: 6 salas (201-206)', location: 'Salones 201-206', type: 'ponencias' },
    ]
  },
  {
    day: 'jue', dayLabel: 'Jueves 20 de Agosto', date: '2026-08-20',
    start: '09:30', end: '09:50',
    activities: [
      { title: 'Break — tercer refrigerio', location: 'Vestíbulo', type: 'break' },
    ]
  },
  {
    day: 'jue', dayLabel: 'Jueves 20 de Agosto', date: '2026-08-20',
    start: '09:50', end: '10:40',
    activities: [
      { title: 'CM-4: Inteligencia Artificial y redes sísmicas — Zona de subducción Ecuador-Colombia', location: 'Auditorio', type: 'magistral' },
    ]
  },
  {
    day: 'jue', dayLabel: 'Jueves 20 de Agosto', date: '2026-08-20',
    start: '10:40', end: '11:00',
    activities: [
      { title: 'Break — cuarto refrigerio', location: 'Vestíbulo', type: 'break' },
    ]
  },
  {
    day: 'jue', dayLabel: 'Jueves 20 de Agosto', date: '2026-08-20',
    start: '11:00', end: '12:30',
    activities: [
      { title: 'Panel de discusión: Gestión del Riesgo', location: 'Auditorio', type: 'panel' },
      { title: 'SGC — Jornada completa', location: 'Salón Gondwana', type: 'actividad' },
    ]
  },
  {
    day: 'jue', dayLabel: 'Jueves 20 de Agosto', date: '2026-08-20',
    start: '12:30', end: '14:00',
    activities: [
      { title: 'Almuerzo libre', location: '', type: 'almuerzo' },
    ]
  },
  {
    day: 'jue', dayLabel: 'Jueves 20 de Agosto', date: '2026-08-20',
    start: '14:00', end: '15:30',
    activities: [
      { title: 'Geología en Vivo', location: 'Auditorio', type: 'actividad' },
      { title: 'SGC — Continúa', location: 'Salón Gondwana', type: 'actividad' },
    ]
  },
  {
    day: 'jue', dayLabel: 'Jueves 20 de Agosto', date: '2026-08-20',
    start: '15:30', end: '16:10',
    activities: [
      { title: 'CM-5: La temperatura — factor subestimado en la interpretación estructural', location: 'Auditorio', type: 'magistral' },
    ]
  },
  {
    day: 'jue', dayLabel: 'Jueves 20 de Agosto', date: '2026-08-20',
    start: '16:10', end: '17:00',
    activities: [
      { title: 'CE-6: Elementos para entender el fracking en Colombia', location: 'Auditorio', type: 'especial' },
    ]
  },
  {
    day: 'jue', dayLabel: 'Jueves 20 de Agosto', date: '2026-08-20',
    start: '17:10', end: '18:20',
    activities: [
      { title: 'Sesión de pósters — 35 pósters', location: 'Salón Gondwana', type: 'actividad' },
    ]
  },

  // ═══════════════════════════════════════════
  // VIERNES 21
  // ═══════════════════════════════════════════
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '08:10', end: '09:10',
    activities: [
      { title: 'CE-7: Minerales estratégicos y transición energética', location: 'Auditorio', type: 'especial' },
      { title: 'CE-8: Caracterización de rezumaderos — Ecopetrol', location: 'Auditorio', type: 'especial' },
      { title: 'Ponencias: 6 salas (201-206)', location: 'Salones 201-206', type: 'ponencias' },
      { title: 'ACGGP — Jornada en la mañana', location: 'Edificio de Artes', type: 'actividad' },
    ]
  },
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '09:10', end: '09:40',
    activities: [
      { title: 'Ponencias: 6 salas (201-206)', location: 'Salones 201-206', type: 'ponencias' },
      { title: 'ACGGP — Continúa', location: 'Edificio de Artes', type: 'actividad' },
    ]
  },
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '09:40', end: '10:30',
    activities: [
      { title: 'CM-6: The Changing Role of Geosciences in the Energy Transition', location: 'Auditorio', type: 'magistral' },
    ]
  },
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '10:30', end: '11:00',
    activities: [
      { title: 'Break — quinto refrigerio', location: 'Vestíbulo', type: 'break' },
    ]
  },
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '11:00', end: '12:30',
    activities: [
      { title: 'Panel de discusión: Energías — ANH', location: 'Auditorio', type: 'panel' },
    ]
  },
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '12:30', end: '14:00',
    activities: [
      { title: 'Almuerzo libre', location: '', type: 'almuerzo' },
    ]
  },
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '14:00', end: '16:40',
    activities: [
      { title: 'SCG — Sociedad Colombiana de Geotecnia (11 charlas)', location: 'Edificio de Artes', type: 'actividad' },
      { title: 'Pósters — 58 pósters', location: 'Pangea + Gondwana', type: 'actividad' },
    ]
  },
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '14:20', end: '15:30',
    activities: [
      { title: 'SCG — Sociedad Colombiana de Geotecnia', location: 'Edificio de Artes', type: 'actividad' },
      { title: 'Sesión de pósters — Pangea + Gondwana', location: 'Salones Pangea y Gondwana', type: 'actividad' },
    ]
  },
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '15:30', end: '16:40',
    activities: [
      { title: 'SCG — Continúa', location: 'Edificio de Artes', type: 'actividad' },
    ]
  },
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '16:40', end: '17:20',
    activities: [
      { title: 'CM-7: Territorio, energía y decisiones — Las geociencias como brújula del Estado', location: 'Auditorio', type: 'magistral' },
    ]
  },
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '17:20', end: '19:20',
    activities: [
      { title: 'Evento de cierre', location: 'Auditorio', type: 'cierre' },
    ]
  },
  {
    day: 'vie', dayLabel: 'Viernes 21 de Agosto', date: '2026-08-21',
    start: '20:00', end: '23:00',
    activities: [
      { title: 'Fiesta final', location: '', type: 'cierre' },
    ]
  },
];
