import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthContainerComponent } from './auth-container.component';
import { globalImports, materialImports } from "../app.module";

describe('AuthContainerComponent', () => {
  let component: AuthContainerComponent;
  let fixture: ComponentFixture<AuthContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthContainerComponent],
      imports: [...materialImports, ...globalImports]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
