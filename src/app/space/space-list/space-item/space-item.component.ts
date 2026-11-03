import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '@modules/angular/material.module';

import { Space } from '../../../../models/space';

@Component({
  selector: 'app-space-item',
  imports: [MaterialModule, RouterLink],
  templateUrl: './space-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./space-item.component.scss']
})
export class SpaceItemComponent implements OnChanges {
  @Input() space?: Space;

  averageUsage?: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['space']) {
      if (this.space?.capacity && this.space?.maxCapacity) {
        this.averageUsage = (this.space?.capacity / this.space?.maxCapacity) * 100;
      }
    }
  }
}
