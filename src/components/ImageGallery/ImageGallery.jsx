import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import { Box } from 'styleConfig/Box';
import { GalleryList } from './GalleryList/GalleryList';
import { useState } from 'react';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { useModal } from 'hooks';

export const ImageGallery = ({
  status,
  images,
  leftPages,
  error,
  loadMore,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [largeImg, setLargeImg] = useState({ url: '', alt: '' });

  const handleModalOpen = largeImage => {
    setLargeImg(largeImage);
    openModal();
  };

  return (
    <>
      {images.length > 0 && (
        <GalleryList images={images} handleModalOpen={handleModalOpen} />
      )}

      {status === 'idle' && (
        <Box textAlign="center" color="#c5c1c1">
          Your gallery will appear here after search
        </Box>
      )}
      {status === 'pending' && <Loader />}

      {status === 'resolved' && leftPages && (
        <Button type="button" onClick={loadMore}>
          Load more
        </Button>
      )}

      {status === 'rejected' && (
        <Box color="red" textAlign="center">
          {error.message}
        </Box>
      )}
      <ToastContainer autoClose={3000} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <img src={largeImg.url} alt={largeImg.alt} />
        </Modal>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  leftPages: PropTypes.number.isRequired,
  error: PropTypes.PropTypes.object.isRequired,
  loadMore: PropTypes.func.isRequired,
};
