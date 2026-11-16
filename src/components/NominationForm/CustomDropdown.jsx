import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import styles from './CustomDropdown.module.css';

const CustomDropdown = ({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error = false,
  searchable = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen, searchable]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (!isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    } else if (e.key === 'ArrowDown') {
      if (!isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    }
  };

  const selectedOption = options.find((opt) => 
    typeof opt === 'string' ? opt === value : opt.value === value
  );

  const displayLabel = selectedOption 
    ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label)
    : '';

  const filteredOptions = options.filter((opt) => {
    if (!searchTerm) return true;
    const label = typeof opt === 'string' ? opt : opt.label;
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSelect = (optVal) => {
    onChange(optVal);
    setIsOpen(false);
  };

  return (
    <div 
      className={`${styles.dropdownContainer} ${isOpen ? styles.containerActive : ''}`} 
      ref={dropdownRef}
    >
      <button
        type="button"
        id={name}
        className={`${styles.dropdownTrigger} ${error ? styles.inputError : ''} ${isOpen ? styles.triggerOpen : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={displayLabel ? styles.selectedText : styles.placeholderText}>
          {displayLabel || placeholder}
        </span>
        <ChevronDown 
          size={18} 
          className={`${styles.chevronIcon} ${isOpen ? styles.chevronRotated : ''}`} 
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="listbox">
          {searchable && (
            <div className={styles.searchBox}>
              <Search size={15} className={styles.searchIcon} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className={styles.optionsList}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const optVal = typeof opt === 'string' ? opt : opt.value;
                const optLabel = typeof opt === 'string' ? opt : opt.label;
                const isSelected = optVal === value;

                return (
                  <div
                    key={optVal}
                    role="option"
                    aria-selected={isSelected}
                    className={`${styles.optionItem} ${isSelected ? styles.optionSelected : ''}`}
                    onClick={() => handleSelect(optVal)}
                  >
                    <span className={styles.optionLabel}>{optLabel}</span>
                    {isSelected && <Check size={16} className={styles.checkIcon} />}
                  </div>
                );
              })
            ) : (
              <div className={styles.noResults}>No matching categories found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
