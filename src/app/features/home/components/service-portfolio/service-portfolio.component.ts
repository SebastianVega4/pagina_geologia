import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Gem, Star, Award, ShieldCheck, Mail } from 'lucide-angular';

@Component({
  selector: 'app-service-portfolio',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './service-portfolio.component.html',
  styleUrl: './service-portfolio.component.scss'
})
export class ServicePortfolioComponent {
  readonly icons = { Gem, Star, Award, ShieldCheck, Mail };

  activeCategory: 'nacional' | 'grande' | 'internacional' = 'nacional';

  setCategory(category: 'nacional' | 'grande' | 'internacional') {
    this.activeCategory = category;
  }

  portfolioData = {
    nacional: {
      hint: 'Pymes, consultoras y empresas regionales. Ideal para empresas geotécnicas, laboratorios, distribuidoras de equipos y empresas del sector minero con operación regional.',
      tiers: [
        {
          name: 'Esmeralda',
          icon: 'Gem',
          featured: true,
          benefits: [
            'Stand exclusivo zona principal',
            'Charla o presentación propia',
            'Máxima visibilidad audiovisual',
            'Prioridad en cursos y ponencias',
            'Todo el nivel Platino incluido'
          ]
        },
        {
          name: 'Platino',
          icon: 'Star',
          benefits: [
            'Stand en lobby del evento',
            'Publicación destacada en RRSS',
            'Espacio preferencial en networking',
            'Material en kits de bienvenida',
            'Logo en piezas publicitarias'
          ]
        },
        {
          name: 'Oro',
          icon: 'Award',
          benefits: [
            'Mención en agradecimientos',
            'Material en kits de bienvenida',
            'Logo en piezas publicitarias',
            'Espacio en diapositivas'
          ]
        },
        {
          name: 'Cuarzo',
          icon: 'ShieldCheck',
          benefits: [
            'Logo en pieza digital grupal',
            'Material en espacios comunes',
            'Mención al cierre del evento'
          ]
        }
      ]
    },
    grande: {
      hint: 'Grandes empresas nacionales y multinacionales con operación en Colombia. Para empresas del sector energético, minero e hidrocarburos a gran escala.',
      tiers: [
        {
          name: 'Esmeralda',
          icon: 'Gem',
          featured: true,
          benefits: [
            'Stand exclusivo en zona principal del evento',
            'Charla o presentación promocional propia',
            'Logo en espacio audiovisual y en recordatorios',
            'Máxima visibilidad de marca durante los 7 días',
            'Prioridad en cursos y ponencias',
            'Todo el nivel Platino incluido'
          ]
        },
        {
          name: 'Platino',
          icon: 'Star',
          benefits: [
            'Stand en lobby de uno de los edificios',
            'Publicación destacada en redes sociales',
            'Espacio preferencial en networking e icebreaker',
            'Material en kits de bienvenida',
            'Logo en piezas publicitarias',
            'Espacio en diapositivas de presentaciones'
          ]
        }
      ]
    },
    internacional: {
      hint: 'International companies, software providers and multinationals operating in the Latin American geosciences market.',
      tiers: [
        {
          name: 'Emerald',
          icon: 'Gem',
          featured: true,
          benefits: [
            'Exclusive stand in the main event area',
            'Short promotional presentation or talk slot',
            'Logo in all audiovisual materials',
            'Maximum brand visibility across all 7 days',
            'Priority access in courses and keynotes',
            'All Platinum benefits included'
          ]
        },
        {
          name: 'Platinum',
          icon: 'Star',
          benefits: [
            'Featured social media posts',
            'Preferred space in networking area',
            'Stand in the lobby of one event building',
            'Acknowledgment mention during the event',
            'Promotional material in welcome kits',
            'Logo on presentation slides'
          ]
        }
      ]
    }
  };
}
