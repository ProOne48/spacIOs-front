import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { Table } from '../models/table';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  path = '/table';
  constructor(private apiService: ApiService, private http: HttpClient) {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  getTables(): Observable<IJsonObject> {
    return this.http.get<IJsonObject>(`${this.path}`);
  }

  getTable(id: string): Observable<IJsonObject> {
    return this.http.get<IJsonObject>(`${this.path}/${id}`);
  }

  deleteTable(id?: number): Observable<IJsonObject> {
    return this.http.delete<IJsonObject>(`${this.path}/${id}`);
  }

  editTable(table: Table): Observable<Table> {
    return this.http
      .put<IJsonObject>(
        `${this.path}/${table.id}`,
        Serialize(table, () => Table)
      )
      .pipe(map((table: IJsonObject) => Deserialize(table, () => Table)));
  }

  getQRCode(id?: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.path}/${id}/qr-code`, {
      responseType: 'blob' as 'json'
    });
  }
}
