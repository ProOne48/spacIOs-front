import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialModule } from '@modules/angular/material.module';

import { QRCodeModalInterface } from '../../definitions/table.interface';

@Component({
  selector: 'app-qr-modal',
  imports: [MaterialModule],
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss']
})
export class QrModalComponent implements OnInit {
  data = inject<QRCodeModalInterface>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<QRCodeModalInterface>>(MatDialogRef);
  private router = inject(Router);

  qrUrl = '';
  redirectRoute = `/public/space/${this.data.spaceId}/pdf/${this.data.tableId}`;

  ngOnInit(): void {
    this.qrUrl = URL.createObjectURL(this.data.qrCode);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  redirect(): void {
    this.router.navigateByUrl(this.redirectRoute);
    this.closeModal();
  }
}
