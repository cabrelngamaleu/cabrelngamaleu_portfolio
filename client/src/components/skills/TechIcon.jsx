import React from 'react';

const TechIcon = ({ Icon, size = 40 }) => {
  return (
    <div className="text-designColor">
      <Icon size={size} />
    </div>
  );
};

export default TechIcon;
