import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QRCodeModalInterface } from '../../definitions/table.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss']
})
export class QrModalComponent implements OnInit {
  qrUrl = '';
  redirectRoute = `/public/space/${this.data.spaceId}/pdf/${this.data.tableId}`;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QRCodeModalInterface,
    private dialogRef: MatDialogRef<QRCodeModalInterface>,
    private router: Router
  ) {}

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
