import React from 'react';
import styled from 'styled-components';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const StickyNavBar = styled.div`
  position: sticky;
  width: 100%;
  top: 0;
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
`;

const SearchInput = styled.input`
  padding: 8px;
`;

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
