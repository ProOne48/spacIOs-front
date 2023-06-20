import { ActiveSessionGuard } from './active-session.guard';

import { TestBed } from '@angular/core/testing';

describe('ActiveSessionGuard', () => {
  let guard: ActiveSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActiveSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
