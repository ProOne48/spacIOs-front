import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceReduced } from '../../models/space';
import { SpaceService } from '../../services/space.service';
import { Statistics } from '../../models/statistics';
import { StatisticsService } from '../../services/statistics.service';
import { Table } from '../../models/table';
import { TableService } from '../../services/table.service';
import { getDayOfWeek } from '../../utils/functions';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit {
  pdfSrc!: ArrayBuffer;
  space!: SpaceReduced;
  table?: Table;
  dataLoaded = false;

  constructor(
    private spaceService: SpaceService,
    private tableService: TableService,
    private routerParams: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.dataLoaded = false;
    this.routerParams.params.subscribe((params) => {
      this.spaceService.getPdf(params['spaceId']).subscribe((data: ArrayBuffer) => {
        this.pdfSrc = data;

        this.spaceService.getReducedSpace(params['spaceId']).subscribe((space) => {
          this.space = space;
          this.table = this.space.getTable(params['tableId']);

          this.routerParams.data.subscribe((data) => {
            if (data['public']) {
              this.insertStatistics();
              this.occupyTable(this.table?.id || 0);
              this.downloadPdf();
              window.history.back();
            }
          });
        });
      });
      this.dataLoaded = true;
    });
  }

  insertStatistics(): void {
    const statistics: Statistics = new Statistics();
    statistics.spaceId = this.space.id;
    statistics.dayOfWeek = getDayOfWeek();
    statistics.duration = 30;
    statistics.startDate = new Date();
    statistics.startDate.setHours(statistics.startDate.getHours() + 1);
    statistics.tableId = this.table?.id;
    statistics.people = this.table?.nChairs;

    this.statisticsService.insertStatistics(statistics).subscribe();
  }

  occupyTable(tableId: number): void {
    this.spaceService.occupyTable(this.space.id, tableId).subscribe(
      (space) => {
        this.space = space;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadPdf(): void {
    const pdfUrl = URL.createObjectURL(new Blob([this.pdfSrc], { type: 'application/pdf' }));
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = this.space.name + '.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
