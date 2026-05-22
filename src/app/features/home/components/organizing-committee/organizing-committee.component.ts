import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizing-committee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organizing-committee.component.html',
  styleUrl: './organizing-committee.component.scss'
})
export class OrganizingCommitteeComponent {
  docentes = [
    {
      role: 'Directora de la Escuela de Ingeniería Geológica',
      name: 'PhD Sandra Manosalva',
      image: 'assets/Organizadores del Evento Docentes/Directora de la Escuela de Ingeniería Geológica PhD Sandra Manosalva.JPG'
    },
    {
      role: 'Líder Comité de Docentes',
      name: 'PhD Jorge Mariño',
      image: 'assets/Organizadores del Evento Docentes/Líder Comité de Docentes PhD Jorge Mariño.JPG'
    },
    {
      role: 'Líder del Comité de Docentes',
      name: 'PhD Javier Idarraga',
      image: 'assets/Organizadores del Evento Docentes/Líder del Comité de Docentes PhD Javier Idarraga.JPG'
    }
  ];

  estudiantes = [
    {
      role: 'Presidenta',
      name: 'Angela Ramos',
      image: 'assets/Organizadores del evento estudiantes/Presidenta Angela Ramos.JPG'
    },
    {
      role: 'Representante de Ingeniería Geológica',
      name: 'Julián Robles',
      image: 'assets/Organizadores del evento estudiantes/Representante de Ingeniería Geológica Julián Robles.JPG'
    },
    {
      role: 'Vicepresidente y Secretario',
      name: 'Camilo Pedraza',
      image: 'assets/Organizadores del evento estudiantes/Camilo Pedraza. Vicepresidente y Secretario.jpg'
    },
    {
      role: 'Líder Comité Comunicaciones',
      name: 'Diego Acevedo',
      image: 'assets/Organizadores del evento estudiantes/Líder Comité Comunicaciones Diego Acevedo.JPG'
    },
    {
      role: 'Lider Comité Logística',
      name: 'Manuela Zapata',
      image: 'assets/Organizadores del evento estudiantes/Lider Comité Logística Manuela Zapata.JPG'
    },
    {
      role: 'Líder Comité Temáticos',
      name: 'Michelle Medina',
      image: 'assets/Organizadores del evento estudiantes/Líder Comité Temáticos Michelle Medina.JPG'
    },
    {
      role: 'Líder Comité Institucional',
      name: 'Ana Maria Castañeda',
      image: 'assets/Organizadores del evento estudiantes/Líder Comité Institucional Ana Maria Castañeda.jpeg'
    }
  ];

  members = [
    { name: 'UPTC', logo: 'assets/UPTC.jpeg' },
    { name: 'UPTC - Facultad de Seccional Sogamoso', logo: 'assets/Facultad Sogamoso.jpeg' },
    { name: 'Escuela de Ingeniería Geológica', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcdflFJKcrAfJ_GzdxbkhfxbxiXAyNBCJEsw&s' },
    { name: 'Capítulo Estudiantil ACGP - UPTC', logo: 'assets/ACGGP.png' },
    { name: 'Servicio Geológico Colombiano', logo: 'assets/Servicio_Geológico_Colombiano.png' },
    { name: 'Sociedad Colombiana de Geología', logo: 'assets/Sociedad_Colombiana_de_geologia.png' }
  ];
}
