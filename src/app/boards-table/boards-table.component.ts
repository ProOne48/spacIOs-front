import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Table } from '../../models/table';
import { MatDialog } from '@angular/material/dialog';
import { BoardInfoModalComponent } from '../board-info-modal/board-info-modal.component';
import { TableModalInterface } from '../../definitions/table.interface';

@Component({
  selector: 'app-boards-table',
  templateUrl: './boards-table.component.html',
  styleUrls: ['./boards-table.component.scss']
})
export class BoardsTableComponent {
  @Input() boards: Table[] = [];

  @Output() getQR: EventEmitter<Table> = new EventEmitter<Table>();

  @Output() editBoard: EventEmitter<Table> = new EventEmitter<Table>();

  @Output() deleteBoard: EventEmitter<Table> = new EventEmitter<Table>();

  displayedColumns: string[] = ['table_number', 'n_chairs', 'status', 'reservable', 'actions'];

  constructor(private dialog: MatDialog) {}

  edit(board: Table) {
    const dialogRef = this.dialog.open(BoardInfoModalComponent, { data: board, width: '25%' });

    dialogRef.afterClosed().subscribe((boardData: TableModalInterface) => {
      if (boardData) {
        boardData.id = board.id;
        this.editBoard.emit(boardData);
      }
    });
  }

  delete(board: Table) {
    this.deleteBoard.emit(board);
  }

  getQRCode(board: Table) {
    this.getQR.emit(board);
  }
}
