import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@modules/angular/material.module';

import { SpaceItemComponent } from './space-item.component';

describe('SpaceItemComponent', () => {
  let component: SpaceItemComponent;
  let fixture: ComponentFixture<SpaceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceItemComponent],
      imports: [MaterialModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
