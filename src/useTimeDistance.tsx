import { useEffect, useState, useRef } from "react";
import getFriendlyTime, { nextInterval } from "./getFriendlyTime";

export default (
  waitUntilMs: number = 0
): [string | null, (date: Date | null) => void] => {
  const [start, setStart] = useState<Date | null>(null);
  const [friendly, setFriendly] = useState<string | null>(null);
  const generator = useRef(nextInterval());
  let ref: any = useRef(null);

  useEffect(() => {
    if (start !== null) {
      const loop = () => {
        const nextTimeout = generator.current.next().value;
        ref.current = setTimeout(() => {
          const delta = new Date().getTime() - start.getTime();
          const friendlyTime = getFriendlyTime(delta);
          const nextValue = delta < waitUntilMs ? null : friendlyTime;
          setFriendly(nextValue);
          loop();
        }, nextTimeout);
      };
      loop();
    }

    return () => {
      clearTimeout(ref.current);
      setFriendly(null);
    };
  }, [waitUntilMs, start]);

  if (friendly === null || start === null) {
    return [null, setStart];
  }

  return [friendly, setStart];
};
