import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Space } from '../../../../models/space';

@Component({
  selector: 'app-space-item',
  templateUrl: './space-item.component.html',
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
