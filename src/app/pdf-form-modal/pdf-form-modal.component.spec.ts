import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { globalImports, materialImports } from '../app.module';
import { PdfFormModalComponent } from './pdf-form-modal.component';

describe('PdfFormModalComponent', () => {
  let component: PdfFormModalComponent;
  let fixture: ComponentFixture<PdfFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfFormModalComponent],
      imports: [...globalImports, ...materialImports],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PdfFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
