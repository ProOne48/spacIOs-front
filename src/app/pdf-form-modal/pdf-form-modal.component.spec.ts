import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfFormModalComponent } from './pdf-form-modal.component';

describe('PdfFormModalComponent', () => {
  let component: PdfFormModalComponent;
  let fixture: ComponentFixture<PdfFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfFormModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PdfFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
