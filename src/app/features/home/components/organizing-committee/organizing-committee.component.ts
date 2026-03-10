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
  members = [
    { name: 'UPTC - Facultad de Seccional Sogamoso', logo: 'https://www.uptc.edu.co/export/sites/default/rectoria/documentos/logo_uptc.png' },
    { name: 'Escuela de Ingeniería Geológica', logo: 'https://www.uptc.edu.co/export/sites/default/rectoria/documentos/logo_uptc.png' },
    { name: 'Capítulo Estudiantil ACGP - UPTC', logo: 'https://acgp.org.co/wp-content/uploads/2021/03/LOGO-ACGP-2021.png' },
    { name: 'Grupo de Investigación en Geología', logo: 'https://www.uptc.edu.co/export/sites/default/rectoria/documentos/logo_uptc.png' }
  ];
}
