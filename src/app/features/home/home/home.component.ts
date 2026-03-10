import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../components/hero/hero.component';
import { DownloadsComponent } from '../components/downloads/downloads.component';
import { SponsorsComponent } from '../components/sponsors/sponsors.component';
import { AbstractsComponent } from '../components/abstracts/abstracts.component';
import { OrganizingCommitteeComponent } from '../components/organizing-committee/organizing-committee.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    HeroComponent, 
    AbstractsComponent,
    DownloadsComponent, 
    OrganizingCommitteeComponent,
    SponsorsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent { }
