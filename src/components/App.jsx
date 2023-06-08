import React, { useState, useEffect } from 'react';
import * as API from '../pixabay-api/pixabay-api';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const addImages = async () => {
      try {
        setIsLoading(true);
        const data = await API.getImages(searchName, currentPage);

        if (data.hits.length === 0) {
          alert('Sorry image not found...');
          return;
        }

        const normalizedImages = API.normalizedImages(data.hits);

        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setIsLoading(false);
        setError('');
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch (error) {
        setError('Something went wrong!');
        setIsLoading(false);
      }
    };

    if (!isFirstLoad || searchName !== '') {
      addImages();
    }
  }, [searchName, currentPage, isFirstLoad]);

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSubmit = query => {
    setSearchName(query);
    setImages([]);
    setCurrentPage(1);
    setIsFirstLoad(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {!isFirstLoad && images.length > 0 ? (
        <ImageGallery images={images} />
      ) : null}
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
      {!isFirstLoad &&
        images.length > 0 &&
        totalPages !== currentPage &&
        !isLoading && <Button onClick={loadMore} />}
    </div>
  );
};

export default App;
