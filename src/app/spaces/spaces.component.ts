import { Component, ViewChild } from '@angular/core';
import { CreateSpaceInterface } from '../../definitions/space.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpaceInfoModalComponent } from '../space-info-modal/space-info-modal.component';
import { SpaceService } from '../../services/space.service';
import { SpacesGridComponent } from '../spaces-grid/spaces-grid.component';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss']
})
export class SpacesComponent {
  @ViewChild('spacesTable') spacesTable?: SpacesGridComponent;
  constructor(private spaceService: SpaceService, private dialog: MatDialog, private snackbarService: MatSnackBar) {}

  addSpace(): void {

  }
}
