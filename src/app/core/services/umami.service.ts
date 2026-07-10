import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

declare global {
  interface Window {
    umami?: {
      track: (payload: { website: string; url?: string; title?: string }) => void;
    };
  }
}

@Injectable({ providedIn: 'root' })
export class UmamiService {
  private readonly websiteId = 'b8922104-9edf-4ace-82c3-5bc05bb12231';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.trackRouteChanges();
    }
  }

  private trackRouteChanges(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.trackPageView(event.urlAfterRedirects);
      });
  }

  private trackPageView(url: string): void {
    if (window.umami) {
      window.umami.track({ website: this.websiteId, url });
    }
  }
}
