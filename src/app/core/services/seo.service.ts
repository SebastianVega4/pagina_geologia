import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

const BASE_URL = 'https://xviisemanatecnicadegeologia.com';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  init() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe((event) => {
      const title = event['title'];
      if (title) {
        this.titleService.setTitle(title);
        this.updateTags(title, event['description'], this.router.url);
      }
    });
  }

  private updateTags(title: string, description?: string, url?: string) {
    const desc = description || 'XVII Semana Técnica de Geología, Ingeniería Geológica y Geociencias - UPTC Sogamoso 2026';
    const canonicalUrl = url ? `${BASE_URL}${url}` : BASE_URL;

    this.metaService.updateTag({ name: 'description', content: desc });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow, max-snippet:200, max-image-preview:large' });

    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: desc });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
    this.metaService.updateTag({ property: 'og:image', content: DEFAULT_IMAGE });
    this.metaService.updateTag({ property: 'og:image:alt', content: title });
    this.metaService.updateTag({ property: 'og:locale', content: 'es_CO' });
    this.metaService.updateTag({ property: 'og:site_name', content: 'XVII Semana Técnica de Geología 2026' });

    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: desc });
    this.metaService.updateTag({ name: 'twitter:image', content: DEFAULT_IMAGE });
    this.metaService.updateTag({ name: 'twitter:image:alt', content: title });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.setAttribute('href', canonicalUrl);
    }
  }
}
