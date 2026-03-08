import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';
import { LucideAngularModule, ArrowLeft, Calendar, User, Clock } from 'lucide-angular';
import { Observable, map, tap } from 'rxjs';

interface Noticia {
  id: number;
  fecha: string;
  titulo: string;
  resumen: string;
  imagen_url: string;
  contenido: string;
}

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  template: `
    <article class="pt-32 pb-24 bg-white dark:bg-brand-dark transition-colors duration-300 min-h-screen">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Back Button -->
        <a routerLink="/noticias" class="inline-flex items-center gap-2 text-brand-secondary font-bold mb-12 hover:-translate-x-2 transition-transform cursor-pointer">
          <lucide-angular [img]="icons.ArrowLeft" class="w-5 h-5"></lucide-angular>
          Volver a noticias
        </a>

        @if (noticia$ | async; as n) {
          <!-- Header -->
          <header class="space-y-8 mb-16">
            <div class="space-y-4">
              <div class="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span class="flex items-center gap-2">
                  <lucide-angular [img]="icons.Calendar" class="w-4 h-4 text-brand-secondary"></lucide-angular>
                  {{ n.fecha | date:'longDate' }}
                </span>
                <span class="flex items-center gap-2">
                  <lucide-angular [img]="icons.User" class="w-4 h-4 text-brand-secondary"></lucide-angular>
                  Comité Organizador
                </span>
                <span class="flex items-center gap-2">
                  <lucide-angular [img]="icons.Clock" class="w-4 h-4 text-brand-secondary"></lucide-angular>
                  5 min de lectura
                </span>
              </div>
              <h1 class="text-4xl md:text-6xl font-black text-brand-primary dark:text-white leading-tight">
                {{ n.titulo }}
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 border-brand-secondary pl-6">
                {{ n.resumen }}
              </p>
            </div>

            <!-- Featured Image -->
            <div class="relative h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img [src]="n.imagen_url" [alt]="n.titulo" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </header>

          <!-- Content -->
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <div class="text-gray-700 dark:text-gray-300 leading-[1.8] space-y-6 text-lg">
              {{ n.contenido }}
              
              <!-- Placeholder for more content to make it look "detailed" -->
              <p>
                Este avance representa un hito significativo para el <strong>XVIII Congreso Nacional de Geología</strong>. 
                Sogamoso se prepara para recibir a expertos nacionales e internacionales en una jornada que promete 
                redefinir nuestra comprensión de las geociencias en el contexto actual.
              </p>
            </div>
          </div>
        } @else {
          <!-- Loading State -->
          <div class="flex flex-col items-center justify-center py-20 space-y-4">
             <div class="w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
             <p class="text-gray-500">Cargando noticia...</p>
          </div>
        }

      </div>
    </article>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class NewsDetailComponent implements OnInit {
  readonly icons = { ArrowLeft, Calendar, User, Clock };
  noticia$: Observable<Noticia | undefined> | undefined;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.noticia$ = this.http.get<Noticia[]>('assets/noticias.json').pipe(
      map(noticias => noticias.find(n => n.id === id)),
      tap(noticia => {
        if (noticia) {
          this.titleService.setTitle(`${noticia.titulo} | XVIII Congreso Geología`);
          this.metaService.updateTag({ name: 'description', content: noticia.resumen });
          this.metaService.updateTag({ property: 'og:title', content: noticia.titulo });
          this.metaService.updateTag({ property: 'og:description', content: noticia.resumen });
          this.metaService.updateTag({ property: 'og:image', content: noticia.imagen_url });
        }
      })
    );
  }
}
