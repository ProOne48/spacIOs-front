import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.http.get<SpaceOwner>(`${this.path}/actual-space-owner`);
  }
}
