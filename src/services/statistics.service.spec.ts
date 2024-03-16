import { globalImports, materialImports } from '../app/app.module';

import { StatisticsService } from './statistics.service';
import { TestBed } from '@angular/core/testing';

describe('StatisticsService', () => {
  let service: StatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...globalImports, ...materialImports]
    });
    service = TestBed.inject(StatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
