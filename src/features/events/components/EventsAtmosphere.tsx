import { useEffect, useState } from "react";

export default function EventsAtmosphere() {
  const [particles, setParticles] = useState<
    Array<{
      left: string;
      top: string;
      delay: string;
      duration: string;
      size: string;
    }>
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 32 }, (_, i) => ({
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 61 + 7) % 100}%`,
        delay: `${(i % 9) * -1.3}s`,
        duration: `${12 + (i % 12)}s`,
        size: `${2 + (i % 3)}px`,
      })),
    );
  }, []);

  return (
    <div
      aria-hidden="true"
      className="events-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="events-wheel events-wheel-one" />
      <div className="events-wheel events-wheel-two" />

      <div className="events-orbit events-orbit-one" />
      <div className="events-orbit events-orbit-two" />

      {particles.map((particle, i) => (
        <span
          key={i}
          className={`events-particle events-particle-${i % 3}`}
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
}