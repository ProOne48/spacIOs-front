import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StatisticsDate, StatisticsFormat, filters, formats } from '../../definitions/statistics.interface';
import { BoardInfoModalComponent } from '../board-info-modal/board-info-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfFormModalComponent } from '../pdf-form-modal/pdf-form-modal.component';
import { QRCodeModalInterface } from '../../definitions/table.interface';
import { QrModalComponent } from '../qr-modal/qr-modal.component';
import { Space } from '../../models/space';
import { SpaceInfoModalComponent } from './space-info-modal/space-info-modal.component';
import { SpaceService } from '../../services/space.service';
import { StatisticsService } from '../../services/statistics.service';
import { StatisticsUsage } from '../../models/statistics';
import { Table } from '../../models/table';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {
  space: Space = new Space();

  statistics!: StatisticsUsage;

  averageSpaceUseData: number[] = [];

  totalSpaceUseData: number[] = [];

  labels: string[] = [];

  statisticsDate: StatisticsDate = StatisticsDate.Week;
  statisticsFormat: StatisticsFormat = StatisticsFormat.DAY;
  constructor(
    private spaceService: SpaceService,
    private tableService: TableService,
    private statisticsService: StatisticsService,
    private routerParams: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.routerParams.params.subscribe((params) => {
      const spaceId = params['id'];
      this.spaceService.getSpaceById(spaceId).subscribe((space) => {
        this.space = space;
      });

      const date = this.getDate(this.statisticsDate);

      this.statisticsService.getStatisticsById(spaceId, date, this.statisticsFormat).subscribe((statistics) => {
        this.statistics = statistics;

        this.averageSpaceUseData = this.statistics.getAverageUseData();
        this.totalSpaceUseData = this.statistics.getTotalUseData();
        this.labels = this.statistics.getLabels(this.statisticsFormat);
      });
    });
  }

  editSpace(): void {
    const dialogRef = this.dialog.open(SpaceInfoModalComponent, {
      data: this.space,
      width: '35%'
    });

    dialogRef.afterClosed().subscribe((spaceData) => {
      if (spaceData) {
        this.spaceService.updateSpace(spaceData).subscribe((spaceUpdated: Space) => {
          this.snackbar.open('Space updated successfully', '', { duration: 2000 });
          this.space = spaceUpdated;
        });
      }
    });
  }

  deleteSpace(): void {
    this.spaceService.deleteSpace(this.space).subscribe(() => {
      this.snackbar.open('Space deleted successfully', '', { duration: 2000 });

      this.router.navigate(['/home']);
    });
  }

  uploadPDF(): void {
    const dialogRef = this.dialog.open(PdfFormModalComponent, {
      data: this.space.id,
      width: '35%'
    });

    dialogRef.afterClosed().subscribe((pdf: File) => {
      if (pdf) {
        this.spaceService.uploadPDF(pdf, this.space.id).subscribe(() => {
          this.snackbar.open('PDF uploaded successfully', '', { duration: 2000 });
        });
      }
    });
  }
  // Functions for the board table

  addBoard(): void {
    const dialogRef = this.dialog.open(BoardInfoModalComponent, {
      width: '35%'
    });

    dialogRef.afterClosed().subscribe((board) => {
      if (board) {
        this.spaceService.addTableToSpace(this.space, board).subscribe((space: Space) => {
          this.space = space;
          this.snackbar.open('Board added successfully', '', { duration: 2000 });
        });
      }
    });
  }

  editBoard(board: Table): void {
    this.tableService.updateTable(board).subscribe(() => {
      this.space.tables?.forEach((table: Table) => {
        if (table.id === board.id) {
          table = board;
          this.snackbar.open('Board updated successfully', '', { duration: 2000 });
        }
      });
    });
  }

  deleteBoard(board: Table): void {
    this.spaceService.deleteTableFromSpace(this.space.id, board.id).subscribe(() => {
      this.space.tables = this.space.tables?.filter((table: Table) => table.id !== board.id);
      this.snackbar.open('Board deleted successfully', '', { duration: 2000 });
    });
    if (this.space.maxCapacity != null && board.nChairs != undefined) {
      this.space.maxCapacity = this.space.maxCapacity - board.nChairs;
    }
  }

  getQRCode(board: Table): void {
    this.tableService.getQRCode(board.id).subscribe((response) => {
      const modalData: QRCodeModalInterface = {
        qrCode: response,
        tableNumber: board.tableNumber,
        tableId: board.id,
        spaceId: this.space.id
      };

      this.dialog.open(QrModalComponent, {
        data: modalData,
        width: '35%'
      });
    });
  }

  updateStatistics(time?: StatisticsDate, format?: StatisticsFormat): void {
    if (time) {
      this.statisticsDate = time;
    }

    if (format) {
      this.statisticsFormat = format;
    }

    const date = this.getDate(this.statisticsDate);

    this.statisticsService.getStatisticsById(this.space.id, date, this.statisticsFormat).subscribe((statistics) => {
      this.statistics = statistics;
      this.averageSpaceUseData = this.statistics.getAverageUseData();
      this.totalSpaceUseData = this.statistics.getTotalUseData();
      this.labels = this.statistics.getLabels(this.statisticsFormat);
    });
  }

  getDate(time: StatisticsDate): Date {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);

    switch (time) {
      case StatisticsDate.Week:
        date.setDate(date.getDate() - 7);
        break;
      case StatisticsDate.Month:
        date.setDate(date.getDate() - 30);
        break;
      case StatisticsDate.Year:
        date.setDate(date.getDate() - 365);
        break;
    }

    return date;
  }

  protected readonly filters = filters;
  protected readonly formats = formats;
}
