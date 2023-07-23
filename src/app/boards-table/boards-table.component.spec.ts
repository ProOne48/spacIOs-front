import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsTableComponent } from './boards-table.component';

describe('BoardsTableComponent', () => {
  let component: BoardsTableComponent;
  let fixture: ComponentFixture<BoardsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
