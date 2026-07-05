import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss',
})
export class SponsorsComponent {
  sponsors = [
    {
      name: 'Agencia Nacional de Hidrocarburos',
      logo: 'assets/INSTITUCIONES ALIADAS/AgenciaNacionalDeHidrocarburos.png',
    },
    {
      name: 'Consejo Profesional de Geología',
      logo: 'assets/INSTITUCIONES ALIADAS/CPG_consejo_profesional_de_geologia.png',
    },
    {
      name: 'ARGOS',
      logo: 'assets/INSTITUCIONES ALIADAS/ARGOS.png',
    },
    {
      name: 'Gobernación de Boyacá',
      logo: 'assets/INSTITUCIONES ALIADAS/GobernacionDeBoyacaDeMinas.png',
    },
    {
      name: 'Geo Consultores',
      logo: 'assets/INSTITUCIONES ALIADAS/Geo_Consultores.png',
    },
    {
      name: 'Concrelab',
      logo: 'assets/INSTITUCIONES ALIADAS/ConcreLab.png',
    },
    {
      name: 'SUMICOL',
      logo: 'assets/INSTITUCIONES ALIADAS/SUMICOL.jpeg',
    },
    {
      name: 'La GeoTienda',
      logo: 'assets/INSTITUCIONES ALIADAS/La GeoTienda.png',
    },
    {
      name: 'MILPA',
      logo: 'assets/INSTITUCIONES ALIADAS/MILPA.png',
    },
    {
      name: 'PetroShale',
      logo: 'assets/INSTITUCIONES ALIADAS/PetroShale.png',
    },
  ];
}
