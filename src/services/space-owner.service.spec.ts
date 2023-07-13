import { HttpClientModule } from '@angular/common/http';

import { SpaceOwnerService } from './space-owner.service';
import { TestBed } from '@angular/core/testing';

describe('SpaceOwnerService', () => {
  let service: SpaceOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(SpaceOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
