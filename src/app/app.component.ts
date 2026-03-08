import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LucideAngularModule, MessageCircle } from 'lucide-angular';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, LucideAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'web-congreso-geologia';
  readonly icons = { MessageCircle };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        offset: 120,
        easing: 'ease-in-out-cubic'
      });
    }
  }

  openWhatsApp() {
    const phoneNumber = '573123456789';
    const message = encodeURIComponent('Hola! Quisiera más información sobre el Congreso de Geología UPTC 2026.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}
