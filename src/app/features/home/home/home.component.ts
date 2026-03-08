import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../components/hero/hero.component';
import { AboutComponent } from '../components/about/about.component';
import { DownloadsComponent } from '../components/downloads/downloads.component';
import { ScheduleComponent } from '../components/schedule/schedule.component';
import { MapComponent } from '../components/map/map.component';
import { SpeakersComponent } from '../components/speakers/speakers.component';
import { GalleryComponent } from '../components/gallery/gallery.component';
import { NewsComponent } from '../components/news/news.component';
import { SponsorsComponent } from '../components/sponsors/sponsors.component';
import { ContactComponent } from '../components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    DownloadsComponent,
    ScheduleComponent,
    MapComponent,
    SpeakersComponent,
    GalleryComponent,
    NewsComponent,
    SponsorsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
