import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@modules/angular/material.module';
import { ChartsModule } from '@modules/integrations/charts.module';

import { BoardsTableComponent } from '../boards-table/boards-table.component';

import { SpaceComponent } from './space.component';

describe('SpacesComponent', () => {
  let component: SpaceComponent;
  let fixture: ComponentFixture<SpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceComponent, BoardsTableComponent],
      imports: [MaterialModule, ChartsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
