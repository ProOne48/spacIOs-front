import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Deserialize, IJsonObject } from 'dcerialize';
import { Observable, map } from 'rxjs';

import { SpaceOwner } from '../models/space-owner';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SpaceOwnerService {
  path = '/space-owner';

  constructor(private http: HttpClient, private apiService: ApiService) {
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
