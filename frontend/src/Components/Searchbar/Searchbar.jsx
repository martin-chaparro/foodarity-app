// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useState } from 'react';
// eslint-disable-next-line import/no-duplicates
import { useDispatch } from 'react-redux';
import { searchProducts } from '../../redux/actions/productActions';
import styles from './Searchbar.module.css';

export default function SearchBar() {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  const [input, setInput] = useState('');

  function handleInputOnchange(e) {
    setInput(e.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      dispatch(searchProducts(input));
    }
  }

  return (
    <div className={styles.searchbarDiv}>
      <input
        className={styles.searchbar}
        value={input}
        onKeyPress={handleKeyPress}
        type="text"
        onChange={(e) => {
          handleInputOnchange(e);
        }}
        placeholder="Search.."
      />
    </div>
  );
}
