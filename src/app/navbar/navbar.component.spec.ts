import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { HttpClientModule } from "@angular/common/http";
import { globalImports, materialImports } from "../app.module";
import { MockAuthService } from "../../../test_assets/mocks/auth-service.mock";
import { AuthService } from "../../services/auth/auth.service";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const mockAuthService = new MockAuthService()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientModule, ...materialImports, ...globalImports],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
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
