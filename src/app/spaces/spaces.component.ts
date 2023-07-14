import { Component, ViewChild } from "@angular/core";
import { SpaceService } from "../../services/space.service";
import { MatDialog } from "@angular/material/dialog";
import { SpaceInfoModalComponent } from "../space-info-modal/space-info-modal.component";
import { createSpaceInterface } from "../../definitions/space.interface";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SpacesTableComponent } from "../spaces-table/spaces-table.component";

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss']
})
export class SpacesComponent {


  @ViewChild('spacesTable') spacesTable?: SpacesTableComponent;
  constructor(
    private spaceService: SpaceService,
    private dialog: MatDialog,
    private snackbarService: MatSnackBar
  ) {
  }

  addSpace(){
    const dialogRef = this.dialog.open(SpaceInfoModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      const space: createSpaceInterface = result;

      if (space) {
        this.spaceService.createSpace(space).subscribe((newSpace) => {
          this.snackbarService.open('Space created successfully', '', {duration: 2000});
          this.spacesTable?.ngOnInit();
        });
      }

    })
  }
}
