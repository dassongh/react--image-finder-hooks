import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import api from './services/PixabayApi';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [modalAtributes, setModalAtributes] = useState([]);

  const searchBarHandler = value => {
    setSearchQuery(value);
    setResult([]);
    setPage(1);
  };

  useEffect(() => {
    if (searchQuery === '') return;

    setIsPending(true);

    api(searchQuery, page)
      .then(response => {
        if (response.total === 0) toast.warn('Could not find images with that name');

        setResult(s => {
          return [...s, ...response.hits];
        });
      })
      .catch(error => console.log(error))
      .finally(() => setIsPending(false));
  }, [searchQuery, page]);

  const openModalHandler = (url, tags) => {
    setModalAtributes([url, tags]);
    window.addEventListener('keydown', closeModalMethods);
  };

  const closeModalMethods = e => {
    if (e.currentTarget === e.target) setModalAtributes([]);
    if (e.code === 'Escape') setModalAtributes([]);
    window.removeEventListener('keydown', closeModalMethods);
  };

  return (
    <>
      <SearchBar onSubmit={searchBarHandler} />
      <ImageGallery images={result} clickHandler={openModalHandler} />

      {result.length > 0 && <Button text={'Load more'} onClick={() => setPage(s => s + 1)} />}

      {isPending && <Loader type="TailSpin" color="#00BFFF" height={80} width={80} className="Loader" />}

      {modalAtributes.length > 0 && (
        <Modal url={modalAtributes[0]} alt={modalAtributes[1]} onClick={closeModalMethods} />
      )}

      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
