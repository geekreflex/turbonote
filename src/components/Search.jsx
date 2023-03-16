import { useRef, useState } from 'react';
import styled from 'styled-components';
import { CloseIcon, SearchIcon } from './icons';
import ViewWrap from './ViewWrap';

const Search = () => {
  return (
    <ViewWrap>
      <SearchWrap>
        <div>
          <SearchField />
        </div>
      </SearchWrap>
    </ViewWrap>
  );
};

const SearchField = () => {
  const [query, setQuery] = useState('');
  const searchRef = useRef();

  const onSearchIcon = () => {
    searchRef.current.focus();
    console.log(searchRef.current.focus());
  };

  return (
    <SearchFieldWrap>
      <span className="sicon icon-search" onClick={onSearchIcon}>
        <SearchIcon />
      </span>
      <input
        ref={searchRef}
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <span className="sicon icon-close">
        <CloseIcon />
      </span>
    </SearchFieldWrap>
  );
};

export default Search;

const SearchWrap = styled.div``;
const SearchFieldWrap = styled.div`
  position: relative;
  width: 600px;
  max-width: 100%;
  display: flex;
  border-radius: 21px;
  align-items: center;

  .sicon {
    position: absolute;
    color: ${(props) => props.theme.colors.text3};
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    :hover {
      background-color: ${(props) => props.theme.colors.hover2};
    }
  }

  .icon-close {
    right: 10px;
  }

  .icon-search {
    left: 10px;
  }

  input {
    flex: 1;
    height: 50px;
    border-radius: 10px;
    border: none;
    outline: none;
    padding: 0 50px;
    font-size: 16px;
    transition: all 300ms;
    background-color: ${(props) => props.theme.colors.searchBg};
    color: ${(props) => props.theme.colors.text3};

    :focus {
    }
  }
`;
