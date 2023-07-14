import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesTableComponent } from './spaces-table.component';

describe('SpacesComponent', () => {
  let component: SpacesTableComponent;
  let fixture: ComponentFixture<SpacesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpacesTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpacesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
