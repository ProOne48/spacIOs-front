import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Space } from '../../../models/space';

@Component({
  selector: 'app-spaces-grid',
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
