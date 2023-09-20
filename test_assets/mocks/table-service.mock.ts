import { Injectable } from '@angular/core';
import { TableService } from '../../src/services/table.service';
import { of } from 'rxjs';
import { Table, TableList } from '../../src/models/table';

@Injectable({ providedIn: 'root' })
export class TableServiceMock extends TableService {
  constructor() {
    const apiService = jasmine.createSpyObj('ApiService', { post: of({}), get: of({}), getApiUrl: of() });
    const http = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) });
    super(apiService, http);
  }

  override getTables(): TableList {
    return of(new TableList());
  }

  override getTable(id: number): Table {
    return of(new Table());
  }

  override deleteTable(id: number): Table {
    return of(new Table());
  }
}
