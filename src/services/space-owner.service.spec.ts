import { TestBed } from '@angular/core/testing';

import { SpaceOwnerService } from './space-owner.service';

describe('SpaceOwnerService', () => {
  let service: SpaceOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
