import { globalImports, materialImports } from '../app/app.module';

import { TableService } from './table.service';
import { TestBed } from '@angular/core/testing';

describe('TableService', () => {
  let service: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...materialImports, ...globalImports]
    });
    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
