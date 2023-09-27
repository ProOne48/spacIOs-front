import { Injectable } from '@angular/core';
import { Space, SpaceList } from '../../src/models/space';
import { Observable, of } from 'rxjs';
import { SpaceService } from '../../src/services/space.service';

@Injectable({ providedIn: 'root' })
export class SpaceServiceMock extends SpaceService {
  constructor() {
    const http = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) });
    const apiService = jasmine.createSpyObj('ApiService', { post: of({}), get: of({}), getApiUrl: of() });
    super(http, apiService);
  }
  override getActualSpaces(): Observable<SpaceList> {
    return of(new SpaceList());
  }

  override getPdf(spaceId?: number): Observable<ArrayBuffer> {
    return of(new ArrayBuffer(0));
  }

  override getSpaceById(id: number): Observable<Space> {
    return of(new Space());
  }

  override getSpaces(): Observable<SpaceList> {
    return of(new SpaceList());
  }
}
