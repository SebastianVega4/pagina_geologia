import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Target, Eye, Users, HelpCircle, ChevronDown, ChevronUp } from 'lucide-angular';
import { MatomoService } from '../../../../core/services/matomo.service';
import { TrackClickDirective } from '../../../../shared/directives/track-click.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TrackClickDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  private matomo = inject(MatomoService);
  readonly icons = { Target, Eye, Users, HelpCircle, ChevronDown, ChevronUp };

  faqs = [
    {
      question: '¿Cuánto cuesta la inscripción?',
      answer: 'Estamos en la Etapa 3 de tarifas (vigente hasta el 18 de agosto): Estudiante $340.000 · Egresado/Posgrado $400.000 · Profesional $470.000 COP. La inscripción cubre los 3 días del evento magistral con todas las ponencias, pósters y espacios de networking. Los cursos y salidas de campo tienen costo adicional por separado. <a href="/inscripciones" class="text-brand-secondary font-bold hover:underline">Ver el detalle completo de tarifas</a>.',
      open: false
    },
    {
      question: '¿Debo ser estudiante de geología para asistir?',
      answer: 'No necesariamente. El evento es para toda la comunidad de geociencias: estudiantes de geología, ingeniería geológica, ingeniería de minas, geofísica e ingenierías afines. También es bienvenido cualquier profesional egresado del sector.',
      open: false
    },
    {
      question: '¿Cómo llego a Sogamoso? ¿Hay alojamiento disponible?',
      answer: 'Sogamoso está a ~3 horas de Bogotá por la vía Tunja. Hay varios buses diarios desde el Terminal de Transporte de Bogotá (Flota Sugamuxi, Libertadores). La sede es la UPTC Seccional Sogamoso (Calle 4 Sur #15-134). Para orientación sobre alojamiento escríbenos a <a href="mailto:xvii.semanatecnica@uptc.edu.co" class="text-brand-secondary font-bold hover:underline">xvii.semanatecnica@uptc.edu.co</a>.',
      open: false
    },
    {
      question: '¿Hasta cuándo puedo inscribirme?',
      answer: 'Las inscripciones ya están abiertas y cierran el <strong>18 de agosto de 2026</strong> o al agotarse los cupos, lo que ocurra primero. Estamos en la última etapa de tarifas — no habrá más aumentos, pero el cupo es limitado. <a href="https://forms.gle/pEavT8emjqy12rt36" target="_blank" rel="noopener" class="text-brand-secondary font-bold hover:underline">Inscríbete aquí</a>.',
      open: false
    },
    {
      question: '¿Las actividades son obligatorias todas? ¿Puedo inscribirme solo a parte del evento?',
      answer: 'Sí, puedes inscribirte solo al evento magistral (19–21 Ago), solo a los cursos o salidas de campo (17–18 y 22–23 Ago), o a la semana completa. Son actividades independientes — pagas solo por la actividad y su certificado, sin acceso a souvenirs ni beneficios del evento magistral.',
      open: false
    },
    {
      question: '¿La preinscripción me compromete a pagar?',
      answer: 'No. La preinscripción es completamente gratuita y sin compromiso. Solo sirve para que te avisemos cuando abran inscripciones formales y para asegurarte acceso prioritario al cupo. No se cobra nada hasta que el evento abra inscripciones oficialmente.',
      open: false
    },
    {
      question: '¿Entregan certificado de asistencia?',
      answer: 'Sí. Todos los asistentes al evento magistral reciben certificado digital de asistencia avalado por la UPTC Seccional Sogamoso. Los asistentes a cursos también reciben certificado por separado, con horas académicas especificadas.',
      open: false
    },
    {
      question: '¿Cómo puedo patrocinar el evento?',
      answer: 'Escríbenos directamente a <a href="mailto:xvii.semanatecnica@uptc.edu.co" class="text-brand-secondary font-bold hover:underline">xvii.semanatecnica@uptc.edu.co</a> con el asunto "Patrocinio XVII STG" o revisa nuestro <a href="/evento/portafolio" class="text-brand-secondary font-bold hover:underline">portafolio de patrocinios</a>. Tenemos opciones desde $1.000.000 COP hasta paquetes premium para empresas grandes e internacionales.',
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
    this.matomo.trackEvent('Event', 'faq_toggle', this.faqs[index].question.slice(0, 80));
  }
}
