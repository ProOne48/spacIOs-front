import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pdf-form-modal',
  templateUrl: './pdf-form-modal.component.html',
  styleUrls: ['./pdf-form-modal.component.scss']
})
export class PdfFormModalComponent {
  file?: File;
  isDragging = false;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PdfFormModalComponent>,
    private changeDetector: ChangeDetectorRef,
    private builder: FormBuilder
  ) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isDragging = false;

    const files = event.dataTransfer?.files[0];
    if (files) {
      if (files.type === 'application/pdf') {
        this.file = files;
      } else {
        this.snackBar.open('Only PDF files are allowed', '', { duration: 2000 });
      }
    }
    this.changeDetector.detectChanges();
  }

  /* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
  onFileSelected(event: any): void {
    this.isDragging = false;
    if (event.target.files[0].type === 'application/pdf') {
      this.file = event.target.files[0];
    }
  }

  closeModal(): void {
    this.file = undefined;
    // Close the modal
    this.dialogRef.close();
  }
  protected readonly ondragover = ondragover;
  protected readonly close = close;
}
