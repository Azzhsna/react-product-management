import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, onSearch, placeholder = "Search..." }) => {
  const [localValue, setLocalValue] = useState(value || '');

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(localValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localValue, onSearch]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const handleClear = () => {
    setLocalValue('');
    if (onSearch) onSearch('');
  };

  return (
    <div className="search-bar">
      <div className="search-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
      />
      {localValue && (
        <button className="search-clear" onClick={handleClear} aria-label="Clear search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
