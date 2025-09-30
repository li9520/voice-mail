import { useEffect, useRef, useState } from "react";

export function useNow(
  enabled: boolean,
  interval: number,
  onTimeChange?: (now: number) => void
) {
  const onTimeChangeRef = useRef(onTimeChange);
  onTimeChangeRef.current = onTimeChange;
  const [now, setNow] = useState<number>();
  useEffect(() => {
    if (!enabled) {
      setNow(undefined);
      return;
    }
    const intervalId = setInterval(() => {
      setNow(Date.now());
      onTimeChangeRef.current?.(Date.now());
    }, interval);
    return () => clearInterval(intervalId);
  }, [enabled, interval]);
  return now ?? Date.now();
}

useNow.calculateCountUp = (
  now: number,
  startAt: number,
  timer: number,
  duration: number
) => {
  return Math.min(timer + (now - startAt), duration);
};

useNow.calculateTimer = (now: number, startAt: number) => {
  return now - startAt;
};
