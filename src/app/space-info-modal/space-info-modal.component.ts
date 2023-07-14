import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Space } from '../../models/space';

@Component({
  selector: 'app-space-info-modal',
  templateUrl: './space-info-modal.component.html',
  styleUrls: ['./space-info-modal.component.scss']
})
export class SpaceInfoModalComponent {
  public form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<SpaceInfoModalComponent>,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Space
  ) {
    this.form = this.builder.group({
      name: this.builder.control(this.data?.name ? this.data.name : '', [Validators.required]),
      description: this.builder.control(this.data?.description ? this.data.description : '')
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
