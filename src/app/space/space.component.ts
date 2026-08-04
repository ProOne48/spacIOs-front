import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaterialModule } from '@modules/angular/material.module';
import { ChartsModule } from '@modules/integrations/charts.module';
import { lastValueFrom } from 'rxjs';

import { ConfirmModalInterface, DialogType } from '../../definitions/dialog.interface';
import { StatisticsDate, StatisticsFormat, filters, formats } from '../../definitions/statistics.interface';
import { QRCodeModalInterface, TableModalInterface } from '../../definitions/table.interface';
import { Space } from '../../models/space';
import { StatisticsUsage } from '../../models/statistics';
import { Table } from '../../models/table';
import { SpaceService } from '../../services/space.service';
import { StatisticsService } from '../../services/statistics.service';
import { TableService } from '../../services/table.service';
import { BoardInfoModalComponent } from '../board-info-modal/board-info-modal.component';
import { BoardsTableComponent } from '../boards-table/boards-table.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PdfFormModalComponent } from '../pdf-form-modal/pdf-form-modal.component';
import { QrModalComponent } from '../qr-modal/qr-modal.component';
import { StatisticsChartComponent } from '../statistics-chart/statistics-chart.component';

import { SpaceInfoModalComponent } from './space-info-modal/space-info-modal.component';

@Component({
  selector: 'app-space',
  imports: [MaterialModule, ChartsModule, BoardsTableComponent, StatisticsChartComponent, FormsModule, RouterLink],
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit {
  private spaceService = inject(SpaceService);
  private tableService = inject(TableService);
  private statisticsService = inject(StatisticsService);
  private routerParams = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

  space: Space = new Space();

  statistics!: StatisticsUsage;

  averageSpaceUseData: number[] = [];

  totalSpaceUseData: number[] = [];

  labels: string[] = [];

  statisticsDate: StatisticsDate = StatisticsDate.Week;
  statisticsFormat: StatisticsFormat = StatisticsFormat.DAY;

  ngOnInit(): void {
    this.routerParams.params.subscribe(async (params) => {
      const spaceId = params['id'];
      this.space = await lastValueFrom(this.spaceService.getSpaceById(spaceId));

      const date = this.getDate(this.statisticsDate);

      this.statistics = await lastValueFrom(
        this.statisticsService.getStatisticsById(spaceId, date, this.statisticsFormat)
      );

      this.averageSpaceUseData = this.statistics.getAverageUseData();
      this.totalSpaceUseData = this.statistics.getTotalUseData();
      this.labels = this.statistics.getLabels(this.statisticsFormat);
    });
  }

  editSpace(): void {
    const dialogRef = this.dialog.open(SpaceInfoModalComponent, {
      data: this.space,
      width: '45%',
      height: 'fit-content'
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

  async deleteSpace(): Promise<void> {
    const dialogData: ConfirmModalInterface = {
      title: 'Delete space',
      message: 'Are you sure you want to delete this space?',
      type: DialogType.ALERT
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      width: '35%'
    });

    const result = await lastValueFrom(dialogRef.afterClosed());
    if (!result) {
      return;
    }
    await lastValueFrom(this.spaceService.deleteSpace(this.space));
    this.snackbar.open('Space deleted successfully', '', { duration: 2000 });

    this.router.navigate(['/home']);
  }

  uploadPDF(): void {
    const dialogRef = this.dialog.open(PdfFormModalComponent, {
      data: this.space.id,
      width: '50%'
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

  async editBoard(tableData: TableModalInterface): Promise<void> {
    const tableUpdated = await lastValueFrom(this.tableService.updateTable(tableData));
    this.space.tables?.forEach((table: Table) => {
      if (table.id === tableUpdated.id) {
        table = tableUpdated;
        this.snackbar.open('Board updated successfully', '', { duration: 2000 });
      }
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

  updateStatistics(format?: StatisticsFormat): void {
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
