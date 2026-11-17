import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Deserialize, IJsonObject } from 'dcerialize';
import { Observable, map } from 'rxjs';

import { PlacesListResponse } from '../models/places';

import { ApiService } from './api.service';

@Service()
export class GoogleMapsService {
  path = '/google-maps';

  private httpClient = inject(HttpClient);
  private apiService = inject(ApiService);

  constructor() {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  searchPlaces(query: string): Observable<PlacesListResponse> {
    return this.httpClient
      .post<IJsonObject>(`${this.path}/search`, {
        query: query
      })
      .pipe(map((response: IJsonObject) => Deserialize(response, () => PlacesListResponse)));
  }
}
