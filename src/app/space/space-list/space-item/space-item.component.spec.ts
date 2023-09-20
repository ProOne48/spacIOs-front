import { ComponentFixture, TestBed } from '@angular/core/testing';

import { globalImports, materialImports } from '../../../app.module';
import { SpaceItemComponent } from './space-item.component';

describe('SpaceItemComponent', () => {
  let component: SpaceItemComponent;
  let fixture: ComponentFixture<SpaceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceItemComponent],
      imports: [...materialImports, ...globalImports]
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
