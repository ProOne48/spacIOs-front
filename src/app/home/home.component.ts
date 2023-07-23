import { AuthService } from '../../services/auth/auth.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {SpaceInfoModalComponent} from "../space-info-modal/space-info-modal.component";
import {CreateSpaceInterface} from "../../definitions/space.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {SpaceService} from "../../services/space.service";
import {SpacesGridComponent} from "../spaces-grid/spaces-grid.component";
import {Space} from "../../models/space";
import {SpaceOwner} from "../../models/space-owner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user?: SpaceOwner;

  spaces?: Space[];

  @ViewChild('spacesTable') spacesTable?: SpacesGridComponent;

  constructor(
    private authService: AuthService,
    private spaceService: SpaceService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
    ) {}

  ngOnInit() {
    this.authService.fillUserData().subscribe((spaceOwner: SpaceOwner) => {
      this.user = spaceOwner;
      this.spaces = spaceOwner.spaces;
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

  editSpace(space: Space) {
    const dialogRef = this.dialog.open(SpaceInfoModalComponent, {
      data: space,
      width: '35%'
    })


    dialogRef.afterClosed().subscribe((result) => {

      const space_data: Space = result;
      if (space_data) {
        this.spaceService.updateSpace(space_data).subscribe((space_updated: Space) => {
          this.spaces?.forEach((space: Space) => {
            if (space.id == space_updated.id) {
              space = space_updated;
              this.snackbar.open('Space updated successfully', '', { duration: 2000 });
              // this.spacesTable?.ngOnInit();
            }
          })
        });
      }
    });
  }

  deleteSpace(spaceToDelete: Space) {
    this.spaceService.deleteSpace(spaceToDelete).subscribe(() => {
      this.spaces?.forEach((space: Space, index: number) => {
        if (space.id == spaceToDelete.id) {
          this.spaces?.splice(index, 1);
        }
      })
      // this.spacesTable?.ngOnInit();
      this.snackbar.open('Space deleted successfully', '', { duration: 2000 });
    });
  }
}
