import { Deserialize, IJsonObject } from 'dcerialize';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpaceOwner } from '../models/space-owner';

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
    return this.http.get<IJsonObject>(`${this.path}/actual-space-owner`).pipe(
      map((spaceOwnerData) => {
        return Deserialize(spaceOwnerData, () => SpaceOwner);
      })
    );
  }
}
