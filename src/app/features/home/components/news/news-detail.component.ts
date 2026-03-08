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
    <article class="pt-24 pb-32 bg-slate-50 dark:bg-brand-dark transition-colors duration-300 min-h-screen overflow-hidden">
      
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Navigation Header -->
        <nav class="flex items-center justify-between mb-12" data-aos="fade-down">
          <a routerLink="/noticias" 
             class="group flex items-center gap-3 text-brand-primary dark:text-gray-300 font-bold hover:text-brand-secondary dark:hover:text-brand-secondary transition-all">
            <div class="w-10 h-10 rounded-full bg-white dark:bg-brand-primary shadow-md flex items-center justify-center group-hover:-translate-x-1 transition-transform">
              <lucide-angular [img]="icons.ArrowLeft" class="w-5 h-5"></lucide-angular>
            </div>
            <span>Volver al listado</span>
          </a>
          
          <div class="flex items-center gap-2">
            <span class="text-xs font-black text-brand-secondary uppercase tracking-[0.2em]">Prensa XVIII Congreso</span>
          </div>
        </nav>

        @if (noticia$ | async; as n) {
          <!-- Hero Section: Split Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            <!-- Left: Text Content -->
            <div class="lg:col-span-7 space-y-6" data-aos="fade-right">
              <div class="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-brand-secondary">
                <span class="px-3 py-1 bg-brand-secondary/10 rounded-full border border-brand-secondary/20">Geociencias</span>
                <span class="flex items-center gap-1.5 text-gray-400">
                  <lucide-angular [img]="icons.Calendar" class="w-3.5 h-3.5"></lucide-angular>
                  {{ n.fecha | date:'longDate' }}
                </span>
              </div>
              
              <h1 class="text-4xl md:text-6xl font-black text-brand-primary dark:text-white leading-tight">
                {{ n.titulo }}
              </h1>
              
              <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {{ n.resumen }}
              </p>

              <div class="flex items-center gap-4 pt-4">
                <div class="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold ring-4 ring-brand-secondary/20">
                  CG
                </div>
                <div>
                  <p class="text-sm font-bold text-brand-primary dark:text-gray-200">Comité de Comunicaciones</p>
                  <p class="text-xs text-gray-500">Publicado hace 2 días • 5 min lectura</p>
                </div>
              </div>
            </div>

            <!-- Right: Image with Frame -->
            <div class="lg:col-span-5" data-aos="zoom-in" data-aos-delay="200">
              <div class="relative group">
                <div class="absolute -inset-4 bg-gradient-to-tr from-brand-secondary to-brand-primary opacity-20 blur-2xl rounded-[3rem] group-hover:opacity-30 transition-opacity"></div>
                <div class="relative h-[400px] lg:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-brand-primary">
                  <img [src]="n.imagen_url" [alt]="n.titulo" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000">
                  <div class="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Article Area -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <!-- Floating Sidebar (Desktop) -->
            <aside class="hidden lg:block lg:col-span-1" data-aos="fade-up">
              <div class="sticky top-32 flex flex-col items-center gap-6">
                 <div class="w-px h-20 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                 <button class="p-3 text-gray-400 hover:text-brand-secondary transition-colors"><lucide-angular [img]="icons.User" class="w-6 h-6"></lucide-angular></button>
                 <button class="p-3 text-gray-400 hover:text-brand-secondary transition-colors"><lucide-angular [img]="icons.Clock" class="w-6 h-6"></lucide-angular></button>
              </div>
            </aside>

            <!-- Text Content Card -->
            <div class="lg:col-span-8" data-aos="fade-up" data-aos-delay="300">
              <div class="bg-white/70 dark:bg-brand-primary/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white/20 dark:border-white/5">
                <div class="prose prose-lg dark:prose-invert max-w-none">
                  <div class="text-gray-700 dark:text-gray-300 leading-[1.8] space-y-6 text-lg whitespace-pre-wrap">
                    {{ n.contenido }}
                    
                    <p class="pt-8 border-t border-gray-100 dark:border-white/10 italic text-brand-primary dark:text-gray-400">
                      "Este avance representa un hito significativo para el <strong>XVIII Congreso Nacional de Geología</strong>. 
                      Sogamoso se prepara para recibir a expertos internacionales en una jornada que promete 
                      redefinir nuestra comprensión de las geociencias."
                    </p>
                  </div>
                </div>

                <!-- Tags / Share -->
                <div class="mt-12 pt-8 border-t border-gray-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-6">
                  <div class="flex gap-2">
                    <span class="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-lg text-sm font-bold text-gray-500">#Geologia</span>
                    <span class="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-lg text-sm font-bold text-gray-500">#UPTC</span>
                    <span class="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-lg text-sm font-bold text-gray-500">#Sogamoso2026</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar Info -->
            <div class="lg:col-span-3 space-y-8" data-aos="fade-left" data-aos-delay="400">
              <!-- Related News Placeholder -->
              <div class="bg-brand-primary dark:bg-white/5 rounded-3xl p-6 text-white overflow-hidden relative">
                <div class="absolute -right-4 -top-4 w-24 h-24 bg-brand-secondary/20 blur-2xl rounded-full"></div>
                <h4 class="text-xl font-bold mb-4 relative z-10">¿Sabías que?</h4>
                <p class="text-sm text-gray-300 relative z-10 leading-relaxed">
                  Ya están abiertas las inscripciones para las salidas de campo al Sinclinal de Sogamoso. ¡Cupos limitados!
                </p>
                <button class="mt-4 text-brand-secondary font-bold text-sm flex items-center gap-1">
                  Leer más <lucide-angular [img]="icons.ArrowLeft" class="w-3 h-3 rotate-180"></lucide-angular>
                </button>
              </div>

              <!-- Social Share -->
              <div class="bg-white dark:bg-brand-primary/60 rounded-3xl p-6 border border-gray-100 dark:border-white/5">
                <h4 class="text-sm font-black uppercase tracking-widest text-brand-primary dark:text-white mb-4">Compartir</h4>
                <div class="flex gap-4">
                  <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">f</div>
                  <div class="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">in</div>
                  <div class="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">🔗</div>
                </div>
              </div>
            </div>
          </div>
        } @else {
          <!-- Loading State -->
          <div class="flex flex-col items-center justify-center py-40 space-y-6">
             <div class="w-16 h-16 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin shadow-lg"></div>
             <p class="text-gray-500 font-bold animate-pulse text-lg">Preparando tu lectura...</p>
          </div>
        }

      </div>
    </article>
  `,
  styles: [`
    :host { display: block; position: relative; }
    .prose strong { color: var(--brand-secondary); }
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
