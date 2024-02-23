import React from 'react';
import BoxContainer from '../common/BoxContainer'; // Adjust the path as necessary
import Button from '../common/Button';
import './Dialog.scss';

interface DialogProps {
  title: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ title }) => {
  // Handler functions
  const onContinueClick = () => {
    /* ... */
  };
  const onNewCategoryClick = () => {
    /* ... */
  };
  const onQuitClick = () => {
    /* ... */
  };

  return (
    <div className='dialog-backdrop'>
      <BoxContainer title={title}>
        <Button theme='blue' onClick={onContinueClick}>
          Continue
        </Button>
        <Button theme='blue' onClick={onNewCategoryClick}>
          New Category
        </Button>
        <Button theme='pink' onClick={onQuitClick}>
          Quit Game
        </Button>
      </BoxContainer>
    </div>
  );
};

export default Dialog;
