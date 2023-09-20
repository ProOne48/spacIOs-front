import { ComponentFixture, TestBed } from '@angular/core/testing';

import { globalImports, materialImports } from '../app.module';
import { BoardsTableComponent } from '../boards-table/boards-table.component';
import { SpaceComponent } from './space.component';

describe('SpacesComponent', () => {
  let component: SpaceComponent;
  let fixture: ComponentFixture<SpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceComponent, BoardsTableComponent],
      imports: [...materialImports, ...globalImports]
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
