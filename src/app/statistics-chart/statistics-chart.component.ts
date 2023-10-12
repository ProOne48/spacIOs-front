import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {ChartData, ChartType} from 'chart.js';

@Component({
  selector: 'app-statistics-chart',
  templateUrl: './statistics-chart.component.html',
  styleUrls: ['./statistics-chart.component.scss']
})
export class StatisticsChartComponent implements OnChanges {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() dataLabel = '';
  @Input() barChartLegend = true;
  @Input() barChartType: ChartType = 'bar';
  dataChart: ChartData<'bar'>;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor() {
    this.dataChart = {
      labels: this.labels,
      datasets: [
        {
          label: this.dataLabel,
          data: this.data,
        }
      ]
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.data = changes['data'].currentValue;
      this.dataChart.datasets[0].data = this.data;
    }

    if (changes['dataLabel']) {
      this.dataLabel = changes['dataLabel'].currentValue;
      this.dataChart.datasets[0].label = this.dataLabel;
    }

    if(changes['labels']) {
      this.labels = changes['labels'].currentValue;
      this.dataChart.labels = this.labels;
    }
    console.log(this.dataChart);
  }
}
