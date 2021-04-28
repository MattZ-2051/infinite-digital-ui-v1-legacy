import DateTime from 'luxon/src/datetime.js';
import moment from 'moment';

export const formatCountdown = (date: Date): string => {
  //Iso to local time
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
  return `${monthsLeft}m ${daysLeft}d`;
};

export const dateToPrettyString = (date: Date): string => {
  return moment(date).format('LLL');
};
