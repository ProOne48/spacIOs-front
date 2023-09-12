import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Space } from '../../../models/space';

@Component({
  selector: 'app-space-item',
  templateUrl: './space-item.component.html',
  styleUrls: ['./space-item.component.scss']
})
export class SpaceItemComponent {
  @Input() space?: Space;

  @Output() clickSpace: EventEmitter<number> = new EventEmitter<number>();

  selectSpace(id?: number): void {
    this.clickSpace.emit(id);
  }
}
