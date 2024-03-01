import React from 'react';
import './HealthBar.scss';

interface HealthBarProps {
  health: number;
  maxHealth: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ health, maxHealth }) => {
  const healthPercentage = (health / maxHealth) * 100;

  return (
    <div className='health-bar-container' aria-label={`Health: ${healthPercentage.toFixed(0)}%`}>
      <div className='health-bar' style={{ width: `${healthPercentage}%` }}></div>
    </div>
  );
};

export default HealthBar;
