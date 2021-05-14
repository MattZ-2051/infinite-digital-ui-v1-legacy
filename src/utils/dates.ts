import DateTime from 'luxon/src/datetime.js';
import { format, parseISO } from 'date-fns';

export const formatCountdown = (date: Date): string => {
  //Iso to local time
  try {
    const startDayInLocal = DateTime.fromISO(date.toISOString()); //ISO-8601
    const now = DateTime.now();

    const diff = startDayInLocal
      .diff(now, ['years', 'months', 'days', 'hours', 'minutes'])
      .toObject();

    const monthsLeft = diff.months as number;
    const daysLeft = diff.days as number;
    const hoursLeft = diff.hours as number;
    const minutesLeft = Math.round(diff.minutes) as number;

    if (daysLeft === 0) return `${hoursLeft}h ${Math.round(minutesLeft)}m`;
    if (daysLeft < 28) return `${daysLeft}d ${hoursLeft}h ${minutesLeft}m`;
    if (monthsLeft === 0) return `${daysLeft}d`;
    return `${monthsLeft}m ${daysLeft}d`;
  } catch (e) {
    console.error(`formatCountdown: ${e}`);
    return '';
  }
};

export const dateToPrettyString = (date: Date): string => {
  date = new Date(date);
  const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options); // returns string: April 29, 2021
};

export const formatDate = (date: Date): string => {
  let parsedDate = date;
  if (typeof parsedDate === 'string') {
    parsedDate = parseISO(parsedDate);
  }
  return format(parsedDate, 'PPPp');
};
