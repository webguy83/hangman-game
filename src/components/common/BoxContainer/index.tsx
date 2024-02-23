import React from 'react';
import './BoxContainer.scss';

interface BoxContainerProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const BoxContainer: React.FC<BoxContainerProps> = ({ title, children }) => {
  const renderTitle = () => {
    return <div className='box-title'>{title}</div>;
  };

  return (
    <div className='box-container'>
      {renderTitle()}
      {children}
    </div>
  );
};

export default BoxContainer;
