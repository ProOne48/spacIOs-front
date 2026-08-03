import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@modules/angular/material.module';

import { FooterComponent } from '../shared-components/footer/footer.component';
import { NavbarItemComponent } from '../shared-components/navbar/navbar-item/navbar-item.component';
import { NavbarComponent } from '../shared-components/navbar/navbar.component';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent, NavbarComponent, NavbarItemComponent, FooterComponent],
      imports: [MaterialModule],
      providers: [
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
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
