import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { AboutProjectComponent } from './features/about-project/about-project.component';
import { AboutComponent } from './features/home/components/about/about.component';
import { ScheduleComponent } from './features/home/components/schedule/schedule.component';
import { SpeakersComponent } from './features/home/components/speakers/speakers.component';
import { MapComponent } from './features/home/components/map/map.component';
import { GalleryComponent } from './features/home/components/gallery/gallery.component';
import { NewsComponent } from './features/home/components/news/news.component';
import { NewsDetailComponent } from './features/home/components/news/news-detail.component';
import { ContactComponent } from './features/home/components/contact/contact.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { GeolympiadsComponent } from './features/contests/geolympiads/geolympiads.component';
import { PhotographyComponent } from './features/contests/photography/photography.component';

import { RegistrationInfoComponent } from './features/home/components/registration/registration-info/registration-info.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    title: 'Inicio | XVII Semana Técnica de Geología',
    data: { description: 'Bienvenido a la XVII Semana Técnica de Geología, Ingeniería Geológica y Geociencias en la UPTC Sogamoso.' }
  },
  {
    path: 'inscripciones',
    component: RegistrationInfoComponent,
    title: 'Inscripciones | XVII Semana Técnica de Geología',
    data: { description: 'Instrucciones detalladas y tarifas para la inscripción a la XVII Semana Técnica.' }
  },
  { 
    path: 'evento', 
    component: AboutComponent, 
    title: 'El Evento | XVII Semana Técnica de Geología',
    data: { description: 'Conoce más sobre la XVII Semana Técnica de Geología y su impacto en las geociencias.' }
  },
  { 
    path: 'evento/portafolio', 
    component: PortfolioComponent, 
    title: 'Portafolio de Servicios | XVII Semana Técnica de Geología',
    data: { description: 'Consulta nuestro portafolio de servicios para la XVII Semana Técnica.' }
  },
  { 
    path: 'concursos/geolimpiadas', 
    component: GeolympiadsComponent, 
    title: 'Geolimpiadas | XVII Semana Técnica de Geología',
    data: { description: 'Participa en las Geolimpiadas de la XVII Semana Técnica de Geología.' }
  },
  { 
    path: 'concursos/fotografia', 
    component: PhotographyComponent, 
    title: 'Concurso de Fotografía | XVII Semana Técnica de Geología',
    data: { description: 'Información sobre el concurso de fotografía geológica.' }
  },
  { 
    path: 'cronograma', 
    component: ScheduleComponent, 
    title: 'Cronograma | XVII Semana Técnica de Geología',
    data: { description: 'Consulta la agenda completa de la XVII Semana Técnica de Geología.' }
  },
  { 
    path: 'conferencistas', 
    component: SpeakersComponent, 
    title: 'Conferencistas | XVII Semana Técnica de Geología',
    data: { description: 'Conoce a los expertos que nos acompañarán en esta edición.' }
  },
  { 
    path: 'ubicacion', 
    component: MapComponent, 
    title: 'Ubicación | XVII Semana Técnica de Geología',
    data: { description: 'Cómo llegar a la UPTC Sogamoso para participar en el evento.' }
  },
  { 
    path: 'galeria', 
    component: GalleryComponent, 
    title: 'Galería | XVII Semana Técnica de Geología',
    data: { description: 'Fotos y recuerdos de ediciones pasadas y momentos destacados.' }
  },
  { 
    path: 'noticias', 
    component: NewsComponent, 
    title: 'Noticias | XVII Semana Técnica de Geología',
    data: { description: 'Mantente al día con las últimas circulares y noticias del evento.' }
  },
  { 
    path: 'noticias/:id', 
    component: NewsDetailComponent, 
    title: 'Noticia | XVII Semana Técnica de Geología'
  },
  { 
    path: 'contacto', 
    component: ContactComponent, 
    title: 'Contacto | XVII Semana Técnica de Geología',
    data: { description: 'Ponte en contacto con el comité organizador.' }
  },
  { 
    path: 'acerca-de', 
    component: AboutProjectComponent, 
    title: 'Acerca de | XVII Semana Técnica de Geología'
  },
  { path: '**', redirectTo: '' }
];
