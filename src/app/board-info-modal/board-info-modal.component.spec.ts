import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { globalImports, materialImports } from '../app.module';
import { BoardInfoModalComponent } from './board-info-modal.component';

describe('BoardInfoModalComponent', () => {
  let component: BoardInfoModalComponent;
  let fixture: ComponentFixture<BoardInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardInfoModalComponent],
      imports: [...globalImports, ...materialImports],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
