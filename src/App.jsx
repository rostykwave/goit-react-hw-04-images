import { Searchbar } from './components/Searchbar/Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from 'styleConfig/Box';
import { fetchImagesAPI } from 'services/pixabay-api';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { useState } from 'react';
import { useEffect } from 'react';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [leftPages, setLeftPages] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState({ message: '' });
  const [status, setStatus] = useState(Status.IDLE);

  const handleFormSubmit = CurrentSearchQuery => {
    if (CurrentSearchQuery !== searchQuery) {
      setSearchQuery(CurrentSearchQuery);
      setPage(1);
      setImages([]);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        setStatus(Status.PENDING);
        const data = await fetchImagesAPI(searchQuery, page, perPage);
        // console.log(data);
        const images = data.hits;

        if (images.length === 0) {
          throw Error('There is no images found on this search result');
        }
        const totalHits = data.totalHits;
        const currentLeftPages = Math.ceil(totalHits / perPage) - page;

        setImages(prevImages => [...prevImages, ...images]);
        setStatus(Status.RESOLVED);
        setLeftPages(currentLeftPages);
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    }

    const perPage = 12;
    // console.log('fetch');

    searchQuery && fetchImages();
  }, [searchQuery, page]);

  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        status={status}
        images={images}
        leftPages={leftPages}
        error={error}
        loadMore={loadMore}
      />
    </Box>
  );
};
