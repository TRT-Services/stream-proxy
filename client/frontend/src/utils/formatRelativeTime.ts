/** Formats an ISO date string as a short relative time, e.g. "3 days ago". */
export function formatRelativeTime(isoDate: string): string {
  const then = new Date(isoDate).getTime();
  const now = Date.now();
  const diffSeconds = Math.max(1, Math.floor((now - then) / 1000));

  const units: [number, string][] = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4.345, 'week'],
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year'],
  ];

  let value = diffSeconds;
  let unitName = 'second';
  for (const [amount, name] of units) {
    if (value < amount) {
      unitName = name;
      break;
    }
    value = Math.floor(value / amount);
    unitName = name;
  }

  return `${value} ${unitName}${value !== 1 ? 's' : ''} ago`;
}
