import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CreateSpaceInterface } from '../../definitions/space.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Space } from '../../models/space';
import { SpaceInfoModalComponent } from '../space/space-info-modal/space-info-modal.component';
import { SpaceOwner } from '../../models/space-owner';
import { SpaceService } from '../../services/space.service';
import { SpacesGridComponent } from '../space/spaces-grid/spaces-grid.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  user?: SpaceOwner;

  spaces?: Space[];

  @ViewChild('spacesTable') spacesTable?: SpacesGridComponent;

  constructor(private spaceService: SpaceService, private dialog: MatDialog, private snackbar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.spaceService.getActualSpaces().subscribe((spaces) => {
      this.spaces = spaces.items;
    });
  }

  addSpace(): void {
    const dialogRef = this.dialog.open(SpaceInfoModalComponent, {
      width: '35%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      const space: CreateSpaceInterface = result;

      if (space) {
        this.spaceService.createSpace(space).subscribe(() => {
          this.snackbar.open('Space created successfully', '', { duration: 2000 });
        });
      }
    });
  }
}
