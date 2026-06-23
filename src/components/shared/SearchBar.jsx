import { useEffect, useRef, useCallback } from 'react';
import './SearchBar.css';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  onSearch,
}) {
  const debounceRef = useRef(null);

  const debouncedSearch = useCallback(
    (val) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSearch?.(val);
      }, 300);
    },
    [onSearch]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    onChange?.(val);
    debouncedSearch(val);
  };

  const handleClear = () => {
    onChange?.('');
    onSearch?.('');
  };

  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <span className="search-bar__icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      {value && (
        <button className="search-bar__clear" onClick={handleClear} aria-label="Clear search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
