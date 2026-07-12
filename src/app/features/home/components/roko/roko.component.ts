import { Component, inject } from '@angular/core';
import { TrackClickDirective } from '../../../../shared/directives/track-click.directive';
import { MatomoService } from '../../../../core/services/matomo.service';

@Component({
  selector: 'app-roko',
  standalone: true,
  imports: [TrackClickDirective],
  templateUrl: './roko.component.html',
  styleUrl: './roko.component.scss'
})
export class RokoComponent {
  private matomo = inject(MatomoService);
}
