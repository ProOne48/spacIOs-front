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
  @Input() spaces?: Space[] = [];

  constructor(private router: Router, private snackbar: MatSnackBar, private dialog: MatDialog) {}

  goToSpace(id?: number): void {
    this.router.navigate(['/space', id]);
  }
}
