import React, { useState } from "react";
import styles from './SearchBar.module.css';

function SearchBar (props) {
  const [term, setTerm] = useState('');

  function passTerm() {
    props.onSearch(term);
  }
  function handleTermChange({target}) {
    setTerm(target.value)
  }
    return (
        <div className={styles.SearchBar}>
        <input  
          onChange={handleTermChange}
          placeholder="Enter A Song, Album, or Artist"
        />
        <button onClick={passTerm} className={styles.SearchButton} >
          SEARCH
        </button>
      </div>
        );
}

export default SearchBar; 