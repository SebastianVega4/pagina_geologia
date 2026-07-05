import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Calendar, Clock, MapPin, ChevronRight, Image, Download } from 'lucide-angular';

interface ScheduleBlock {
  time: string;
  title: string;
  type: 'ponencia' | 'magistral' | 'panel' | 'poster' | 'info';
  room?: string;
  speaker?: string;
  note?: string;
}

interface ScheduleDay {
  id: string;
  label: string;
  date: string;
  subtitle: string;
  description: string;
  blocks: ScheduleBlock[];
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
  readonly icons = { Calendar, Clock, MapPin, ChevronRight, Image, Download };

  activeTab = 'general';

  readonly days: ScheduleDay[] = [
    {
      id: 'general',
      label: 'Horario general',
      date: '19–21 ago 2026',
      subtitle: 'Vista general del programa',
      description: 'Bloques principales del congreso con ponencias, charlas magistrales, pósters y actividades de cierre.',
      blocks: [
        { time: '08:00', title: 'Registro e ingreso', type: 'info', room: 'Lobby principal', note: 'Inscripción, bienvenida y entrega de credenciales.' },
        { time: '09:30', title: 'Charla magistral de apertura', type: 'magistral', room: 'Auditorio', speaker: 'Ponente principal por confirmar' },
        { time: '11:00', title: 'Sesión de ponencias temáticas', type: 'ponencia', room: 'Salas 201–206', note: 'Cinco líneas temáticas en paralelo.' },
        { time: '14:30', title: 'Pósteres y networking', type: 'poster', room: 'Hall central', note: 'Presentación de posters y espacios de conversación.' },
        { time: '17:30', title: 'Panel de transición energética', type: 'panel', room: 'Auditorio', speaker: 'Investigadores y profesionales del sector' }
      ]
    },
    {
      id: 'miercoles',
      label: 'Miércoles',
      date: '19 ago',
      subtitle: 'Apertura y líneas de investigación',
      description: 'Jornada inaugural con geología aplicada, geoamenazas, geofísica y minería.',
      blocks: [
        { time: '08:00', title: 'Registro y bienvenida del comité', type: 'info', room: 'Lobby principal' },
        { time: '09:00', title: 'Inauguración oficial XVII STG', type: 'magistral', room: 'Auditorio principal', speaker: 'Comité organizador' },
        { time: '10:15', title: 'Geoamenazas y gestión del riesgo', type: 'ponencia', room: 'Sala 201', speaker: 'Equipo de geología aplicada' },
        { time: '11:30', title: 'Geofísica y tecnologías emergentes', type: 'ponencia', room: 'Sala 202', speaker: 'Investigadores UPTC' },
        { time: '15:00', title: 'Sesión de pósters', type: 'poster', room: 'Hall central', note: 'Exposición de trabajos estudiantiles y profesionales.' }
      ]
    },
    {
      id: 'jueves',
      label: 'Jueves',
      date: '20 ago',
      subtitle: 'Talleres y trabajo en salas temáticas',
      description: 'Día dedicado a talleres, charlas magistrales y participación activa en las salas.',
      blocks: [
        { time: '08:30', title: 'Charla magistral: recursos y transición', type: 'magistral', room: 'Auditorio', speaker: 'Ponente invitado' },
        { time: '10:00', title: 'Paleontología y patrimonio geológico', type: 'ponencia', room: 'Sala 204', speaker: 'Grupo de investigación' },
        { time: '12:00', title: 'Taller de análisis de datos geológicos', type: 'info', room: 'Sala 206', note: 'Actividad práctica guiada.' },
        { time: '14:30', title: 'Panel: minería, energía y sostenibilidad', type: 'panel', room: 'Auditorio', speaker: 'Representantes de la industria y academia' },
        { time: '16:30', title: 'Cierre de jornada técnica', type: 'info', room: 'Hall central', note: 'Espacio abierto para preguntas y networking.' }
      ]
    },
    {
      id: 'viernes',
      label: 'Viernes',
      date: '21 ago',
      subtitle: 'Cierre y premiación',
      description: 'Última jornada con ponencias de cierre, reconocimiento de trabajos y ceremonia final.',
      blocks: [
        { time: '08:30', title: 'Ponencias de cierre', type: 'ponencia', room: 'Salas 201–206', note: 'Casos de aplicación y resultados de investigación.' },
        { time: '10:45', title: 'Mesa de empleabilidad y oportunidades', type: 'panel', room: 'Auditorio', speaker: 'Empresas del sector y entidades aliadas' },
        { time: '12:30', title: 'Premiación de mejores trabajos', type: 'info', room: 'Auditorio principal' },
        { time: '14:00', title: 'Charla magistral final', type: 'magistral', room: 'Auditorio', speaker: 'Conductor del cierre' },
        { time: '16:00', title: 'Cierre institucional', type: 'info', room: 'Auditorio principal', note: 'Palabras finales del comité organizador.' }
      ]
    }
  ];

  get activeDay(): ScheduleDay {
    return this.days.find((day) => day.id === this.activeTab) ?? this.days[0];
  }

  setActiveTab(id: string): void {
    this.activeTab = id;
  }
}
