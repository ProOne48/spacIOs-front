import { ActiveSessionGuard } from './active-session.guard';

import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";

describe('ActiveSessionGuard', () => {
  let guard: ActiveSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ { provide: ActiveSessionGuard, useValue: {} } ]
    });
    guard = TestBed.inject(ActiveSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
