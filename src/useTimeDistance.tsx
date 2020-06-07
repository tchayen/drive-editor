import { useEffect, useState } from "react";
import friendlyTime from "./friendlyTime";

export default (): [string | null, (date: Date) => void] => {
  const [start, setStart] = useState<Date | null>(null);
  const [friendly, setFriendly] = useState<string | null>(null);

  useEffect(() => {
    if (start !== null) {
      setTimeout(() => {
        setFriendly(friendlyTime(new Date().getTime() - start.getTime()));
      }, 2000);
    }
  }, [start]);

  return [friendly, setStart];
};
