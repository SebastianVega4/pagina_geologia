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

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio | Congreso Geología UPTC' },
  { path: 'evento', component: AboutComponent, title: 'El Evento | Congreso Geología UPTC' },
  { path: 'cronograma', component: ScheduleComponent, title: 'Cronograma | Congreso Geología UPTC' },
  { path: 'conferencistas', component: SpeakersComponent, title: 'Conferencistas | Congreso Geología UPTC' },
  { path: 'ubicacion', component: MapComponent, title: 'Ubicación | Congreso Geología UPTC' },
  { path: 'galeria', component: GalleryComponent, title: 'Galería | Congreso Geología UPTC' },
  { path: 'noticias', component: NewsComponent, title: 'Noticias | Congreso Geología UPTC' },
  { path: 'noticias/:id', component: NewsDetailComponent, title: 'Noticia | Congreso Geología UPTC' },
  { path: 'contacto', component: ContactComponent, title: 'Contacto | Congreso Geología UPTC' },
  { path: 'acerca-de', component: AboutProjectComponent, title: 'Acerca de | Congreso Geología UPTC' },
  { path: '**', redirectTo: '' }
];
