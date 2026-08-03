import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@modules/angular/material.module';

import { MockAuthService } from '../../../../test_assets/mocks/auth-service.mock';
import { AuthService } from '../../../services/auth/auth.service';

import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const mockAuthService = new MockAuthService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent, NavbarItemComponent],
      imports: [HttpClientModule, MaterialModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('1234567890')
              }
            ]
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
