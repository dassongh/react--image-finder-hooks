import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState('');

  const formHandler = e => {
    e.preventDefault();

    if (input === '') return toast('Type what you would like to find');

    onSubmit(input);
    setInput('');
    e.target.reset();
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={formHandler}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
