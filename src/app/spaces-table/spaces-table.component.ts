import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Space } from '../../models/space';
import { SpaceService } from '../../services/space.service';
import {MatDialog} from "@angular/material/dialog";
import {SpaceInfoModalComponent} from "../space-info-modal/space-info-modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-spaces-table',
  templateUrl: './spaces-table.component.html',
  styleUrls: ['./spaces-table.component.scss']
})
export class SpacesTableComponent implements OnInit {
  spaces: Space[] = [];
  displayedColumns: string[] = ['name', 'capacity', 'actions'];

  constructor(
    private spaceService: SpaceService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    ) {}
  ngOnInit() {
    this.spaceService.getActualSpaces().subscribe((spaces) => {
      if (spaces.items){
        this.spaces = spaces.items;
      }
      else{
        this.spaces = [];
      }
    });
  }

  editSpace(space: Space) {
    const dialogRef = this.dialog.open(SpaceInfoModalComponent, {
      data: space,
      width: '35%'
    })


    dialogRef.afterClosed().subscribe((result) => {

      console.log(result);
      const space_data: Space = result;
      if (space_data) {
        this.spaceService.updateSpace(space_data).subscribe((space_updated: Space) => {
          this.spaces.forEach((space: Space) => {
            if (space.id == space_updated.id) {
              space = space_updated;
              this.snackbar.open('Space updated successfully', '', { duration: 2000 });
              this.ngOnInit();
            }
          })
        });
      }
    });
  }

  deleteSpace(space: Space) {}
}
