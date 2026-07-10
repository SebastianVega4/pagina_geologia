import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LucideAngularModule, MessageCircle } from 'lucide-angular';
import { SeoService } from './core/services/seo.service';
import { UmamiService } from './core/services/umami.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LucideAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private seoService = inject(SeoService);
  title = 'web-congreso-geologia';
  readonly icons = { MessageCircle };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private umami: UmamiService,
  ) {
    this.seoService.init();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        offset: 120,
        easing: 'ease-in-out-cubic'
      });
      this.trackScrollDepth();
    }
  }

  private trackScrollDepth(): void {
    const thresholds = [25, 50, 75, 90, 100];
    const tracked = new Set<number>();
    const onScroll = () => {
      const pct = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
      for (const t of thresholds) {
        if (pct >= t && !tracked.has(t)) {
          tracked.add(t);
          this.umami.trackEvent('scroll_depth', { percent: t });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  openWhatsApp() {
    this.umami.trackEvent('click_whatsapp', { location: 'floating_button' });
    const phoneNumber = '573124870684';
    const message = encodeURIComponent('Hola! Quisiera más información sobre el Congreso de Geología UPTC 2026.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}
