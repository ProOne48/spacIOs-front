import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@modules/angular/material.module';
import { PdfViewerModule } from '@modules/integrations/pdf-viewer.module';
import { EMPTY, lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SpaceReduced } from '../../models/space';
import { Statistics } from '../../models/statistics';
import { Table } from '../../models/table';
import { SpaceService } from '../../services/space.service';
import { StatisticsService } from '../../services/statistics.service';
import { getDayOfWeek } from '../../utils/functions';

@Component({
  selector: 'app-pdf-view',
  imports: [PdfViewerModule, MaterialModule],
  templateUrl: './pdf-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit {
  private spaceService = inject(SpaceService);
  private routerParams = inject(ActivatedRoute);
  private statisticsService = inject(StatisticsService);

  pdfSrc: WritableSignal<ArrayBuffer> = signal<ArrayBuffer>(new ArrayBuffer(0));
  space: WritableSignal<SpaceReduced> = signal<SpaceReduced>(new SpaceReduced());
  table: WritableSignal<Table> = signal<Table>(new Table());
  dataLoaded: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.dataLoaded.set(false);
    this.routerParams.params.subscribe(async (params) => {
      const spaceId = params['spaceId'];
      try {
        this.spaceService
          .getPdf(spaceId)
          .pipe(
            catchError(() => {
              this.dataLoaded.set(true);

              return EMPTY;
            })
          )
          .subscribe((pdfData: ArrayBuffer) => {
            this.pdfSrc.set(pdfData);
            this.dataLoaded.set(true);
          });

        this.space.set(await lastValueFrom(this.spaceService.getReducedSpace(spaceId)));
        console.log(this.space());

        this.routerParams.data.subscribe((data) => {
          if (data['public']) {
            if (params['tableId']) {
              this.table.set(this.space().getTable(params['tableId'] ?? 0) ?? new Table());
            }
            this.insertStatistics();
            this.occupyTable(this.table()?.id || 0);
            this.downloadPdf();
            window.history.back();
          }
        });
      } finally {
        this.dataLoaded.set(true);
      }
    });
  }

  insertStatistics(): void {
    const statistics: Statistics = new Statistics();
    statistics.spaceId = this.space().id;
    statistics.dayOfWeek = getDayOfWeek();
    statistics.duration = 30;
    statistics.startDate = new Date();
    statistics.startDate.setHours(statistics.startDate.getHours() + 1);
    statistics.tableId = this.table()?.id;
    statistics.people = this.table()?.nChairs;

    this.statisticsService.insertStatistics(statistics).subscribe();
  }

  occupyTable(tableId: number): void {
    this.spaceService.occupyTable(this.space().id, tableId).subscribe(
      (space) => {
        this.space.set(space);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  downloadPdf(): void {
    const pdfUrl = URL.createObjectURL(new Blob([this.pdfSrc()], { type: 'application/pdf' }));
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = this.space().name + '.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
