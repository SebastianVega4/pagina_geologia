import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Linkedin, Twitter, Globe } from 'lucide-angular';

interface Speaker {
  name: string;
  role: string;
  institution: string;
  bio: string;
  image: string;
  topic: string;
  thematicLine: string;
  socials: { linkedin?: string; twitter?: string; web?: string };
}

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './speakers.component.html',
  styleUrl: './speakers.component.scss'
})
export class SpeakersComponent {
  readonly icons = { Linkedin, Twitter, Globe };

  readonly thematicLines = [
    'ENERGÍAS Y RECURSOS MINERALES',
    'GEODINÁMICA',
    'GEOFÍSICA Y GEOQUÍMICA',
    'AMBIENTE, SOCIEDAD Y EDUCACIÓN',
    'INTELIGENCIA ARTIFICIAL Y SIG',
    'GEOLOGÍA HISTÓRICA Y ESTRATIGRAFÍA',
    'GEOTECNIA E HIDROGEOLOGÍA'
  ];

  speakers: Speaker[] = [
    {
      name: 'Jaime Checa Jiménez',
      role: 'Presidente ACGGP',
      institution: 'Asociación Colombiana de Geólogos y Geofísicos de la Energía',
      bio: 'Ingeniero Civil con especializaciones en Exploración Geofísica y Gerencia de Hidrocarburos. Con 35 años de carrera profesional como geofísico de exploración, se ha destacado por gestionar exitosamente grupos interdisciplinarios para adquisición de datos sísmicos.',
      image: 'assets/speakers/Jaime Checa Jiménez.jpeg',
      topic: 'Elementos para entender el fracking en Colombia',
      thematicLine: 'ENERGÍAS Y RECURSOS MINERALES',
      socials: { web: 'https://www.acggp.org/' }
    },
    {
      name: 'Flover Rodriguez-Portillo',
      role: 'Director Ejecutivo ACGGP',
      institution: 'Asociación Colombiana de Geólogos y Geofísicos de la Energía',
      bio: 'Geólogo, especialista en gestión energética y ambiental, máster en responsabilidad social corporativa. Motiva a la renovación de la industria y sus modelos de relacionamiento, promoviendo la transferencia de conocimiento.',
      image: 'assets/speakers/Flover Rodriguez Portillo.jpeg',
      topic: 'Territorio, energía y decisiones: las geociencias como brújula del Estado',
      thematicLine: 'ENERGÍAS Y RECURSOS MINERALES',
      socials: { web: 'https://www.acggp.org/' }
    },
    {
      name: 'Cesar Augusto Otálvaro sierra',
      role: 'Docente / Investigador',
      institution: 'Universidad Nacional de Colombia',
      bio: 'Profesional de antropología, maestra estudiosos urbano regionales y doctorado en geografia. Especialista en la interacción con comunidades y los retos sociales en proyectos de geociencias.',
      image: 'assets/speakers/Cesar Augusto Otálvaro sierra.jpg',
      topic: 'La otra falla geológica: nuestra relación con las comunidades y el ingreso a territorio',
      thematicLine: 'AMBIENTE, SOCIEDAD Y EDUCACIÓN',
      socials: { web: 'https://unal.edu.co/' }
    },
    {
      name: 'Danny José Useche Infante',
      role: 'PhD. en Ingeniería',
      institution: 'UPTC Sogamoso',
      bio: 'Doctor en ingeniería con hallazgos recientes sobre el comportamiento de cimentaciones profundas mejoradas mediante inyección de lechada (post grouting) y modelos probabilísticos.',
      image: 'assets/speakers/DANNY JOSE USECHE INFANTE.jpeg',
      topic: 'Pilotes con Inyección de Lechada: Modelos Físicos, Numéricos y Métodos Probabilísticos para Suelos Colapsables',
      thematicLine: 'GEOTECNIA E HIDROGEOLOGÍA',
      socials: { web: 'https://www.uptc.edu.co/' }
    },
    {
      name: 'Ivan Rodrigo Plata Arango',
      role: 'Ingeniero Geólogo',
      institution: 'Ecopetrol S.A.',
      bio: 'Magister en Geomatica y Especialista en SIG. Experto en caracterización de rezumaderos a partir de productos de sensores remotos y análisis de espectros de absorción.',
      image: 'assets/speakers/Ivan Rodrigo Plata Arango.jpeg',
      topic: 'Caracterización de rezumaderos a partir de productos de sensores remotos',
      thematicLine: 'INTELIGENCIA ARTIFICIAL Y SIG',
      socials: { web: 'https://www.ecopetrol.com.co/' }
    }
  ];

  getSpeakersByLine(line: string): Speaker[] {
    return this.speakers.filter(s => s.thematicLine === line);
  }
}
