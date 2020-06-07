import { useEffect, useCallback } from "react";

type Letter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "w"
  | "v"
  | "x"
  | "y"
  | "z";

const useShortcuts = (
  map: {
    [key in Letter]?: (event: KeyboardEvent) => void;
  }
) => {
  const handleShortcuts = useCallback(
    (event: KeyboardEvent) => {
      const isCmd = event.ctrlKey || event.metaKey;
      const altOrShift = event.altKey || event.shiftKey;

      if (!isCmd || altOrShift) {
        return;
      }

      const key = event.key.toLowerCase();

      if (map[key]) {
        map[key](event);
        event.preventDefault();
      }
    },
    [map]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleShortcuts);
    return () => window.removeEventListener("keydown", handleShortcuts);
  }, [handleShortcuts]);
};

export default useShortcuts;
