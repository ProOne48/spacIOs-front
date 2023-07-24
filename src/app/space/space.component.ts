import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpaceService } from '../../services/space.service';
import {Space} from "../../models/space";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {

  space?: Space

  constructor(
    private spaceService: SpaceService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarService: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.spaceService.getSpaceById(params['id']).subscribe(space => {
        this.space = space;
      });
    });
  }

}
