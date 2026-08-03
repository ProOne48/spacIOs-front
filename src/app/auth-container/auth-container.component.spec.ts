import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@modules/angular/material.module';
import { GoogleLoginModule } from '@modules/integrations/google-login.module';

import { AuthContainerComponent } from './auth-container.component';

describe('AuthContainerComponent', () => {
  let component: AuthContainerComponent;
  let fixture: ComponentFixture<AuthContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthContainerComponent],
      imports: [MaterialModule, GoogleLoginModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
