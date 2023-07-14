import { Component, ViewChild } from '@angular/core';
import { CreateSpaceInterface } from '../../definitions/space.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpaceInfoModalComponent } from '../space-info-modal/space-info-modal.component';
import { SpaceService } from '../../services/space.service';
import { SpacesTableComponent } from '../spaces-table/spaces-table.component';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss']
})
export class SpacesComponent {
  @ViewChild('spacesTable') spacesTable?: SpacesTableComponent;
  constructor(private spaceService: SpaceService, private dialog: MatDialog, private snackbarService: MatSnackBar) {}

  addSpace(): void {
    const dialogRef = this.dialog.open(SpaceInfoModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      const space: CreateSpaceInterface = result;

      if (space) {
        this.spaceService.createSpace(space).subscribe(() => {
          this.snackbarService.open('Space created successfully', '', { duration: 2000 });
          this.spacesTable?.ngOnInit();
        });
      }
    });
  }
}
