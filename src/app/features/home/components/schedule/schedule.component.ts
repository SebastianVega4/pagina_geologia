import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Calendar, Clock, MapPin, ChevronRight, Image } from 'lucide-angular';

interface ScheduleItem {
  time: string;
  activity: string;
  speaker?: string;
  location: string;
}

interface DaySchedule {
  date: string;
  label: string;
  items: ScheduleItem[];
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
  readonly icons = { Calendar, Clock, MapPin, ChevronRight, Image };
  
  activeDayIndex = 0;

  schedule: DaySchedule[] = [
    {
      date: '25 mar 2026',
      label: 'Día 1: Apertura texto...',
      items: [
        { time: '08:00 AM', activity: 'Actividad', location: 'Locacion' },
        { time: '09:30 AM', activity: 'Actividad', speaker: 'Speaker/Rector UPTC', location: 'Locacion' },
        { time: '11:00 AM', activity: 'Conferencia Magistral: Geotectónica de los Andes', speaker: 'Dr. John Harrison (Canadá)', location: 'Auditorio Principal' },
        { time: '02:00 PM', activity: 'Sesión de Posters Técnicos', location: 'Hall Central' }
      ]
    },
    {
      date: '26 mar 2026',
      label: 'Día 2: Investigación',
      items: [
        { time: '08:30 AM', activity: 'Geofísica Aplicada a la Minería', speaker: 'Dra. Elena Ruiz (España)', location: 'Sala A' },
        { time: '10:30 AM', activity: 'Workshop: Modelamiento 3D de Yacimientos', speaker: 'Ing. Carlos Mendoza', location: 'Laboratorio de Cómputo' },
        { time: '03:00 PM', activity: 'Mesa Redonda: Transición Energética', location: 'Auditorio Principal' }
      ]
    },
    {
      date: '27 mar 2026',
      label: 'Día 3: Cierre',
      items: [
        { time: '07:00 AM', activity: 'Salida de Campo: Sinclinal de Sogamoso', location: 'Punto de Encuentro: Puerta Principal' },
        { time: '05:00 PM', activity: 'Ceremonia de Clausura y Cóctel', location: 'Jardines de la Universidad' }
      ]
    }
  ];

  setActiveDay(index: number) {
    this.activeDayIndex = index;
  }
}
