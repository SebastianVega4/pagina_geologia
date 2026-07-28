import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Mail, X, Volume2, VolumeX } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { MatomoService } from '../../../../core/services/matomo.service';
import { TrackClickDirective } from '../../../../shared/directives/track-click.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule, TrackClickDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  private matomo = inject(MatomoService);
  @ViewChild('promoVideo') promoVideo!: ElementRef<HTMLVideoElement>;

  readonly icons = { Mail, X, Volume2, VolumeX };
  showVideoModal = false;
  isPromoMuted = true;

  registeredParticipants = 458;
  totalCapacity = 500;

  get progressPercentage() {
    return (this.registeredParticipants / this.totalCapacity) * 100;
  }

  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  // Fecha tentativa del congreso
  private targetDate = new Date('2026-08-21T08:00:00');
  private timerId: any;

  ngOnInit() {
    this.updateCountdown();
    this.timerId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngAfterViewInit() {
    // Ensure the video starts muted (some browsers ignore the muted attr)
    if (this.promoVideo?.nativeElement) {
      this.promoVideo.nativeElement.muted = true;
    }
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return;
    }

    this.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  toggleVideoModal() {
    this.showVideoModal = !this.showVideoModal;
    if (this.showVideoModal) {
      document.body.style.overflow = 'hidden';
      this.matomo.trackEvent('Event', 'open_video_modal');
    } else {
      document.body.style.overflow = 'auto';
      this.matomo.trackEvent('Event', 'close_video_modal');
    }
  }

  togglePromoMute() {
    this.isPromoMuted = !this.isPromoMuted;
    if (this.promoVideo?.nativeElement) {
      this.promoVideo.nativeElement.muted = this.isPromoMuted;
    }
    this.matomo.trackEvent('Event', 'toggle_promo_sound');
  }

  scrollToRegistration() {
    this.matomo.trackEvent('Event', 'click_cta_registration', 'hero');
    const element = document.getElementById('registration');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
