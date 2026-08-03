import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@modules/angular/material.module';

import { GeneralDialogInterface } from '../../definitions/dialog.interface';

@Component({
  selector: 'app-general-dialog',
  imports: [MaterialModule, CommonModule],
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.scss']
})
export class GeneralDialogComponent {
  protected data: GeneralDialogInterface = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<GeneralDialogComponent>);

  closeDialog(): void {
    this.dialogRef.close();
  }

  doActionAndClose(): void {
    this.data.action();
    this.closeDialog();
  }
}
