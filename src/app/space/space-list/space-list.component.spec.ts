import { ComponentFixture, TestBed } from '@angular/core/testing';

import { globalImports, materialImports } from '../../app.module';
import { SpaceListComponent } from './space-list.component';
import { SpaceServiceMock } from '../../../../test_assets/mocks/space-service.mock';

describe('SpaceListComponent', () => {
  let component: SpaceListComponent;
  let fixture: ComponentFixture<SpaceListComponent>;
  const spaceServiceMock: SpaceServiceMock = new SpaceServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceListComponent],
      imports: [...materialImports, ...globalImports],
      providers: [{ provide: SpaceServiceMock, useValue: spaceServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
