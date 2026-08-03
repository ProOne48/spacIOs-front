import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@modules/angular/material.module';
import { PdfViewerModule } from '@modules/integrations/pdf-viewer.module';

import { SpaceServiceMock } from '../../../test_assets/mocks/space-service.mock';
import { SpaceService } from '../../services/space.service';

import { PdfViewComponent } from './pdf-view.component';

describe('PdfViewComponent', () => {
  let component: PdfViewComponent;
  let fixture: ComponentFixture<PdfViewComponent>;
  const spaceServiceMock: SpaceServiceMock = new SpaceServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfViewComponent],
      imports: [PdfViewerModule, MaterialModule],
      providers: [{ provide: SpaceService, useValue: spaceServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(PdfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
