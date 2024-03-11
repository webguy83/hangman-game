import React from 'react';
import BoxContainer from '../common/BoxContainer'; // Adjust the path as necessary
import Button from '../common/Button';
import Modal from 'react-modal';
import './Dialog.scss';
import { GameOutcome } from '../../types';

interface DialogProps {
  isOpen: boolean;
  onRequestClose: () => void;
  titleText?: GameOutcome;
  onNewCategory: () => void;
  onPlayAgainOrContinue: () => void;
  modalContentVisible: boolean;
  onQuit: () => void;
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
    border: 'none',
    background: 'transparent',
    overflow: 'visible',
    width: '100%',
    maxWidth: '59rem',
  },
  overlay: {
    background: 'linear-gradient(180deg, rgba(26, 4, 58, 0.75) 0%, rgba(21, 18, 120, 0.75) 70.31%, rgba(43, 22, 119, 0.75) 100%)',
  },
};

const Dialog: React.FC<DialogProps> = ({ titleText, isOpen, onRequestClose, onQuit, onNewCategory, onPlayAgainOrContinue, modalContentVisible }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} shouldCloseOnOverlayClick={false} contentLabel='Example Modal'>
      <div className={`modal-wrapper ${!modalContentVisible ? 'closing' : ''}`}>
        <BoxContainer titleText={titleText}>
          <div className='buttons'>
            <Button theme='blue' onClick={onPlayAgainOrContinue}>
              {titleText === GameOutcome.Paused ? 'Continue' : 'Play Again!'}
            </Button>
            <Button theme='blue' onClick={onNewCategory}>
              New Category
            </Button>
            <Button theme='pink' onClick={onQuit}>
              Quit Game
            </Button>
          </div>
        </BoxContainer>
      </div>
    </Modal>
  );
};

export default Dialog;
