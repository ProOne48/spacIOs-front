import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceReduced } from '../../models/space';
import { SpaceService } from '../../services/space.service';
import { StatisticsService } from '../../services/statistics.service';
import { Statistics } from '../../models/statistics';
import { DayOfWeek } from '../../definitions/statistics.interface';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit {
  pdfSrc!: ArrayBuffer;
  space!: SpaceReduced;

  constructor(
    private spaceService: SpaceService,
    private routerParams: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.routerParams.params.subscribe((params) => {
      this.spaceService.getPdf(params['id']).subscribe((data: ArrayBuffer) => {
        this.pdfSrc = data;
      });

      this.spaceService.getReducedSpace(params['id']).subscribe((space) => {
        this.space = space;
        this.routerParams.data.subscribe((data) => {
          if (data['public']) {
          }
        });
      });
    });
  }

  insertStatistics(): void {
    const statistics: Statistics = new Statistics();
    statistics.spaceId = this.space.id;
    statistics.dayOfWeek = this.getDayOfWeek();
    statistics.duration = 30;
    statistics.startDate = new Date();
    //  TODO: Add table id to route and get it from there
  }

  getDayOfWeek(): DayOfWeek {
    switch (new Date().getDay()) {
      case 0:
        return DayOfWeek.Sunday;
      case 1:
        return DayOfWeek.Monday;
      case 2:
        return DayOfWeek.Tuesday;
      case 3:
        return DayOfWeek.Wednesday;
      case 4:
        return DayOfWeek.Thursday;
      case 5:
        return DayOfWeek.Friday;
      case 6:
        return DayOfWeek.Saturday;
      default:
        return DayOfWeek.Monday;
    }
  }
}
