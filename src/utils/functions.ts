import { DayOfWeek } from '../definitions/statistics.interface';

export function getDayOfWeek(): DayOfWeek {
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
