import { AuthService } from './auth.service';

import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { materialImports } from '../../app/app.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ...materialImports]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
