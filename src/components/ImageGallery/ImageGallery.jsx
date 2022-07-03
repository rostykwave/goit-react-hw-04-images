import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';
// import { Modal } from 'components/Modal/Modal';
import { ToastContainer } from 'react-toastify';
import { Box } from 'styleConfig/Box';
import { GalleryList } from './GalleryList/GalleryList';
// import { useState } from 'react';
import { Button } from 'components/Button/Button';

export const ImageGallery = ({
  status,
  images,
  leftPages,
  error,
  loadMore,
}) => {
  return (
    <>
      {images.length > 0 && <GalleryList images={images} />}

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
