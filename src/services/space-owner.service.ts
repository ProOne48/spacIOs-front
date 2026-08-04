import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Deserialize, IJsonObject } from 'dcerialize';
import { Observable, map } from 'rxjs';

import { SpaceOwner } from '../models/space-owner';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SpaceOwnerService {
  private http = inject(HttpClient);
  private apiService = inject(ApiService);

  path = '/space-owner';

  constructor() {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  getSpaceOwner(id: string): Observable<SpaceOwner> {
    return this.http.get<SpaceOwner>(`${this.path}/${id}`);
  }

  getActualSpaceOwner(): Observable<SpaceOwner> {
    return this.http.get<IJsonObject>(`${this.path}/actual`).pipe(
      map((spaceOwnerData) => {
        return Deserialize(spaceOwnerData, () => SpaceOwner);
      })
    );
  }
}
