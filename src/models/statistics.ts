import { DayOfWeek, StatisticsFormat } from '../definitions/statistics.interface';
import { IJsonObject, autoserializeAs, autoserializeAsArray } from 'dcerialize';

export class Statistics {
  /**
   * Id of the statistics
   */
  @autoserializeAs(() => Number) id?: number;

  /**
   * Duration
   */
  @autoserializeAs(() => Number) duration?: number;

  /**
   * Start date
   */
  @autoserializeAs(() => Date, 'start_date') startDate?: Date;

  /**
   * Day of the week
   */
  @autoserializeAs(() => String, 'day_of_week') dayOfWeek?: DayOfWeek;

  /**
   * Number of people
   */
  @autoserializeAs(() => Number, 'n_people') people?: number;

  /**
   * Id of the space
   */
  @autoserializeAs(() => Number, 'space_id') spaceId?: number;

  /**
   * Id the Table
   */
  @autoserializeAs(() => Number, 'table_id') tableId?: number;

  static onSerialized(json: IJsonObject, instance: Statistics): void {
    json['start_date'] = instance.startDate?.toISOString();
  }

  /**
   * Constructor
   */
  constructor(
    id?: number,
    duration?: number,
    startDate?: Date,
    dayOfWeek?: DayOfWeek,
    people?: number,
    spaceId?: number,
    tableId?: number
  ) {
    this.id = id;
    this.duration = duration;
    this.startDate = startDate;
    this.dayOfWeek = dayOfWeek;
    this.people = people;
    this.spaceId = spaceId;
    this.tableId = tableId;
  }
}

export class StatisticsUsage {
  /**
   * Average Space Use
   */
  @autoserializeAs(() => Number, 'average_space_use') averageSpaceUse?: number;

  /**
   * Average Space Use per day
   */
  @autoserializeAsArray(() => StatisticsDay, () => Array, 'average_space_use_per_day')
  // eslint-disable-next-line indent
  averageSpaceUsePerDay?: StatisticsDay[];

  /**
   * Total Space Use
   */
  @autoserializeAs(() => Number, 'total_space_use') totalSpaceUse?: number;

  /**
   * Constructor
   * @param averageSpaceUse Average Space Use
   * @param averageSpaceUsePerDay Average Space Use per day
   * @param totalSpaceUse Total Space Use
   */
  constructor(averageSpaceUse?: number, averageSpaceUsePerDay?: StatisticsDay[], totalSpaceUse?: number) {
    this.averageSpaceUse = averageSpaceUse;
    this.averageSpaceUsePerDay = averageSpaceUsePerDay;
    this.totalSpaceUse = totalSpaceUse;
  }

  getDayLabels(): DayOfWeek[] {
    const labels = this.averageSpaceUsePerDay?.map((day) => day.day) ?? [];

    return labels as DayOfWeek[];
  }

  getHourLabels(): string[] {
    const labels = this.averageSpaceUsePerDay?.map((day) => day.hour?.toString()) ?? [];

    labels.sort((a, b) => {
      if (a && b) {
        return parseInt(a) - parseInt(b);
      }

      return 0;
    });

    return labels as string[];
  }

  getLabels(format?: StatisticsFormat): string[] {
    switch (format) {
      case StatisticsFormat.DAY:
        return this.getDayLabels();
      case StatisticsFormat.HOUR:
        return this.getHourLabels();
      default:
        return [];
    }
  }

  getAverageUseData(): number[] {
    const data = this.averageSpaceUsePerDay?.map((day) => day.averageSpaceUse) ?? [];

    return data as number[];
  }

  getTotalUseData(): number[] {
    const data = this.averageSpaceUsePerDay?.map((day) => day.totalSpaceUse) ?? [];

    return data as number[];
  }
}

export class StatisticsDay {
  /**
   * Day of the week
   */
  @autoserializeAs(() => String) day?: DayOfWeek;

  /**
   * Average Space Use
   */
  @autoserializeAs(() => Number, 'average_space_use') averageSpaceUse?: number;

  /**
   * Hour of the day
   */
  @autoserializeAs(() => Number) hour?: number;

  /**
   * Total Space Use
   */
  @autoserializeAs(() => Number, 'total_space_use') totalSpaceUse?: number;

  constructor(day?: DayOfWeek, averageSpaceUse?: number, hour?: number, totalSpaceUse?: number) {
    this.day = day;
    this.averageSpaceUse = averageSpaceUse;
    this.hour = hour;
    this.totalSpaceUse = totalSpaceUse;
  }
}
