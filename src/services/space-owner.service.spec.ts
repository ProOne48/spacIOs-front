import { SpaceOwnerService } from './space-owner.service';

import { TestBed } from '@angular/core/testing';

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
