import React, { useState, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';

const StatsCounter = ({ end, duration = 2000, suffix = '', label }) => {
  const [ref, isInView] = useInView({ threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-designColor mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-textColor/80 text-sm md:text-base">{label}</div>
    </div>
  );
};

export default StatsCounter;
