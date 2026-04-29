import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Target, Eye, Users, HelpCircle, ChevronDown, ChevronUp } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  readonly icons = { Target, Eye, Users, HelpCircle, ChevronDown, ChevronUp };

  faqs = [
    {
      question: '¿Cuánto cuesta la inscripción?',
      answer: 'Las tarifas varían según la etapa de pago y categoría (Estudiante, Joven Profesional o Profesional). Puede consultar el detalle exacto en nuestra página de <a href="/inscripciones" class="text-brand-secondary font-bold hover:underline">Instrucciones de Inscripción</a>. La primera etapa inicia el 1 de mayo.',
      open: false
    },
    {
      question: '¿Debo ser estudiante de geología para asistir?',
      answer: 'No necesariamente. El evento está abierto a toda la comunidad de geociencias: ingeniería geológica, de minas, geofísica e ingenierías afines. También son bienvenidos profesionales egresados y entusiastas del sector.',
      open: false
    },
    {
      question: '¿Cómo llego a Sogamoso? ¿Hay alojamiento disponible?',
      answer: 'Sogamoso se encuentra a aproximadamente 3 horas de Bogotá. Contamos con guías de transporte y convenios con hoteles locales que ofrecerán tarifas preferenciales para los asistentes del evento.',
      open: false
    },
    {
      question: '¿Cuándo abren las inscripciones formales?',
      answer: 'La apertura oficial de la Primera Etapa es el 1 de mayo de 2026. Se recomienda realizar el proceso con anticipación para asegurar su cupo y acceder a los descuentos por etapa.',
      open: false
    },
    {
      question: '¿Las actividades son obligatorias todas?',
      answer: 'No, el asistente puede elegir participar en el evento magistral, en los cursos técnicos especializados o en las salidas de campo de forma independiente o conjunta, según su interés y disponibilidad.',
      open: false
    },
    {
      question: '¿La preinscripción me compromete a pagar?',
      answer: 'No. La preinscripción es una manifestación de interés que le permite recibir información prioritaria y asegurar un espacio en la lista de espera, pero el compromiso de pago solo se adquiere al formalizar el registro oficial.',
      open: false
    },
    {
      question: '¿Entregan certificado de asistencia?',
      answer: 'Sí. Se entregará certificación oficial avalada por la UPTC Seccional Sogamoso a los asistentes que cumplan con el porcentaje mínimo de participación en las actividades académicas.',
      open: false
    },
    {
      question: '¿Cómo puedo patrocinar el evento?',
      answer: 'Contamos con un <a href="/#service-portfolio" class="text-brand-secondary font-bold hover:underline">Porfolio de Servicios</a> con diferentes niveles de vinculación (Esmeralda, Platino, Oro y Cuarzo). Puede contactarnos directamente a xviisemanatecnica&#64;uptc.edu.co.',
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
