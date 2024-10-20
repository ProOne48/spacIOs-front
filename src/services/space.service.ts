import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Space, SpaceList, SpaceReduced } from '../models/space';
import { ApiService } from './api.service';
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

  getReducedSpace(id: number): Observable<SpaceReduced> {
    return this.http
      .get<IJsonObject>(`${this.path}/${id}/reduced`)
      .pipe(map((response: IJsonObject) => Deserialize(response, () => SpaceReduced)));
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

  deleteTableFromSpace(spaceId?: number, tableId?: number): Observable<Space> {
    return this.http
      .delete<IJsonObject>(`${this.path}/${spaceId}/table/${tableId}`)
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

  deleteSpace(space?: Space): Observable<void> {
    return this.http.delete<void>(`${this.path}/${space?.id}`);
  }

  getPdf(spaceId?: number): Observable<ArrayBuffer> {
    const requestOptions: object = {
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

  occupyTable(spaceId?: number, tableId?: number): Observable<SpaceReduced> {
    return this.http.put<IJsonObject>(`${this.path}/${spaceId}/table/${tableId}/occupy`, null).pipe(
      map((response) => {
        return Deserialize(response, () => SpaceReduced);
      })
    );
  }
}
