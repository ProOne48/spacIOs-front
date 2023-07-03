import { AuthGuard } from './auth.guard';

import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from "@angular/common/http";
import { materialImports } from "../../app/app.module";
import { GoogleLoginProvider, SocialAuthServiceConfig } from "@abacritt/angularx-social-login";

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ...materialImports],
      providers: [ { provide: AuthGuard, useValue: {} },
      {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('CLIENT_ID_DE_GOOGLE')
              }
            ]
          } as SocialAuthServiceConfig
        }
        ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
