import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Play, X, Volume2, VolumeX } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;
  
  readonly icons = { Play, X, Volume2, VolumeX };
  showVideoModal = false;
  isMuted = true;
  
  countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  private targetDate = new Date('2026-05-01T08:00:00'); // Fecha tentativa del congreso
  private timerId: any;

  ngOnInit() {
    this.updateCountdown();
    this.timerId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngAfterViewInit() {
    if (this.bgVideo) {
      this.bgVideo.nativeElement.muted = this.isMuted;
    }
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    if (typeof window === 'undefined' || !this.bgVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Only play if modal is not open
            if (!this.showVideoModal) {
              this.bgVideo.nativeElement.play().catch(() => {
                // Autoplay might be blocked by browser policy
              });
            }
          } else {
            this.bgVideo.nativeElement.pause();
          }
        });
      },
      { threshold: 0.1 } // 10% of the video in view is enough to keep playing
    );

    observer.observe(this.bgVideo.nativeElement);
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
      if (this.bgVideo) this.bgVideo.nativeElement.pause();
    } else {
      document.body.style.overflow = 'auto';
      if (this.bgVideo) this.bgVideo.nativeElement.play();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgVideo) {
      this.bgVideo.nativeElement.muted = this.isMuted;
    }
  }
}
