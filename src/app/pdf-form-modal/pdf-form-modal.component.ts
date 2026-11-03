import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '@modules/angular/material.module';
import { PdfViewerModule } from '@modules/integrations/pdf-viewer.module';

@Component({
  selector: 'app-pdf-form-modal',
  imports: [MaterialModule, PdfViewerModule],
  templateUrl: './pdf-form-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./pdf-form-modal.component.scss']
})
export class PdfFormModalComponent {
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject<MatDialogRef<PdfFormModalComponent>>(MatDialogRef);
  private changeDetector = inject(ChangeDetectorRef);

  file?: File;
  isDragging = false;

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
}
