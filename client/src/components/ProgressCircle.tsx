import React from 'react';

interface ProgressCircleProps {
  progress: number;
  size: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, size }) => {
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;

  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      style={{ transform: 'rotate(-90deg)' }}
      width={size}
      height={size}
    >
      <circle
        style={{
          fill: 'none',
          stroke: 'lightgray',
          strokeWidth: size * 0.1,
        }}
        cx={radius}
        cy={radius}
        r={radius - size * 0.05}
      />
      <circle
        style={{
          fill: 'none',
          stroke: '#452498',
          strokeWidth: size * 0.1,
          strokeDasharray: circumference,
          strokeDashoffset: progressOffset,
        }}
        cx={radius}
        cy={radius}
        r={radius - size * 0.05}
      />
    </svg>
  );
};

export default ProgressCircle;