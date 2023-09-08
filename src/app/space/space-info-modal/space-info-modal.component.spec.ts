import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceInfoModalComponent } from './space-info-modal.component';

describe('SpaceInfoModalComponent', () => {
  let component: SpaceInfoModalComponent;
  let fixture: ComponentFixture<SpaceInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceInfoModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
