import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Space } from '../../../models/space';

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
      description: this.builder.control(this.data?.description ? this.data.description : ''),
      id: this.builder.control(this.data?.id ? this.data.id : undefined),
      duration: this.builder.control(this.data?.duration ? this.data.duration : undefined)
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
