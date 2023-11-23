import React from 'react';
import styled from 'styled-components';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const StickyNavBar = styled.div`
  position: sticky;
  top: 0;
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
  z-index: 100;
`;

const SearchInput = styled.input`
  margin-top: 10px;
  padding: 8px;
`;

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => (
  <StickyNavBar>
    <h1>Auto Repair Shop App</h1>
    <SearchInput
      type="text"
      placeholder="Search by customer name"
      value={searchTerm}
      onChange={e => onSearchChange(e.target.value)}
    />
  </StickyNavBar>
);
export default SearchBar;
