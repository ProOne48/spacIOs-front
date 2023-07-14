import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { Space, SpaceList } from '../models/space';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  path = '/space';
  constructor(private http: HttpClient, private apiService: ApiService) {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  getSpaces(): Observable<SpaceList> {
    return this.http
      .get<IJsonObject>(this.path)
      .pipe(map((response: IJsonObject) => Deserialize(response, () => SpaceList)));
  }

  getActualSpaces(): Observable<SpaceList> {
    return this.http
      .get<IJsonObject>(this.path + '/actual-spaces')
      .pipe(map((response: IJsonObject) => Deserialize(response, () => SpaceList)));
  }

  getSpaceById(id: number): Observable<Space> {
    return this.http
      .get<IJsonObject>(`${this.path}/${id}`)
      .pipe(map((response: IJsonObject) => Deserialize(response, () => Space)));
  }

  createSpace(space: Space): Observable<Space> {
    return this.http
      .post<IJsonObject>(
        this.path,
        Serialize(space, () => Space)
      )
      .pipe(map((response: IJsonObject) => Deserialize(response, () => Space)));
  }

  updateSpace(space: Space): Observable<Space> {
    return this.http
      .put<IJsonObject>(
        `${this.path}/${space.id}`,
        Serialize(space, () => Space)
      )
      .pipe(map((response) => Deserialize(response, () => Space)));
  }

  deleteSpace(space: Space): Observable<Space> {
    return this.http
      .delete<IJsonObject>(`${this.path}/${space.id}`)
      .pipe(map((response: IJsonObject) => Deserialize(response, () => Space)));
  }
}
