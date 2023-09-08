import {ChangeDetectorRef, Component, EventEmitter, Inject, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpaceService } from '../../services/space.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from "@angular/forms";

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
  ) {

  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  // TODO: Implement Drop Event
  onDrop(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();

    this.isDragging = false;

    const files = event.dataTransfer?.files[0];
    if(files){
      if(files.type === 'application/pdf') {
        this.file = files;
      } else {
        this.snackBar.open('Only PDF files are allowed', '', { duration: 2000 });
      }
    }
    this.changeDetector.detectChanges();
  }

  onFileSelected(event: any) {
    this.isDragging = false;
    this.file = event.target.files[0];
  }

  closeModal() {
    this.file = undefined;
    // Close the modal
    this.dialogRef.close();
  }
  protected readonly ondragover = ondragover;
  protected readonly close = close;
}
