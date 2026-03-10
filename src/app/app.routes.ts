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

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'evento', component: AboutComponent, title: 'El Evento | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'evento/portafolio', component: PortfolioComponent, title: 'Portafolio de Servicios | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'concursos/geolimpiadas', component: GeolympiadsComponent, title: 'Geolimpiadas | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'concursos/fotografia', component: PhotographyComponent, title: 'Concurso de Fotografía | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'cronograma', component: ScheduleComponent, title: 'Cronograma | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'conferencistas', component: SpeakersComponent, title: 'Conferencistas | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'ubicacion', component: MapComponent, title: 'Ubicación | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'galeria', component: GalleryComponent, title: 'Galería | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'noticias', component: NewsComponent, title: 'Noticias | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'noticias/:id', component: NewsDetailComponent, title: 'Noticia | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'contacto', component: ContactComponent, title: 'Contacto | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: 'acerca-de', component: AboutProjectComponent, title: 'Acerca de | XVIII Semana Tecnicá. geologia, ingenieria geologica y geociencias.' },
  { path: '**', redirectTo: '' }
];
