import type { DateTime } from 'luxon';

export interface ICalendarDay {
  date: DateTime;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  weekdayShort: string;
  isPartOfPreviousMonth: boolean;
  isPartOfNextMonth: boolean;
  isSelected: boolean;
}

export interface IMonth {
  name: string;
  value: number;
}
