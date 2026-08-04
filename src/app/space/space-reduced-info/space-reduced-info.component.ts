import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '@modules/angular/material.module';
import { StatisticsChartComponent } from 'src/app/statistics-chart/statistics-chart.component';

import { Space } from '../../../models/space';
import { StatisticsUsage } from '../../../models/statistics';
import { SpaceService } from '../../../services/space.service';
import { StatisticsService } from '../../../services/statistics.service';

@Component({
  selector: 'app-space-reduced-info',
  imports: [MaterialModule, StatisticsChartComponent],
  templateUrl: './space-reduced-info.component.html',
  styleUrls: ['./space-reduced-info.component.scss']
})
export class SpaceReducedInfoComponent implements OnInit {
  private spaceService = inject(SpaceService);
  private route = inject(ActivatedRoute);
  private statisticsService = inject(StatisticsService);

  // TODO: Add reserving functionality and basic info about space
  space!: Space;

  statistics!: StatisticsUsage;

  averageSpaceUseData: number[] = [];

  totalSpaceUseData: number[] = [];

  labels: string[] = [];

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
