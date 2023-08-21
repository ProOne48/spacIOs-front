import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpaceService } from '../../services/space.service';
import { Space } from '../../models/space';
import { ActivatedRoute, Router } from '@angular/router';
import { SpaceInfoModalComponent } from '../space-info-modal/space-info-modal.component';
import { Table } from '../../models/table';
import { TableService } from '../../services/table.service';
import { BoardInfoModalComponent } from '../board-info-modal/board-info-modal.component';
import { PdfFormModalComponent } from '../pdf-form-modal/pdf-form-modal.component';
import {QRCodeModalInterface} from "../../definitions/table.interface";
import {QrModalComponent} from "../qr-modal/qr-modal.component";
@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {
  space: Space = new Space();

  constructor(
    private spaceService: SpaceService,
    private tableService: TableService,
    private routerParams: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.routerParams.params.subscribe((params) => {
      this.spaceService.getSpaceById(params['id']).subscribe((space) => {
        this.space = space;
      });
    });
  }

  editSpace() {
    const dialogRef = this.dialog.open(SpaceInfoModalComponent, {
      data: this.space,
      width: '35%'
    });

    dialogRef.afterClosed().subscribe((space_data) => {
      if (space_data) {
        this.spaceService.updateSpace(space_data).subscribe((space_updated: Space) => {
          this.snackbar.open('Space updated successfully', '', { duration: 2000 });
          this.space = space_updated;
        });
      }
    });
  }

  deleteSpace() {
    this.spaceService.deleteSpace(this.space).subscribe(() => {
      this.snackbar.open('Space deleted successfully', '', { duration: 2000 });

      this.router.navigate(['/home']);
    });
  }

  uploadPDF() {
    const dialogRef = this.dialog.open(PdfFormModalComponent, {
      data: this.space.id,
      width: '35%'
    });

    dialogRef.afterClosed().subscribe((pdf: File) => {
      if (pdf) {
        this.spaceService.uploadPDF(pdf, this.space.id).subscribe((response) => {
          this.snackbar.open('PDF uploaded successfully', '', { duration: 2000 });
        });
      }
    });
  }
  // Functions for the board table

  addBoard() {
    const dialogRef = this.dialog.open(BoardInfoModalComponent, {
      width: '35%'
    });

    dialogRef.afterClosed().subscribe((board) => {
      console.log(board);
      if (board) {
        this.spaceService.addTableToSpace(this.space, board).subscribe((space: Space) => {
          this.space = space;
          this.snackbar.open('Board added successfully', '', { duration: 2000 });
        });
      }
    });
  }

  editBoard(board: Table) {
    this.tableService.editTable(board).subscribe((boardEdited) => {
      this.space.tables?.forEach((table: Table) => {
        if (table.id === board.id) {
          table = board;
          this.snackbar.open('Board updated successfully', '', { duration: 2000 });
        }
      });
    });
  }

  deleteBoard(board: Table) {
    this.tableService.deleteTable(board.id).subscribe(() => {
      this.space.tables = this.space.tables?.filter((table: Table) => table.id !== board.id);
      this.snackbar.open('Board deleted successfully', '', { duration: 2000 });
    });
  }

  getQRCode(board: Table) {
    this.tableService.getQRCode(board.id).subscribe((response) => {
      console.log(response);
      const modalData: QRCodeModalInterface = {
        qrCode: response,
        tableNumber: board.tableNumber
      }

      const dialogRef = this.dialog.open(QrModalComponent, {
        data: modalData,
        width: '35%'
      });
    })

  }
}
