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
    { name: 'Geo Consultores', logo: 'assets/Geo_Consultores.png' },
    { name: 'Gobernación de Boyacá', logo: 'src\assets\Gobernacion_de_minas.png' },
    { name: 'Agencia Nacional de Hidrocarburos', logo: 'src/assets/ANH.png' },
    { name: 'Consejo Profesional de Geología', logo: 'src/assets/CPG_consejo_profesional_de_geologia.png' }
  ];
}
