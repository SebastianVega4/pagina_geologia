import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Target, Eye, Users } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  readonly icons = { Target, Eye, Users };
}
