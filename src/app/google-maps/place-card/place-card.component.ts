import { Component, InputSignal, input, signal } from '@angular/core';
import { MaterialModule } from '@modules/angular/material.module';

import { Place } from '../../../models/places';

@Component({
  selector: 'app-place-card',
  imports: [MaterialModule],
  templateUrl: './place-card.component.html',
  styleUrl: './place-card.component.scss'
})
export class PlaceCardComponent {
  readonly place: InputSignal<Place> = input.required<Place>();
}
