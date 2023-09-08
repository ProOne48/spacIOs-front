import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { Observable, map } from 'rxjs';
import { Space, SpaceList } from '../models/space';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Table } from '../models/table';

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
      .get<IJsonObject>(`${this.path}/actual-spaces`)
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

  addTableToSpace(space: Space, table: Table): Observable<Space> {
    return this.http
      .put<IJsonObject>(
        `${this.path}/${space.id}/table`,
        Serialize(table, () => Table)
      )
      .pipe(map((response: IJsonObject) => Deserialize(response, () => Space)));
  }

  deleteTableFromSpace(space_id?: number, table_id?: number): Observable<Space> {
    return this.http
      .delete<IJsonObject>(
        `${this.path}/${space_id}/table/${table_id}`
      )
      .pipe(map((response: IJsonObject) => Deserialize(response, () => Space)));
  }

  updateSpace(space: Space): Observable<Space> {
    console.log(space);
    return this.http
      .put<IJsonObject>(
        `${this.path}/${space.id}`,
        Serialize(space, () => Space)
      )
      .pipe(map((response) => Deserialize(response, () => Space)));
  }

  deleteSpace(space?: Space): Observable<void> {
    return this.http.delete<void>(`${this.path}/${space?.id}`);
  }

  getPdf(spaceId?: number): Observable<ArrayBuffer> {
    const requestOptions: Object = {
      responseType: 'arraybuffer',
      headers: new HttpHeaders().append('Content-Type', 'application/pdf')
    };
    return this.http.get<ArrayBuffer>(`${this.path}/${spaceId}/pdf`, requestOptions);
  }

  uploadPDF(file: File, spaceId?: number): Observable<void> {
    const formData = new FormData();
    formData.append('pdf', file);
    return this.http.put<void>(`${this.path}/${spaceId}/pdf`, formData);
  }
}
