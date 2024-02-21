import React from 'react';
import './BoxContainer.scss'; 

interface BoxContainerProps {
  title?: string; // Optional, as the start screen may not need a title
  children: React.ReactNode; // The content inside the box
}

const BoxContainer: React.FC<BoxContainerProps> = ({ title, children }) => {
  return (
    <div className="box-container">
      {title && <h2 className="box-title">{title}</h2>}
      {children}
    </div>
  );
};

export default BoxContainer;