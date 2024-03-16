export enum DayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

export enum StatisticsDate {
  Today,
  Week,
  Month,
  Year
}

export enum StatisticsFormat {
  DAY = 'day',
  HOUR = 'hour'
}

export interface DateLabels {
  label: string;
  value: StatisticsDate;
}

export interface FormatLabels {
  label: string;
  value: StatisticsFormat;
}

export const filters: DateLabels[] = [
  { label: 'Today', value: StatisticsDate.Today },
  { label: 'This week', value: StatisticsDate.Week },
  { label: 'This month', value: StatisticsDate.Month },
  { label: 'This year', value: StatisticsDate.Year }
];

export const formats: FormatLabels[] = [
  { label: 'Hourly', value: StatisticsFormat.HOUR },
  { label: 'Daily', value: StatisticsFormat.DAY }
];
