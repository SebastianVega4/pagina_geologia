import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Calendar, Clock, MapPin, ChevronRight, Image, Download } from 'lucide-angular';

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
  readonly icons = { Calendar, Clock, MapPin, ChevronRight, Image, Download };
  
  activeDayIndex = 0;

  schedule: DaySchedule[] = [
    {
      date: '17 – 18 Ago',
      label: 'Pre-semana: Cursos y Salidas',
      items: [
        { time: 'Todo el día', activity: 'Cursos técnicos especializados', location: 'Instalaciones UPTC' },
        { time: 'Mañana', activity: 'Salida de campo — zona norte de Boyacá', location: 'Zona Norte' },
        { time: 'Tarde', activity: 'Reconocimiento de formaciones geológicas', location: 'Zona Norte' }
      ]
    },
    {
      date: '19 Ago',
      label: 'Día 1: Magistral',
      items: [
        { time: '08:00 AM', activity: 'Registro e icebreaker de bienvenida', location: 'Lobby Principal' },
        { time: '10:00 AM', activity: 'Inauguración oficial XVII STG', location: 'Auditorio Principal' },
        { time: '11:00 AM', activity: 'Conferencia magistral de apertura', location: 'Auditorio Principal' },
        { time: '02:00 PM', activity: 'Panel: Geología y transición energética en Colombia', location: 'Auditorio Principal' },
        { time: '07:00 PM', activity: 'Networking nocturno — Cocktail de bienvenida', location: 'Zona Lounge' }
      ]
    },
    {
      date: '20 Ago',
      label: 'Día 2: Talleres',
      items: [
        { time: '07:30 AM', activity: 'Salida de campo — Corredor minero de Boyacá', location: 'Corredor Minero' },
        { time: '02:00 PM', activity: 'Talleres técnicos paralelos (elige 2 de 6)', location: 'Salones Técnicos' },
        { time: '05:30 PM', activity: 'Sesión de pósters — investigación estudiantil', location: 'Hall Central' }
      ]
    },
    {
      date: '21 Ago',
      label: 'Día 3: Cierre',
      items: [
        { time: '09:00 AM', activity: 'Ponencias finales — proyectos aplicados', location: 'Sala A' },
        { time: '12:00 PM', activity: 'Mesa de empleabilidad — empresas del sector', location: 'Hall Central' },
        { time: '03:00 PM', activity: 'Ceremonia de cierre y premiación', location: 'Auditorio Principal' }
      ]
    },
    {
      date: '22 – 23 Ago',
      label: 'Post-semana: Salidas',
      items: [
        { time: 'Todo el día', activity: 'Salida geológica especial — Región carbonífera', location: 'Región Carbonífera' },
        { time: 'Todo el día', activity: 'Visita técnica a operación minera activa', location: 'Mina Operativa' }
      ]
    }
  ];

  setActiveDay(index: number) {
    this.activeDayIndex = index;
  }
}
