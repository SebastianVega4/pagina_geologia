import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Mail, X, Volume2, VolumeX, Radio, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { MatomoService } from '../../../../core/services/matomo.service';
import { TrackClickDirective } from '../../../../shared/directives/track-click.directive';
import {
  HERO_TIMELINE,
  EVENT_START,
  EVENT_END,
  HeroTimeSlot,
  HeroActivity
} from './hero-timeline.data';

type EventState = 'before' | 'during' | 'after';

interface PrioritizedActivity extends HeroActivity {
  isPrimary: boolean;
}

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

  readonly icons = { Mail, X, Volume2, VolumeX, Radio, MapPin, Clock, ChevronDown, ChevronUp };
  showVideoModal = false;
  isPromoMuted = true;

  registeredParticipants = 498;
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

  eventState: EventState = 'before';
  currentSlot: HeroTimeSlot | null = null;
  nextSlot: HeroTimeSlot | null = null;
  currentDayLabel = '';
  showParallel = false;
  primaryActivity: HeroActivity | null = null;
  parallelActivities: HeroActivity[] = [];
  dayElapsedPercent = 0;
  dayStartHour = 8;
  dayEndHour = 18;

  private targetDate = EVENT_START;
  private timerId: any;
  private stateTimerId: any;

  ngOnInit() {
    this.evaluateEventState();
    this.updateCountdown();
    this.timerId = setInterval(() => this.updateCountdown(), 1000);
    this.stateTimerId = setInterval(() => this.evaluateEventState(), 30000);
  }

  ngAfterViewInit() {
    if (this.promoVideo?.nativeElement) {
      this.promoVideo.nativeElement.muted = true;
    }
  }

  ngOnDestroy() {
    if (this.timerId) clearInterval(this.timerId);
    if (this.stateTimerId) clearInterval(this.stateTimerId);
  }

  toggleParallel() {
    this.showParallel = !this.showParallel;
  }

  private evaluateEventState() {
    const now = new Date();
    const ts = now.getTime();

    if (ts < EVENT_START.getTime()) {
      this.eventState = 'before';
      return;
    }
    if (ts > EVENT_END.getTime()) {
      this.eventState = 'after';
      return;
    }

    this.eventState = 'during';
    this.findCurrentAndNext(now);
  }

  private findCurrentAndNext(now: Date) {
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    let foundCurrent = false;

    for (let i = 0; i < HERO_TIMELINE.length; i++) {
      const slot = HERO_TIMELINE[i];
      if (slot.date !== todayStr) continue;

      const [startH, startM] = slot.start.split(':').map(Number);
      const [endH, endM] = slot.end.split(':').map(Number);
      const slotStart = startH * 60 + startM;
      const slotEnd = endH * 60 + endM;

      if (currentMinutes >= slotStart && currentMinutes < slotEnd) {
        this.currentSlot = slot;
        this.currentDayLabel = slot.dayLabel;
        this.dayStartHour = startH;
        this.dayEndHour = endH;
        this.dayElapsedPercent = ((currentMinutes - slotStart) / (slotEnd - slotStart)) * 100;
        this.prioritizeActivities(slot);
        foundCurrent = true;

        this.nextSlot = null;
        for (let j = i + 1; j < HERO_TIMELINE.length; j++) {
          if (HERO_TIMELINE[j].date === todayStr) {
            this.nextSlot = HERO_TIMELINE[j];
            break;
          }
        }
        break;
      }
    }

    if (!foundCurrent) {
      this.currentSlot = null;
      this.nextSlot = null;
      this.primaryActivity = null;
      this.parallelActivities = [];
    }
  }

  private prioritizeActivities(slot: HeroTimeSlot) {
    const priority: Record<string, number> = {
      magistral: 1,
      panel: 2,
      especial: 3,
      ponencias: 4,
      actividad: 5,
      break: 6,
      almuerzo: 7,
      cierre: 8,
    };

    const sorted = [...slot.activities].sort(
      (a, b) => (priority[a.type] ?? 99) - (priority[b.type] ?? 99)
    );

    this.primaryActivity = sorted[0] ?? null;
    this.parallelActivities = sorted.slice(1);
    this.showParallel = false;
  }

  private updateCountdown() {
    if (this.eventState !== 'before') {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return;
    }

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

  getActivityIcon(type: HeroActivity['type']): string {
    const map: Record<string, string> = {
      magistral: '🎤',
      especial: '🎤',
      ponencias: '🏫',
      panel: '💬',
      actividad: '📌',
      break: '☕',
      almuerzo: '🍽️',
      cierre: '🎉',
    };
    return map[type] ?? '📌';
  }
}
