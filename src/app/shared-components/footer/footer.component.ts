import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '@modules/angular/material.module';

@Component({
  selector: 'app-footer',
  imports: [MaterialModule],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {}
