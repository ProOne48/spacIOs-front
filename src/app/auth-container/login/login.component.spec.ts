import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { globalImports, materialImports } from '../../app.module';

import { AuthService } from '../../../services/auth/auth.service';
import { LoginComponent } from './login.component';
import { MockAuthService } from '../../../../test_assets/mocks/auth-service.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockAuthService: MockAuthService = new MockAuthService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [...materialImports, ...globalImports],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
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
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
