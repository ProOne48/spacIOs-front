import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '@modules/angular/material.module';
import { lastValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CreateSpaceInterface } from '../../definitions/space.interface';
import { Space } from '../../models/space';
import { SpaceService } from '../../services/space.service';
import { SpaceInfoModalComponent } from '../space/space-info-modal/space-info-modal.component';
import { SpacesGridComponent } from '../space/spaces-grid/spaces-grid.component';

@Component({
  selector: 'app-home',
  imports: [MaterialModule, SpacesGridComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  spaces?: Space[];

  @ViewChild('spacesTable') spacesTable?: SpacesGridComponent;

  constructor(private spaceService: SpaceService, private dialog: MatDialog, private snackbar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.spaceService.getActualSpaces().subscribe((spaces) => {
      this.spaces = spaces.items;
    });
  }

  async addSpace(): Promise<void> {
    const dialogRef = this.dialog.open(SpaceInfoModalComponent, {
      width: '35%'
    });

    const result: CreateSpaceInterface = await lastValueFrom(dialogRef.afterClosed());

    if (result) {
      const space = await lastValueFrom(
        this.spaceService.createSpace(result).pipe(
          catchError((error) => {
            this.snackbar.open('An error adding the table has occured please try again', '', { duration: 2000 });

            return of(null);
          })
        )
      );
      if (!space) {
        return;
      }
      this.spaces?.push(space);
      this.snackbar.open('Space created successfully', '', { duration: 2000 });
    }
  }
}
