import getFriendlyTime, {
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  nextInterval,
  MONTH,
  YEAR,
} from "./getFriendlyTime";

describe("getFriendlyTime", () => {
  it("for 0", () => {
    expect(getFriendlyTime(0)).toEqual("second ago");
  });

  it("for negative", () => {
    expect(getFriendlyTime(-100)).toEqual("second ago");
  });

  it("for less than second", () => {
    expect(getFriendlyTime(0.5 * SECOND)).toEqual("second ago");
  });

  it("for 5 seconds", () => {
    expect(getFriendlyTime(5 * SECOND)).toEqual("few ago");
  });

  it("for 1 minute", () => {
    expect(getFriendlyTime(MINUTE)).toEqual("minute ago");
  });

  it("for 1 minute 1 second", () => {
    expect(getFriendlyTime(MINUTE + SECOND)).toEqual("minute ago");
  });

  it("for 2 minutes 1 second", () => {
    expect(getFriendlyTime(2 * MINUTE + SECOND)).toEqual("2 minutes ago");
  });

  it("for 1 hour", () => {
    expect(getFriendlyTime(HOUR)).toEqual("hour ago");
  });

  it("for 16 days", () => {
    expect(getFriendlyTime(16 * DAY)).toEqual("16 days ago");
  });

  it("for 29 days", () => {
    expect(getFriendlyTime(29 * DAY)).toEqual("29 days ago");
  });

  it("for 30 days", () => {
    expect(getFriendlyTime(30 * DAY)).toEqual("month ago");
  });

  it("for 12 months", () => {
    expect(getFriendlyTime(12 * MONTH)).toEqual("year ago");
  });

  it("for 365 days", () => {
    expect(getFriendlyTime(365 * DAY)).toEqual("year ago");
  });

  it("for 1000 days", () => {
    expect(getFriendlyTime(1000 * DAY)).toEqual("2 years ago");
  });

  it("for Number.MAX_SAFE_INTEGER milliseconds", () => {
    expect(getFriendlyTime(Number.MAX_SAFE_INTEGER)).toEqual(
      "289583 years ago"
    );
  });

  it("for NaN", () => {
    expect(() => getFriendlyTime(NaN)).toThrowError(
      "Wrong value provided: NaN"
    );
  });

  it("for -Infinity", () => {
    expect(() => getFriendlyTime(-Infinity)).toThrowError(
      "Wrong value provided: -Infinity"
    );
  });

  it("for Infinity", () => {
    expect(() => getFriendlyTime(Infinity)).toThrowError(
      "Wrong value provided: Infinity"
    );
  });
});

describe("nextInterval", () => {
  it("works", () => {
    const getInterval = nextInterval();
    expect(getInterval.next().value).toEqual(0);
    expect(getInterval.next().value).toEqual(SECOND);
    expect(getInterval.next().value).toEqual(SECOND);

    for (let i = 0; i < 56; i++) {
      getInterval.next();
    }

    expect(getInterval.next().value).toEqual(SECOND);
    expect(getInterval.next().value).toEqual(SECOND);
    expect(getInterval.next().value).toEqual(MINUTE);

    for (let i = 0; i < 56; i++) {
      getInterval.next();
    }

    expect(getInterval.next().value).toEqual(MINUTE);
    expect(getInterval.next().value).toEqual(MINUTE);
    expect(getInterval.next().value).toEqual(HOUR);

    for (let i = 0; i < 20; i++) {
      getInterval.next();
    }

    expect(getInterval.next().value).toEqual(HOUR);
    expect(getInterval.next().value).toEqual(HOUR);
    expect(getInterval.next().value).toEqual(DAY);

    for (let i = 0; i < 26; i++) {
      getInterval.next();
    }

    expect(getInterval.next().value).toEqual(DAY);
    expect(getInterval.next().value).toEqual(DAY);
    expect(getInterval.next().value).toEqual(MONTH);

    for (let i = 0; i < 8; i++) {
      getInterval.next();
    }

    expect(getInterval.next().value).toEqual(MONTH);
    expect(getInterval.next().value).toEqual(MONTH);
    expect(getInterval.next().value).toEqual(YEAR);
    expect(getInterval.next().value).toEqual(YEAR);
    expect(getInterval.next().value).toEqual(YEAR);
    expect(getInterval.next().value).toEqual(YEAR);
  });
});
