import { ComponentFixture, TestBed } from '@angular/core/testing';

import { globalImports, materialImports } from '../app.module';
import { PdfViewComponent } from './pdf-view.component';
import { SpaceService } from '../../services/space.service';
import { SpaceServiceMock } from '../../../test_assets/mocks/space-service.mock';

describe('PdfViewComponent', () => {
  let component: PdfViewComponent;
  let fixture: ComponentFixture<PdfViewComponent>;
  const spaceServiceMock: SpaceServiceMock = new SpaceServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfViewComponent],
      imports: [...globalImports, ...materialImports],
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
