import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@modules/angular/material.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { SpaceServiceMock } from '../../../../test_assets/mocks/space-service.mock';

import { SpaceItemComponent } from './space-item/space-item.component';
import { SpaceListComponent } from './space-list.component';

describe('SpaceListComponent', () => {
  let component: SpaceListComponent;
  let fixture: ComponentFixture<SpaceListComponent>;
  const spaceServiceMock: SpaceServiceMock = new SpaceServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpaceListComponent, SpaceItemComponent],
      imports: [MaterialModule, NgxSkeletonLoaderModule],
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
