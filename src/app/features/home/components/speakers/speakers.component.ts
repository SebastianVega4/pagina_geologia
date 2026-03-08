import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Linkedin, Twitter, Globe } from 'lucide-angular';

interface Speaker {
  name: string;
  role: string;
  institution: string;
  bio: string;
  image: string;
  topic: string;
  socials: { linkedin?: string; twitter?: string; web?: string };
}

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './speakers.component.html',
  styleUrl: './speakers.component.scss'
})
export class SpeakersComponent {
  readonly icons = { Linkedin, Twitter, Globe };

  speakers: Speaker[] = [
    {
      name: 'Dr. John Harrison',
      role: 'Director de Geociencias',
      institution: 'University of Toronto (Canadá)',
      bio: 'Líder mundial en tectónica de placas y evolución de márgenes continentales en Suramérica.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
      topic: 'Geotectónica de los Andes Septentrionales',
      socials: { linkedin: '#', twitter: '#', web: '#' }
    },
    {
      name: 'Dra. Elena Ruiz',
      role: 'Investigadora Principal',
      institution: 'Instituto Geológico y Minero (España)',
      bio: 'Especialista en hidrogeología y gestión sostenible de acuíferos en zonas de alta montaña.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop',
      topic: 'Resiliencia Hídrica en el Altiplano Boyacense',
      socials: { linkedin: '#', web: '#' }
    },
    {
      name: 'MSc. Carlos Mendoza',
      role: 'Consultor Senior',
      institution: 'PetroExplora Corp.',
      bio: 'Líder en modelamiento geológico 3D para la industria de hidrocarburos y minería.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop',
      topic: 'Nuevas Fronteras en la Exploración de Hidrocarburos',
      socials: { linkedin: '#' }
    },
    {
      name: 'Dra. Sofia Chen',
      role: 'Profesora Asociada',
      institution: 'National University of Singapore',
      bio: 'Pionera en la aplicación de IA para el mapeo mineralógico automatizado.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop',
      topic: 'Inteligencia Artificial aplicada al Mapeo de Campo',
      socials: { linkedin: '#', twitter: '#' }
    }
  ];
}
