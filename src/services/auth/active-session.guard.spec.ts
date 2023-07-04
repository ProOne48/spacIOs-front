import { ActiveSessionGuard } from './active-session.guard';

import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

describe('ActiveSessionGuard', () => {
  let guard: ActiveSessionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: ActiveSessionGuard, useValue: {} }]
    });
    guard = TestBed.inject(ActiveSessionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
