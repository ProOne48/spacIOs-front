import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Table } from '../../models/table';

@Component({
  selector: 'app-board-info-modal',
  templateUrl: './board-info-modal.component.html',
  styleUrls: ['./board-info-modal.component.scss']
})
export class BoardInfoModalComponent {
  form: FormGroup;
  constructor(
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Table,
    private dialogRef: MatDialogRef<BoardInfoModalComponent>
  ) {
    this.form = this.builder.group({
      tableNumber: this.builder.control(this.data?.tableNumber ? this.data.tableNumber : '', [Validators.required]),
      nChairs: this.builder.control(this.data?.nChairs ? this.data.nChairs : '', [Validators.required]),
      reservable: this.builder.control(this.data?.reservable ? this.data.reservable : false, [Validators.required])
    });

    if (this.data?.tableNumber) {
      this.form.controls['tableNumber'].disable();
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
