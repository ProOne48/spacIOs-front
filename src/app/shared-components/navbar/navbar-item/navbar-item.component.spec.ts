import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@modules/angular/material.module';

import { NavbarItemInterface } from '../../../../definitions/navbar.interface';

import { NavbarItemComponent } from './navbar-item.component';

describe('NavbarItemComponent', () => {
  let component: NavbarItemComponent;
  let fixture: ComponentFixture<NavbarItemComponent>;

  const item: NavbarItemInterface = {
    label: 'test',
    icon: 'test',
    path: 'test',
    show: () => true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarItemComponent],
      imports: [MaterialModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarItemComponent);
    component = fixture.componentInstance;

    component.item = item;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
