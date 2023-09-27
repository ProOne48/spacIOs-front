import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { globalImports, materialImports } from '../../app.module';
import { SpaceInfoModalComponent } from './space-info-modal.component';

describe('SpaceInfoModalComponent', () => {
  let component: SpaceInfoModalComponent;
  let fixture: ComponentFixture<SpaceInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceInfoModalComponent],
      imports: [...materialImports, ...globalImports],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
