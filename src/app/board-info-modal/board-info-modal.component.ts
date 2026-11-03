import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@modules/angular/material.module';

import { Table } from '../../models/table';

@Component({
  selector: 'app-board-info-modal',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './board-info-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./board-info-modal.component.scss']
})
export class BoardInfoModalComponent {
  private builder = inject(FormBuilder);
  data = inject<Table>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<BoardInfoModalComponent>>(MatDialogRef);

  form: FormGroup;
  constructor() {
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
