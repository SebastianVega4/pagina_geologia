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
      name: 'Tomas Cuesta',
      image: 'assets/Organizadores del evento estudiantes/Líder Comité Institucional.JPG'
    }
  ];

  members = [
    { name: 'UPTC - Facultad de Seccional Sogamoso', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHWDTNkGpDrEFH_Z-gUUsC7mHgih0X8Gc2Xw&s' },
    { name: 'Escuela de Ingeniería Geológica', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcdflFJKcrAfJ_GzdxbkhfxbxiXAyNBCJEsw&s' },
    { name: 'Capítulo Estudiantil ACGP - UPTC', logo: 'data:image/jpeg;base64,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' },
  ];
}
