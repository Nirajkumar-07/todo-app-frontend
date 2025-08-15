import { useEffect, useRef } from "react";

export default function Timer({ time, onTimerEnd }) {
  const timeRef = useRef(time);
  const spanRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRef.current > 0) timeRef.current -= 1;
      else {
        clearInterval(interval);
        onTimerEnd();
      }
      if (spanRef.current) {
        spanRef.current.textContent = timeRef.current;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <span ref={spanRef}>{timeRef.current}</span>;
}
