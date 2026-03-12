import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, FileText, Download, ExternalLink, ChevronLeft } from 'lucide-angular';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SafePipe, RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  readonly icons = { FileText, Download, ExternalLink, ChevronLeft };

  readonly pdfEmbedUrl = 'assets/Portafolio_servicios_XVII_STG_UPTC_2026 (1).pdf';
  readonly pdfViewUrl = 'assets/Portafolio_servicios_XVII_STG_UPTC_2026 (1).pdf';
  readonly pdfDownloadUrl = 'assets/Portafolio_servicios_XVII_STG_UPTC_2026 (1).pdf';

  isPreviewLoaded = false;

  onIframeLoad(): void {
    this.isPreviewLoaded = true;
  }
}
