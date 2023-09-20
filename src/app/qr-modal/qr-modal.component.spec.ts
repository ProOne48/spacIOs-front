import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { globalImports, materialImports } from '../app.module';
import { QRCodeModalInterface } from '../../definitions/table.interface';
import { QrModalComponent } from './qr-modal.component';

describe('QrModalComponent', () => {
  let component: QrModalComponent;
  let fixture: ComponentFixture<QrModalComponent>;

  const data: QRCodeModalInterface = {
    qrCode: new Blob()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrModalComponent],
      imports: [...globalImports, ...materialImports],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QrModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
