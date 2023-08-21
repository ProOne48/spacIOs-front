import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpaceService } from '../../services/space.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-form-modal',
  templateUrl: './pdf-form-modal.component.html',
  styleUrls: ['./pdf-form-modal.component.scss']
})
export class PdfFormModalComponent {
  file?: File;
  constructor() {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
}
