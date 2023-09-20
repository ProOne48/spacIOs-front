import { HttpClientModule } from '@angular/common/http';

import { SpaceService } from './space.service';
import { TestBed } from '@angular/core/testing';

describe('SpaceService', () => {
  let service: SpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(SpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
