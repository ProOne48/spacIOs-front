import { AuthService } from './auth.service';

import { HttpClientModule } from "@angular/common/http";
import { MockAuthService } from "../../../test_assets/mocks/auth-service.mock";
import { TestBed } from '@angular/core/testing';
import { materialImports } from "../../app/app.module";

describe('AuthService', () => {
  let service: MockAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ...materialImports]
    });
    service = TestBed.inject(MockAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
