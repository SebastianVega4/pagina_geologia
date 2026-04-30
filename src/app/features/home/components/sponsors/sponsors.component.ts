import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss'
})
export class SponsorsComponent {
  sponsors = [
    { name: 'ARGOS', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Argos_logo.png' },
    { name: 'Geo Consultores', logo: 'assets/Geo_Consultores.png'}
    ];
}
