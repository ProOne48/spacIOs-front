import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpaceOwnerService {

  path = 'space-owner';

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  getSpaceOwner(id: string) {
    return this.http.get(`${this.path}/${id}`);
  }
}
