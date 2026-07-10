import { Directive, Input, HostListener } from '@angular/core';
import { UmamiService } from '../../core/services/umami.service';

@Directive({
  selector: '[appTrackClick]',
  standalone: true,
})
export class TrackClickDirective {
  @Input('appTrackClick') eventName: string = '';
  @Input() trackData?: Record<string, string | number | boolean>;
  @Input() trackLabel?: string;

  constructor(private umami: UmamiService) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const name = this.eventName || this.resolveEventName(target);
    const data: Record<string, string | number | boolean> = {
      ...(this.trackData || {}),
      ...this.resolveExtraData(target),
    };
    if (this.trackLabel) {
      data['label'] = this.trackLabel;
    }
    if (name) {
      this.umami.trackEvent(name, data);
    }
  }

  private resolveEventName(target: HTMLElement): string {
    const tag = target.tagName.toLowerCase();
    const href = (target as HTMLAnchorElement).href || '';
    const isDownload = target.hasAttribute('download') || href.includes('uc?export=download');
    const isExternal = href && !href.includes(window.location.hostname);
    const isMailto = href.startsWith('mailto:');
    const isTel = href.startsWith('tel:');

    if (isDownload) return 'download';
    if (isMailto) return 'click_email';
    if (isTel) return 'click_phone';
    if (isExternal && tag === 'a') return 'click_external_link';
    return '';
  }

  private resolveExtraData(target: HTMLElement): Record<string, string | number | boolean> {
    const data: Record<string, string | number | boolean> = {};
    const anchor = target as HTMLAnchorElement;
    if (anchor.href) {
      data['url'] = anchor.href;
    }
    const text = target.textContent?.trim().slice(0, 100);
    if (text) {
      data['text'] = text;
    }
    return data;
  }
}
