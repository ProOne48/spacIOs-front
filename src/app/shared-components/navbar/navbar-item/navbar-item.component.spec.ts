import { ComponentFixture, TestBed } from '@angular/core/testing';

import { globalImports, materialImports } from '../../../app.module';
import { NavbarItemComponent } from './navbar-item.component';
import {NavbarItemInterface} from "../../../../definitions/navbar.interface";

describe('NavbarItemComponent', () => {
  let component: NavbarItemComponent;
  let fixture: ComponentFixture<NavbarItemComponent>;

  const item: NavbarItemInterface = {
    label: 'test',
    icon: 'test',
    path: 'test',
    show: true
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarItemComponent],
      imports: [...materialImports, ...globalImports]
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
