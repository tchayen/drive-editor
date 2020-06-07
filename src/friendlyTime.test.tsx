import friendlyTime, {
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  nextInterval,
  MONTH,
  YEAR,
} from "./friendlyTime";

describe("friendlyTime", () => {
  it("for 0", () => {
    expect(friendlyTime(0)).toEqual("second ago");
  });

  it("for negative", () => {
    expect(friendlyTime(-100)).toEqual("second ago");
  });

  it("for less than second", () => {
    expect(friendlyTime(0.5 * SECOND)).toEqual("second ago");
  });

  it("for 5 seconds", () => {
    expect(friendlyTime(5 * SECOND)).toEqual("minute ago");
  });

  it("for 1 minute", () => {
    expect(friendlyTime(MINUTE)).toEqual("minute ago");
  });

  it("for 1 minute 1 second", () => {
    expect(friendlyTime(MINUTE + SECOND)).toEqual("minute ago");
  });

  it("for 2 minutes 1 second", () => {
    expect(friendlyTime(2 * MINUTE + SECOND)).toEqual("2 minutes ago");
  });

  it("for 1 hour", () => {
    expect(friendlyTime(HOUR)).toEqual("hour ago");
  });

  it("for 16 days", () => {
    expect(friendlyTime(16 * DAY)).toEqual("16 days ago");
  });

  it("for 29 days", () => {
    expect(friendlyTime(29 * DAY)).toEqual("29 days ago");
  });

  it("for 30 days", () => {
    expect(friendlyTime(30 * DAY)).toEqual("month ago");
  });

  it("for 12 months", () => {
    expect(friendlyTime(12 * MONTH)).toEqual("year ago");
  });

  it("for 365 days", () => {
    expect(friendlyTime(365 * DAY)).toEqual("year ago");
  });

  it("for 1000 days", () => {
    expect(friendlyTime(1000 * DAY)).toEqual("2 years ago");
  });

  it("for Number.MAX_SAFE_INTEGER milliseconds", () => {
    expect(friendlyTime(Number.MAX_SAFE_INTEGER)).toEqual("289583 years ago");
  });

  it("for NaN", () => {
    expect(() => friendlyTime(NaN)).toThrowError("Wrong value provided: NaN");
  });

  it("for -Infinity", () => {
    expect(() => friendlyTime(-Infinity)).toThrowError(
      "Wrong value provided: -Infinity"
    );
  });

  it("for Infinity", () => {
    expect(() => friendlyTime(Infinity)).toThrowError(
      "Wrong value provided: Infinity"
    );
  });
});

describe("nextInterval", () => {
  it("works", () => {
    const getInterval = nextInterval();
    expect(getInterval.next().value).toEqual(0);
    expect(getInterval.next().value).toEqual(SECOND);
    expect(getInterval.next().value).toEqual(2 * SECOND);

    for (let i = 0; i < 56; i++) {
      getInterval.next();
    }

    expect(getInterval.next().value).toEqual(59 * SECOND);
    expect(getInterval.next().value).toEqual(MINUTE);
    expect(getInterval.next().value).toEqual(2 * MINUTE);

    for (let i = 0; i < 56; i++) {
      getInterval.next();
    }

    expect(getInterval.next().value).toEqual(59 * MINUTE);
    expect(getInterval.next().value).toEqual(HOUR);
    expect(getInterval.next().value).toEqual(2 * HOUR);

    for (let i = 0; i < 20; i++) {
      getInterval.next();
    }

    expect(getInterval.next().value).toEqual(23 * HOUR);
    expect(getInterval.next().value).toEqual(DAY);
    expect(getInterval.next().value).toEqual(2 * DAY);

    for (let i = 0; i < 26; i++) {
      getInterval.next();
    }

    expect(getInterval.next().value).toEqual(29 * DAY);
    expect(getInterval.next().value).toEqual(MONTH);
    expect(getInterval.next().value).toEqual(2 * MONTH);

    for (let i = 0; i < 8; i++) {
      getInterval.next();
    }

    expect(getInterval.next().value).toEqual(11 * MONTH);
    expect(getInterval.next().value).toEqual(YEAR);
    expect(getInterval.next().value).toEqual(2 * YEAR);
    expect(getInterval.next().value).toEqual(3 * YEAR);
    expect(getInterval.next().value).toEqual(4 * YEAR);
    expect(getInterval.next().value).toEqual(5 * YEAR);
  });
});
