import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Space } from '../../models/space';
import { SpaceService } from '../../services/space.service';
import {MatDialog} from "@angular/material/dialog";
import {SpaceInfoModalComponent} from "../space-info-modal/space-info-modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-spaces-grid',
  templateUrl: './spaces-grid.component.html',
  styleUrls: ['./spaces-grid.component.scss']
})
export class SpacesGridComponent {
  @Input() spaces?: Space[] = [];

  @Input() deleteSpace: Function = () => {};

  @Input() editSpace: Function = () => {};

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    ) {}

  goToSpace(id?: number): void {
    this.router.navigate(['/space', id]);
  }

}
