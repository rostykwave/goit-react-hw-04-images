import { Modal } from 'components/Modal/Modal';
import { useModal } from 'hooks';
import PropTypes from 'prop-types';
// import { useState } from 'react';
import { StyledImage, StyledItem } from './Item.styled';

export const Item = ({
  webformatURL,
  largeImageURL,
  imageAlt,
  // handleModalOpen,
}) => {
  // const onGalleryItemClick = () => {
  //   handleModalOpen(largeImageURL, imageAlt);
  // };

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    // <StyledItem onClick={onGalleryItemClick}>
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
  // handleModalOpen: PropTypes.func.isRequired,
};
