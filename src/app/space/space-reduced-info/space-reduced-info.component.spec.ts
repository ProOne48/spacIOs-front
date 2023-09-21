import { ComponentFixture, TestBed } from '@angular/core/testing';

import { globalImports, materialImports } from '../../app.module';
import { SpaceReducedInfoComponent } from './space-reduced-info.component';
import { SpaceService } from '../../../services/space.service';
import { SpaceServiceMock } from '../../../../test_assets/mocks/space-service.mock';

describe('SpaceReducedInfoComponent', () => {
  let component: SpaceReducedInfoComponent;
  let fixture: ComponentFixture<SpaceReducedInfoComponent>;
  const spaceServiceMock: SpaceServiceMock = new SpaceServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceReducedInfoComponent],
      imports: [...globalImports, ...materialImports],
      providers: [{ provide: SpaceService, useValue: spaceServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceReducedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
