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

  readonly pdfEmbedUrl =
    'https://drive.google.com/file/d/1uROI9_B0bpVaveday1LyKGI-ztLgNU9Q/preview';

  readonly pdfViewUrl =
    'https://drive.google.com/file/d/1uROI9_B0bpVaveday1LyKGI-ztLgNU9Q/view';

  readonly pdfDownloadUrl =
    'https://docs.google.com/uc?export=download&id=1uROI9_B0bpVaveday1LyKGI-ztLgNU9Q';

  isPreviewLoaded = false;

  onIframeLoad(): void {
    this.isPreviewLoaded = true;
  }
}
