import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '@modules/angular/material.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { Space } from '../../../models/space';
import { SpaceService } from '../../../services/space.service';

import { SpaceItemComponent } from './space-item/space-item.component';

@Component({
  selector: 'app-space-list',
  imports: [MaterialModule, NgxSkeletonLoaderModule, SpaceItemComponent],
  templateUrl: './space-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./space-list.component.scss']
})
export class SpaceListComponent implements OnInit {
  private spaceService = inject(SpaceService);
  private router = inject(Router);

  spaces?: Space[];

  ngOnInit(): void {
    this.spaceService.getSpaces().subscribe((spaces) => {
      this.spaces = spaces.items;
    });
  }

  get dataLoaded(): boolean {
    return !!this.spaces;
  }
}
