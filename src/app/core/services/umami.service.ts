import { Injectable, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

type UmamiTrackFn = {
  (payload: string | { url?: string; title?: string; hostname?: string; referrer?: string }): void;
  (eventName: string, eventData?: Record<string, string | number | boolean>): void;
};

declare global {
  interface Window {
    umami?: { track: UmamiTrackFn };
  }
}

interface QueuedEvent {
  args: unknown[];
}

@Injectable({ providedIn: 'root' })
export class UmamiService implements OnDestroy {
  private ready = false;
  private loading = false;
  private queue: QueuedEvent[] = [];
  private routerSub?: Subscription;
  private cleanupFns: Array<() => void> = [];
  private readonly SCRIPT_URL = 'https://cloud.umami.is/script.js';
  private readonly MAX_RETRIES = 3;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  private init(): void {
    this.loadScript();
    this.trackRouteChanges();
  }

  private async loadScript(retryCount = 0): Promise<void> {
    if (window.umami) {
      this.ready = true;
      this.flush();
      return;
    }

    if (this.loading) return;
    this.loading = true;

    try {
      await this.injectScript();
      this.ready = true;
      this.flush();
    } catch (err) {
      if (retryCount < this.MAX_RETRIES) {
        const delay = Math.min(1000 * Math.pow(2, retryCount), 8000);
        this.log(`Script load failed (attempt ${retryCount + 1}), retrying in ${delay}ms`, err);
        await new Promise(r => setTimeout(r, delay));
        this.loading = false;
        return this.loadScript(retryCount + 1);
      }
      this.log('Script failed to load after retries — analytics disabled', err);
      this.queue = [];
    } finally {
      this.loading = false;
    }
  }

  private injectScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!environment.umamiWebsiteId) {
        reject(new Error('umamiWebsiteId is not configured'));
        return;
      }

      const existing = document.querySelector<HTMLScriptElement>(
        `script[data-website-id="${environment.umamiWebsiteId}"]`
      );
      if (existing) {
        if (window.umami) {
          resolve();
        } else {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', () => reject(new Error('Existing script load failed')));
        }
        return;
      }

      const script = document.createElement('script');
      script.src = this.SCRIPT_URL;
      script.defer = true;
      script.setAttribute('data-website-id', environment.umamiWebsiteId);
      script.setAttribute('data-auto-track', 'false');
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Umami script'));
      document.head.appendChild(script);
    });
  }

  private flush(): void {
    while (this.queue.length > 0) {
      const item = this.queue.shift()!;
      this.directTrack(item.args[0], item.args[1]);
    }
  }

  private trackRouteChanges(): void {
    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const title = this.resolvePageTitle(event.urlAfterRedirects);
        this.enqueue({ args: [{ url: event.urlAfterRedirects, title, hostname: window.location.hostname }] });
      });
    this.cleanupFns.push(() => this.routerSub?.unsubscribe());
  }

  private resolvePageTitle(url: string): string {
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

  trackEvent(name: string, data?: Record<string, string | number | boolean>): void {
    this.enqueue({ args: [name, data] });
  }

  private enqueue(item: QueuedEvent): void {
    if (this.ready && window.umami) {
      this.directTrack(item.args[0], item.args[1]);
    } else {
      this.queue.push(item);
    }
  }

  private directTrack(arg0: unknown, arg1: unknown): void {
    try {
      window.umami?.track(arg0 as any, arg1 as any);
    } catch {
      this.log('track call failed', { arg0, arg1 });
    }
  }

  trackScrollDepth(thresholds: number[] = [50, 100]): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const tracked = new Set<number>();
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const pct = Math.round(
          (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
        );
        for (const t of thresholds) {
          if (pct >= t && !tracked.has(t)) {
            tracked.add(t);
            this.trackEvent('scroll_depth', { percent: t });
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    this.cleanupFns.push(() => window.removeEventListener('scroll', onScroll));
  }

  private log(message: string, ...data: unknown[]): void {
    if (!environment.production) {
      console.warn(`[Umami] ${message}`, ...data);
    }
  }

  ngOnDestroy(): void {
    for (const fn of this.cleanupFns) {
      fn();
    }
    this.cleanupFns = [];
  }
}
