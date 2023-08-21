import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {QRCodeModalInterface} from "../../definitions/table.interface";

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss']
})
export class QrModalComponent implements OnInit {
  QRurl: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QRCodeModalInterface,
  ) {}

  ngOnInit(): void {
    this.QRurl = URL.createObjectURL(this.data.qrCode)
  }

}
