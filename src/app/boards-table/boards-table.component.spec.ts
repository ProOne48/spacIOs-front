import { ComponentFixture, TestBed } from '@angular/core/testing';

import { globalImports, materialImports } from '../app.module';
import { BoardsTableComponent } from './boards-table.component';

describe('BoardsTableComponent', () => {
  let component: BoardsTableComponent;
  let fixture: ComponentFixture<BoardsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardsTableComponent],
      imports: [...materialImports, ...globalImports]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
