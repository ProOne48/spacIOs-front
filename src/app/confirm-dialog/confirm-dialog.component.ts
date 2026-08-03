import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@modules/angular/material.module';

import { ConfirmModalInterface, DialogType } from '../../definitions/dialog.interface';

interface ConfirmData {
  confirmText: string;
  icon: string;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [MaterialModule, CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  protected data: ConfirmModalInterface = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  protected confirmData?: ConfirmData;

  ngOnInit(): void {
    if (!this.data.type) {
      this.data.type = DialogType.CONFIRM;
    }

    this.confirmData = this.getTypeData();
  }

  getTypeData(): ConfirmData {
    switch (this.data.type) {
      case DialogType.ALERT:
        return { confirmText: 'Confirm', icon: 'warning' };
      case DialogType.CONFIRM:
        return { confirmText: 'Confirm', icon: 'info' };
      default:
        return { confirmText: 'Confirm', icon: 'info' };
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  confirmAndClose(): void {
    this.dialogRef.close(true);
  }

  protected readonly confirm = confirm;
}
