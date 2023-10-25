import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceReduced } from '../../models/space';
import { SpaceService } from '../../services/space.service';
import { Statistics } from '../../models/statistics';
import { StatisticsService } from '../../services/statistics.service';
import { getDayOfWeek } from '../../utils/functions';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit {
  pdfSrc!: ArrayBuffer;
  space!: SpaceReduced;
  tableId!: number;

  constructor(
    private spaceService: SpaceService,
    private routerParams: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.routerParams.params.subscribe((params) => {
      this.tableId = params['tableId'];
      this.spaceService.getPdf(params['spaceId']).subscribe((data: ArrayBuffer) => {
        this.pdfSrc = data;
      });

      this.spaceService.getReducedSpace(params['spaceId']).subscribe((space) => {
        this.space = space;
        this.routerParams.data.subscribe((data) => {
          if (data['public']) {
            this.insertStatistics();
          }
        });
      });
    });
  }

  insertStatistics(): void {
    const statistics: Statistics = new Statistics();
    statistics.spaceId = this.space.id;
    statistics.dayOfWeek = getDayOfWeek();
    statistics.duration = 30;
    statistics.startDate = new Date();
    statistics.tableId = this.tableId;
    statistics.people = this.space.getPeople(this.tableId);

    this.statisticsService.insertStatistics(statistics).subscribe();
  }
}
