import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { Observable, map } from 'rxjs';
import { Statistics, StatisticsUsage } from '../models/statistics';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  path = '/statistics';
  constructor(private http: HttpClient, private apiService: ApiService) {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  getStatisticsById(id?: number): Observable<StatisticsUsage> {
    return this.http.get<IJsonObject>(`${this.path}/${id}`).pipe(
      map((statisticsData) => {
        return Deserialize(statisticsData, () => StatisticsUsage);
      })
    );
  }

  insertStatistics(statistics: Statistics): Observable<Statistics> {
    return this.http
      .post<IJsonObject>(
        `${this.path}`,
        Serialize(statistics, () => Statistics)
      )
      .pipe(
        map((statisticsData) => {
          return Deserialize(statisticsData, () => Statistics);
        })
      );
  }
}
