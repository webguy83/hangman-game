import React from 'react';
import './BoxContainer.scss';

interface BoxContainerProps {
  title: React.ReactNode; // The title is now required
  children: React.ReactNode;
}

const BoxContainer: React.FC<BoxContainerProps> = ({ title, children }) => {
  // Check if the title is a string and wrap it in an <h2>, otherwise render it directly
  const renderTitle = () => {
    if (typeof title === 'string') {
      return <h2 className='box-title'>{title}</h2>;
    }
    // Assume if it's not a string, it's a JSX element (like an image)
    // It can be wrapped in a div for consistency or returned as is
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
