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
    { name: 'SGC', logo: 'https://seeklogo.com/images/S/servicio-geologico-colombiano-logo-4E3853153A-seeklogo.com.png' },
    { name: 'ACGP', logo: 'https://acgp.org.co/wp-content/uploads/2021/03/LOGO-ACGP-2021.png' },
    { name: 'UPTC', logo: 'https://www.uptc.edu.co/export/sites/default/rectoria/documentos/logo_uptc.png' },
    { name: 'Sogamoso', logo: 'https://sogamoso-boyaca.gov.co/wp-content/uploads/2020/01/logo-sogamoso.png' },
    { name: 'MinEnergia', logo: 'https://www.minenergia.gov.co/documents/10180/Logo_Ministerio.png' }
  ];
}
