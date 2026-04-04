import { useEffect, useState, useRef } from "react";

function formatTime(date: Date): string {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function GlitchClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      className={`glitch-clock ${hovering ? "glitch-clock--active" : ""}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      data-text={time}
    >
      <span className="glitch-clock__text">{time}</span>
    </div>
  );
}
