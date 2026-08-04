import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@modules/angular/material.module';

import { Space } from '../../../models/space';

@Component({
  selector: 'app-space-info-modal',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './space-info-modal.component.html',
  styleUrls: ['./space-info-modal.component.scss']
})
export class SpaceInfoModalComponent {
  private dialogRef = inject<MatDialogRef<SpaceInfoModalComponent>>(MatDialogRef);
  private builder = inject(FormBuilder);
  data = inject<Space>(MAT_DIALOG_DATA);

  public form: FormGroup;
  constructor() {
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
