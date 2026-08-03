import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@modules/angular/material.module';
import { StatisticsChartComponent } from 'src/app/statistics-chart/statistics-chart.component';

import { SpaceServiceMock } from '../../../../test_assets/mocks/space-service.mock';
import { SpaceService } from '../../../services/space.service';

import { SpaceReducedInfoComponent } from './space-reduced-info.component';

describe('SpaceReducedInfoComponent', () => {
  let component: SpaceReducedInfoComponent;
  let fixture: ComponentFixture<SpaceReducedInfoComponent>;
  const spaceServiceMock: SpaceServiceMock = new SpaceServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceReducedInfoComponent, StatisticsChartComponent],
      imports: [MaterialModule],
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
