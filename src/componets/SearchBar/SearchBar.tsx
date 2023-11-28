import React from 'react';
import { StickyNavBar, SearchInput } from './SearchBar.styles';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => (
  <StickyNavBar>
    <SearchInput
      type="text"
      placeholder="Search by customer name"
      value={searchTerm}
      onChange={e => onSearchChange(e.target.value)}
    />
  </StickyNavBar>
);
export default SearchBar;
