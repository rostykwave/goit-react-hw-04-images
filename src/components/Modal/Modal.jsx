import { createPortal } from 'react-dom';
import { StyledModal, ModalBody } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    console.log('componentDidMount');
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      console.log('componentWillUnmount');
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
      console.log(onClose);
      console.log('overlay clicked');
    }
  };

  return createPortal(
    <StyledModal onClick={handleOverlayClick}>
      <ModalBody>{children}</ModalBody>
    </StyledModal>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
