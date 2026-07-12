import { Component, HostListener, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { LucideAngularModule, Menu, X, Moon, Sun, MapPin, ChevronDown, ChevronRight } from 'lucide-angular';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatomoService } from '../../services/matomo.service';
import { TrackClickDirective } from '../../../shared/directives/track-click.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule, TrackClickDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private matomo = inject(MatomoService);
  private routerSub?: Subscription;
  isScrolled = false;
  isMenuOpen = false;
  isDarkMode!: boolean;
  isHome = true;
  isEventoDropdownOpen = false;
  isConcursosDropdownOpen = false;

  readonly icons = { Menu, X, Moon, Sun, MapPin, ChevronDown, ChevronRight };

  constructor(private router: Router) {}

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    // Por defecto es dark, a menos que esté guardado como 'light'
    this.isDarkMode = savedTheme !== 'light';
    this.updateTheme();

    this.routerSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isHome = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/home';
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.matomo.trackEvent('Event', 'mobile_menu_toggle', this.isMenuOpen ? 'open' : 'close');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateTheme();
    this.matomo.trackEvent('Event', 'toggle_dark_mode', this.isDarkMode ? 'dark' : 'light');
  }

  private updateTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  scrollToRegistration() {
    this.matomo.trackEvent('Event', 'click_cta_registration', 'navbar');
    this.isMenuOpen = false;
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // If not on home page, navigate to home and then scroll
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      });
    }
  }
}
