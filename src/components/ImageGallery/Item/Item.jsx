import { Modal } from 'components/Modal/Modal';
import { useModal } from 'hooks';
import PropTypes from 'prop-types';
import { StyledImage, StyledItem } from './Item.styled';

export const Item = ({ webformatURL, largeImageURL, imageAlt }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <StyledItem onClick={openModal}>
      <StyledImage src={webformatURL} alt={imageAlt} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={imageAlt} />
        </Modal>
      )}
    </StyledItem>
  );
};

Item.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};
