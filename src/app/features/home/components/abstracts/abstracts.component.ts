import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, FileText, Send, QrCode, ExternalLink } from 'lucide-angular';
import { SafePipe } from '../../../../shared/pipes/safe.pipe';

@Component({
  selector: 'app-abstracts',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SafePipe],
  templateUrl: './abstracts.component.html',
  styleUrl: './abstracts.component.scss'
})
export class AbstractsComponent {
  readonly icons = { FileText, Send, QrCode, ExternalLink };

  readonly pdfEmbedUrl =
    'https://drive.google.com/file/d/1bRzalDnbFyu4gsaa4IRGfu4OHg5U4U1U/preview';

  readonly pdfViewUrl =
    'https://drive.google.com/file/d/1bRzalDnbFyu4gsaa4IRGfu4OHg5U4U1U/view';

  readonly submissionFormUrl =
    'https://docs.google.com/forms/u/2/d/e/1FAIpQLSdnnnfbpobrjTpSJ0gASH5zsT179I4-A_LEdCpcbVyzf3tfrA/viewform';

  isPreviewLoaded = false;

  onIframeLoad(): void {
    this.isPreviewLoaded = true;
  }
}
