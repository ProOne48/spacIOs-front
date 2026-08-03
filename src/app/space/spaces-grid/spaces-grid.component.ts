import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@modules/angular/material.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { Space } from '../../../models/space';

@Component({
  selector: 'app-spaces-grid',
  imports: [NgxSkeletonLoaderModule, RouterModule, CommonModule, MaterialModule],
  templateUrl: './spaces-grid.component.html',
  styleUrls: ['./spaces-grid.component.scss']
})
export class SpacesGridComponent {
  @Input() spaces?: Space[];

  gridSkeleton = new Array(8);

  constructor(private router: Router, private snackbar: MatSnackBar, private dialog: MatDialog) {}

  goToSpace(id?: number): void {
    this.router.navigate(['/space', id]);
  }

  get dataLoaded(): boolean {
    return !!this.spaces;
  }

  get hasSpaces(): boolean | undefined {
    return this.spaces && this.spaces?.length > 0;
  }
}
