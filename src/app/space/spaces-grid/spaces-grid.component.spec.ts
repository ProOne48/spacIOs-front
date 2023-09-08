import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesGridComponent } from './spaces-grid.component';

describe('SpacesComponent', () => {
  let component: SpacesGridComponent;
  let fixture: ComponentFixture<SpacesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpacesGridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpacesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
