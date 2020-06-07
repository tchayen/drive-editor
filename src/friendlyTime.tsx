export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const MONTH = 30 * DAY;
export const YEAR = 12 * MONTH;

const UNITS = [SECOND, MINUTE, HOUR, DAY, MONTH, YEAR];

export function* nextInterval() {
  let interval = 0;
  yield interval;

  let unit = 0;

  while (unit < UNITS.length - 1) {
    while (interval < UNITS[unit + 1]) {
      interval += UNITS[unit];
      yield interval;
    }
    unit += 1;
  }

  while (true) {
    interval += UNITS[unit];
    yield interval;
  }
}

const format = (ms: number, singular: string, plurar: string, unit: number) => {
  const amount = Math.floor(ms / unit);

  if (amount < 2) {
    return `${singular} ago`;
  }
  return `${amount} ${plurar} ago`;
};

export default (ms: number) => {
  if (isNaN(ms) || !isFinite(ms)) {
    throw new Error(`Wrong value provided: ${ms}`);
  }

  if (ms < SECOND) {
    return "second ago";
  } else if (ms < MINUTE) {
    return "minute ago";
  } else if (ms < HOUR) {
    return format(ms, "minute", "minutes", MINUTE);
  } else if (ms < DAY) {
    return format(ms, "hour", "hours", HOUR);
  } else if (ms < MONTH) {
    return format(ms, "day", "days", DAY);
  } else if (ms < YEAR) {
    return format(ms, "month", "months", MONTH);
  } else {
    return format(ms, "year", "years", YEAR);
  }
};
