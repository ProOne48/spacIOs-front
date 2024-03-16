import { Deserialize, IJsonObject, Serialize } from 'dcerialize';
import { Observable, map } from 'rxjs';
import { Statistics, StatisticsUsage } from '../models/statistics';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatisticsFormat } from '../definitions/statistics.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  path = '/statistics';
  constructor(private http: HttpClient, private apiService: ApiService) {
    this.path = this.apiService.getApiUrl() + this.path;
  }

  getStatisticsById(id?: number, time?: Date, format?: StatisticsFormat): Observable<StatisticsUsage> {
    const url = this.formatStatisticsUrl(id, time, format);

    return this.http.get<IJsonObject>(url).pipe(
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

  formatStatisticsUrl(id?: number, time?: Date, format?: StatisticsFormat): string {
    let url = time ? `${this.path}/${id}?time=${time.toISOString()}` : `${this.path}/${id}`;

    if (format && time) {
      url += `&format=${format}`;
    } else if (format) {
      url += `?format=${format}`;
    }

    return url;
  }
}
