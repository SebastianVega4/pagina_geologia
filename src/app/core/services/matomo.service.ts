import { Injectable, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

declare global {
  interface Window {
    _paq?: unknown[][];
  }
}

@Injectable({ providedIn: 'root' })
export class MatomoService implements OnDestroy {
  private readonly HEARTBEAT_SECONDS = 15;
  private readonly TIME_THRESHOLDS = [15, 30, 60, 120, 180, 300];

  private routerSub?: Subscription;
  private pageLoadTime = 0;
  private timeTrackingTimer: ReturnType<typeof setInterval> | null = null;
  private trackedTimes = new Set<number>();
  private cleanupFns: Array<() => void> = [];
  private sessionId = '';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  private init(): void {
    window._paq = window._paq || [];
    this.sessionId = this.genId();
    this.pageLoadTime = Date.now();

    this.configureMatomo();
    this.trackRouteChanges();
    this.trackEngagement();
    this.trackFormInteractions();
    this.trackMediaInteractions();
  }

  private configureMatomo(): void {
    try {
      window._paq?.push(['enableJSErrorTracking']);
      window._paq?.push(['setHeartbeatTimer', this.HEARTBEAT_SECONDS]);
    } catch {
      // setHeartbeatTimer may not be available in older matomo.js — safe to ignore
    }

    const pageType = this.resolvePageType();
    if (pageType) {
      this.safePush(['setCustomDimension', 1, pageType]);
    }

    const theme = localStorage.getItem('theme') || 'dark';
    this.safePush(['setCustomDimension', 2, theme]);

    this.safePush(['trackEvent', 'Session', 'session_start', this.sessionId]);
  }

  private safePush(args: unknown[]): void {
    try {
      window._paq?.push(args);
    } catch {
      // Silently ignore if the _paq method is not recognized
    }
  }

  private resolvePageType(): string {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    if (path === '/') return 'home';
    if (path.startsWith('/noticias')) return path === '/noticias' ? 'news_list' : 'news_detail';
    if (path === '/evento') return 'about_event';
    if (path.startsWith('/evento')) return 'event_subpage';
    if (path.startsWith('/concursos')) return 'contest';
    if (path === '/cronograma') return 'schedule';
    if (path === '/conferencistas') return 'speakers';
    if (path === '/ubicacion') return 'map';
    if (path === '/galeria') return 'gallery';
    if (path === '/contacto') return 'contact';
    if (path === '/inscripciones') return 'registration';
    if (path === '/acerca-de') return 'about_project';
    return 'other';
  }

  private trackRouteChanges(): void {
    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.pageLoadTime = Date.now();
        this.trackedTimes.clear();
        this.safePush(['trackEvent', 'Navigation', 'route_change', event.urlAfterRedirects]);
        this.trackPageView(event.urlAfterRedirects);
      });
    this.cleanupFns.push(() => this.routerSub?.unsubscribe());
  }

  private trackEngagement(): void {
    this.timeTrackingTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.pageLoadTime) / 1000);
      for (const t of this.TIME_THRESHOLDS) {
        if (elapsed >= t && !this.trackedTimes.has(t)) {
          this.trackedTimes.add(t);
          this.safePush(['trackEvent', 'Engagement', 'time_on_page', `${t}s`, t]);
        }
      }
    }, 5000);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.safePush(['trackEvent', 'Engagement', 'tab_hidden']);
      } else {
        this.safePush(['trackEvent', 'Engagement', 'tab_visible']);
      }
    });

    window.addEventListener('beforeunload', () => {
      const elapsed = Math.floor((Date.now() - this.pageLoadTime) / 1000);
      this.safePush(['trackEvent', 'Engagement', 'page_exit', `${elapsed}s`, elapsed]);
    });

    document.addEventListener('copy', () => {
      this.safePush(['trackEvent', 'Interaction', 'copy_to_clipboard']);
    });

    document.addEventListener('contextmenu', () => {
      this.safePush(['trackEvent', 'Interaction', 'right_click']);
    });

    this.cleanupFns.push(() => {
      if (this.timeTrackingTimer) clearInterval(this.timeTrackingTimer);
    });
  }

  private trackFormInteractions(): void {
    document.addEventListener('focusin', (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('input, textarea, select')) {
        const name = target.getAttribute('name') || target.getAttribute('id') || 'unknown';
        this.safePush(['trackEvent', 'Form', 'field_focus', name]);
      }
    });

    document.addEventListener('focusout', (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('input, textarea, select')) {
        const name = target.getAttribute('name') || target.getAttribute('id') || 'unknown';
        this.safePush(['trackEvent', 'Form', 'field_blur', name]);
      }
    });

    document.addEventListener('submit', (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      const formId = form.getAttribute('name') || form.getAttribute('id') || 'unknown';
      this.safePush(['trackEvent', 'Form', 'form_submit', formId]);
    });

    window.addEventListener('online', () => {
      this.safePush(['trackEvent', 'Network', 'online']);
    });

    window.addEventListener('offline', () => {
      this.safePush(['trackEvent', 'Network', 'offline']);
    });
  }

  private trackMediaInteractions(): void {
    document.addEventListener('play', (e: Event) => {
      const target = e.target as HTMLMediaElement;
      if (target.tagName === 'VIDEO' || target.tagName === 'AUDIO') {
        this.safePush(['trackEvent', 'Media', 'play', target.currentSrc || target.tagName]);
      }
    }, true);

    document.addEventListener('pause', (e: Event) => {
      const target = e.target as HTMLMediaElement;
      if (target.tagName === 'VIDEO' || target.tagName === 'AUDIO') {
        this.safePush(['trackEvent', 'Media', 'pause', target.currentSrc || target.tagName]);
      }
    }, true);

    document.addEventListener('seeked', (e: Event) => {
      const target = e.target as HTMLMediaElement;
      if (target.tagName === 'VIDEO' || target.tagName === 'AUDIO') {
        this.safePush(['trackEvent', 'Media', 'seek', target.currentSrc || target.tagName]);
      }
    }, true);
  }

  trackPageView(url: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.safePush(['setCustomUrl', url]);
    this.safePush(['setDocumentTitle', document.title]);

    const pageType = this.resolvePageType();
    this.safePush(['setCustomDimension', 1, pageType]);

    const theme = localStorage.getItem('theme') || 'dark';
    this.safePush(['setCustomDimension', 2, theme]);

    this.safePush(['trackPageView']);
  }

  trackEvent(category: string, action: string, label?: string, value?: number): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.safePush(['trackEvent', category, action, label, value]);
  }

  private genId(): string {
    return 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  ngOnDestroy(): void {
    for (const fn of this.cleanupFns) {
      fn();
    }
    this.cleanupFns = [];
    if (this.timeTrackingTimer) {
      clearInterval(this.timeTrackingTimer);
    }
  }
}