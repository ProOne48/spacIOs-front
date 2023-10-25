import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Space } from '../../../models/space';
import { SpaceService } from '../../../services/space.service';
import { StatisticsService } from '../../../services/statistics.service';
import { StatisticsUsage } from '../../../models/statistics';

@Component({
  selector: 'app-space-reduced-info',
  templateUrl: './space-reduced-info.component.html',
  styleUrls: ['./space-reduced-info.component.scss']
})
export class SpaceReducedInfoComponent implements OnInit {
  // TODO: Add reserving functionality and  basic info about space
  space!: Space;

  statistics!: StatisticsUsage;

  averageSpaceUseData: number[] = [];

  totalSpaceUseData: number[] = [];

  labels: string[] = [];

  constructor(
    private spaceService: SpaceService,
    private route: ActivatedRoute,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.spaceService.getReducedSpace(params['spaceId']).subscribe((space) => {
        this.space = space;

        this.statisticsService.getStatisticsById(this.space.id).subscribe((statistics) => {
          this.statistics = statistics;

          this.averageSpaceUseData = this.statistics.getAverageUseData();
          this.totalSpaceUseData = this.statistics.getTotalUseData();
          this.labels = this.statistics.getLabels();
        });
      });
    });
  }
}
