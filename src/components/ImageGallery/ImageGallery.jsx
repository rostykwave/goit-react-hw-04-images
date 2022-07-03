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
  // const [largeImage, setLargeImage] = useState({
  //   src: '',
  //   alt: '',
  // });
  // const [isOpen, setIsOpen] = useState(false);

  // const handleModalOpen = (largeImageURL, tags) => {
  //   setIsOpen(true);
  //   setLargeImage({
  //     src: largeImageURL,
  //     alt: tags,
  //   });
  // };

  // const handleModalClose = () => {
  //   setIsOpen(false);
  // };

  return (
    <>
      {images.length > 0 && (
        <GalleryList images={images} />
        // <GalleryList images={images} handleModalOpen={handleModalOpen} />
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

      {/* {isOpen && (
        <Modal onClose={handleModalClose}>
          <img src={largeImage.src} alt={largeImage.alt} />
        </Modal>
      )} */}
    </>
  );
};
// export class ImageGallery1 extends Component {
//   state = {
//     largeImage: {
//       src: '',
//       alt: '',
//     },
//     isOpen: false,
//   };

//   handleModalOpen = (largeImageURL, tags) => {
//     this.setState({
//       isOpen: true,
//       largeImage: {
//         src: largeImageURL,
//         alt: tags,
//       },
//     });
//   };

//   handleModalClose = () => {
//     this.setState({
//       isOpen: false,
//     });
//   };

//   render() {
//     const { status, images, leftPages, error, loadMore } = this.props;
//     const { isOpen, largeImage } = this.state;

//     return (
//       <>
//         {images.length > 0 && (
//           <GalleryList images={images} handleModalOpen={this.handleModalOpen} />
//         )}

//         {status === 'idle' && (
//           <Box textAlign="center" color="#c5c1c1">
//             Your gallery will appear here after search
//           </Box>
//         )}
//         {status === 'pending' && <Loader />}

//         {status === 'resolved' && leftPages && (
//           <Button type="button" onClick={loadMore}>
//             Load more
//           </Button>
//         )}

//         {status === 'rejected' && (
//           <Box color="red" textAlign="center">
//             {error.message}
//           </Box>
//         )}
//         <ToastContainer autoClose={3000} />

//         {isOpen && (
//           <Modal onClose={this.handleModalClose}>
//             <img src={largeImage.src} alt={largeImage.alt} />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

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
