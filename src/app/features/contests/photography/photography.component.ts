import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Camera, FileText, Send, ChevronLeft, Timer } from 'lucide-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-photography',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.scss'
})
export class PhotographyComponent {
  readonly icons = { Camera, FileText, Send, ChevronLeft, Timer };

  readonly templateLink = '#';
  readonly formLink = '#';
}
