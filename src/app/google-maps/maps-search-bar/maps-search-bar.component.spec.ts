import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsSearchBarComponent } from './maps-search-bar.component';

describe('MapsSearchBarComponent', () => {
  let component: MapsSearchBarComponent;
  let fixture: ComponentFixture<MapsSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapsSearchBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MapsSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
