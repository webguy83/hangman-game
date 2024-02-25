import React from 'react';
import './Step.scss';

interface StepProps {
  number: string;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <div className='step'>
      <div className='step-number'>{number}</div>
      <h3 className='step-title'>{title}</h3>
      <p className='step-description'>{description}</p>
    </div>
  );
};

export default Step;
