import { Component, inject, signal } from '@angular/core';

import { Place } from '../../../models/places';
import { GoogleMapsService } from '../../../services/google-maps.service';
import { PlaceCardComponent } from '../place-card/place-card.component';

@Component({
  selector: 'app-maps-search-bar',
  imports: [PlaceCardComponent],
  templateUrl: './maps-search-bar.component.html',
  styleUrl: './maps-search-bar.component.scss'
})
export class MapsSearchBarComponent {
  places$ = signal<Place[]>([]);

  googleMapsService = inject(GoogleMapsService);
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    this.googleMapsService.searchPlaces(query).subscribe((response) => {
      this.places$.set(response.places);
    });
  }

  requestCaptcha(): void {
    // This method is a placeholder for requesting a captcha from the Google Maps API.
    // The actual implementation will depend on the specific requirements and the Google Maps API documentation.
  }

  sendOTP(): void {
    // This method is a placeholder for sending an OTP (One-Time Password) to the user.
    // The actual implementation will depend on the specific requirements and the Vonages API documentation.
  }
}
