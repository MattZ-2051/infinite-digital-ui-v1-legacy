import DateTime from 'luxon/src/datetime.js';

export const formatCountdown = (date: string): string => {
  //Iso to local time
  const startDayInLocal = DateTime.fromISO('2021-04-21T23:00:00.000Z'); //date format ISO-8601 - GMT
  
  const now = DateTime.local();
  const diff = startDayInLocal.diff(now, [
    'years',
    'months',
    'days',
    'hours',
    'minutes',
  ]).toObject();
  
  const monthsLeft = diff.months as number;
  const daysLeft = diff.days as number;
  const hoursLeft = diff.hours as number;
  const minutesLeft = Math.round(diff.minutes) as number;

  if(daysLeft === 0) return `${hoursLeft}h ${Math.round(minutesLeft)}m`
  if (daysLeft < 28) return `${daysLeft}d ${hoursLeft}h ${minutesLeft}m`;
  return `${monthsLeft}m ${daysLeft}d`
};