import React from 'react';
import BoxContainer from '../common/BoxContainer'; // Adjust the path as necessary
import Button from '../common/Button';
import Modal from 'react-modal';
import './Dialog.scss';

interface DialogProps {
  isOpen: boolean;
  onRequestClose: () => void;
  titleText?: 'You Win' | 'You Lose' | 'Paused' | null;
}

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '2rem',
    transform: 'translate(-50%, -50%)',
    border: 'none', // Remove default borders
    background: 'transparent', // Use BoxContainer for background
    overflow: 'visible', // Prevent BoxContainer from being clipped,
    width: '100%',
    maxWidth: '59rem',
  },
  overlay: {
    background: 'linear-gradient(180deg, rgba(26, 4, 58, 0.75) 0%, rgba(21, 18, 120, 0.75) 70.31%, rgba(43, 22, 119, 0.75) 100%)',
  },
};

const Dialog: React.FC<DialogProps> = ({ titleText, isOpen, onRequestClose }) => {
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
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} shouldCloseOnOverlayClick={false} contentLabel='Example Modal'>
      <BoxContainer titleText={titleText}>
        <div className='buttons'>
          <Button theme='blue' onClick={onContinueClick}>
            {titleText === "Paused" ? "Continue" : "Play Again!"}
          </Button>
          <Button theme='blue' onClick={onNewCategoryClick}>
            New Category
          </Button>
          <Button theme='pink' onClick={onQuitClick}>
            Quit Game
          </Button>
        </div>
      </BoxContainer>
    </Modal>
  );
};

export default Dialog;
