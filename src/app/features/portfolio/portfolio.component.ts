import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, FileText, Download, ExternalLink, ChevronLeft } from 'lucide-angular';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { RouterModule } from '@angular/router';
import { MatomoService } from '../../core/services/matomo.service';
import { TrackClickDirective } from '../../shared/directives/track-click.directive';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SafePipe, RouterModule, TrackClickDirective],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  private matomo = inject(MatomoService);
  readonly icons = { FileText, Download, ExternalLink, ChevronLeft };

  readonly pdfEmbedUrl = 'assets/Portafolio_servicios_XVII_STG_UPTC_2026 (1).pdf';
  readonly pdfViewUrl = 'assets/Portafolio_servicios_XVII_STG_UPTC_2026 (1).pdf';
  readonly pdfDownloadUrl = 'assets/Portafolio_servicios_XVII_STG_UPTC_2026 (1).pdf';

  isPreviewLoaded = false;

  onIframeLoad(): void {
    this.isPreviewLoaded = true;
    this.matomo.trackEvent('Event', 'portfolio_pdf_view');
  }

  getMobilePdfUrl(pdfUrl: string): string {
    const baseUrl = 'https://xviisemanatecnicadegeologia.com/';
    if (!pdfUrl) return '';
    const absoluteUrl = pdfUrl.startsWith('http') 
      ? pdfUrl 
      : (window.location.origin.includes('localhost') 
          ? baseUrl + pdfUrl 
          : window.location.origin + '/' + pdfUrl);
    return `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;
  }
}
