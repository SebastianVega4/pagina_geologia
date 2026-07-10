import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

type UmamiTrackFn = {
  (payload: string | { url?: string; title?: string; hostname?: string; referrer?: string }): void;
  (eventName: string, eventData?: Record<string, string | number | boolean>): void;
};

declare global {
  interface Window {
    umami?: { track: UmamiTrackFn };
  }
}

@Injectable({ providedIn: 'root' })
export class UmamiService {
  private ready = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.waitForScript();
      this.trackRouteChanges();
    }
  }

  private waitForScript(): void {
    if (window.umami) {
      this.ready = true;
      return;
    }
    const script = document.querySelector<HTMLScriptElement>('script[src*="umami"]');
    if (script) {
      script.addEventListener('load', () => { this.ready = true; });
    }
  }

  private trackRouteChanges(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const title = this.getPageTitle(event.urlAfterRedirects);
        this.trackPageView(event.urlAfterRedirects, title);
      });
  }

  private getPageTitle(url: string): string {
    const segments = url.replace(/^\//, '').split('/');
    for (const route of this.router.config) {
      const routePath = route.path || '';
      const routeSegments = routePath.split('/');
      if (routeSegments.length !== segments.length) continue;
      const match = routeSegments.every((seg, i) => seg.startsWith(':') || seg === segments[i]);
      if (match) return (route.title as string) || document.title;
    }
    return document.title;
  }

  private trackPageView(url: string, title?: string): void {
    this.safeTrack(() => {
      window.umami?.track({ url, title, hostname: window.location.hostname });
    });
  }

  trackEvent(name: string, data?: Record<string, string | number | boolean>): void {
    this.safeTrack(() => {
      window.umami?.track(name, data);
    });
  }

  private safeTrack(fn: () => void): void {
    if (!this.ready) return;
    try {
      fn();
    } catch {}
  }
}
