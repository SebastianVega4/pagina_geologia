import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Code, Cpu, User, Linkedin, Globe, Server, Palette } from 'lucide-angular';

@Component({
  selector: 'app-about-project',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about-project.component.html',
  styleUrl: './about-project.component.scss'
})
export class AboutProjectComponent {
  readonly icons = { Code, Cpu, User, Linkedin, Globe, Server, Palette };

  technologies = [
    {
      name: 'Angular 18+',
      description: 'Framework principal para una arquitectura escalable y reactiva.',
      icon: 'Globe'
    },
    {
      name: 'Tailwind CSS',
      description: 'Estilizado premium con un sistema de diseño moderno y responsivo.',
      icon: 'Palette'
    },
    {
      name: 'Lucide Icons',
      description: 'Iconografía optimizada y elegante para una mejor experiencia visual.',
      icon: 'Cpu'
    },
    {
      name: 'AOS (Animate On Scroll)',
      description: 'Animaciones fluidas activadas al hacer scroll para mayor dinamismo.',
      icon: 'Server'
    }
  ];

  openLinkedIn() {
    window.open('https://www.linkedin.com/in/johan-sebastian-vega-ruiz-b1292011b/', '_blank');
  }
}
