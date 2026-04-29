import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../components/hero/hero.component';
import { DownloadsComponent } from '../components/downloads/downloads.component';
import { SponsorsComponent } from '../components/sponsors/sponsors.component';
import { AbstractsComponent } from '../components/abstracts/abstracts.component';
import { OrganizingCommitteeComponent } from '../components/organizing-committee/organizing-committee.component';
import { RokoComponent } from '../components/roko/roko.component';
import { AudienceComponent } from '../components/audience/audience.component';
import { ReasonsComponent } from '../components/reasons/reasons.component';
import { TestimonialsComponent } from '../components/testimonials/testimonials.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { MapComponent } from '../components/map/map.component';
import { ServicePortfolioComponent } from '../components/service-portfolio/service-portfolio.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    RokoComponent,
    AudienceComponent,
    ReasonsComponent,
    TestimonialsComponent,
    RegistrationComponent,
    AbstractsComponent,
    DownloadsComponent,
    OrganizingCommitteeComponent,
    SponsorsComponent,
    MapComponent,
    ServicePortfolioComponent
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent { }
