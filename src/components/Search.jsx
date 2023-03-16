import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CloseIcon, SearchIcon } from './icons';
import NotesWrap from './NotesWrap';
import ViewWrap from './ViewWrap';
import Note from './Note';

const Search = () => {
  const { notes } = useSelector((state) => state.note);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [query, setQuery] = useState('');

  const filterNotes = () => {
    const filtered = notes.filter((note) => {
      const titleMatcth = note.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const contentMatch = note.content
        .toLowerCase()
        .includes(query.toLowerCase());
      return !note.trashed && (titleMatcth || contentMatch);
    });
    setFilteredNotes(filtered);
  };

  useEffect(() => {
    filterNotes();
  }, [query]);

  return (
    <ViewWrap>
      <SearchWrap>
        <SearchField query={query} setQuery={setQuery} />
      </SearchWrap>
      <NotesWrap>
        {query &&
          filteredNotes.map((note) => <Note note={note} key={note.id} />)}
      </NotesWrap>
    </ViewWrap>
  );
};

const SearchField = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hashQuery = location.hash.split(':')[1];
  const searchRef = useRef();

  const onSearchIcon = () => {
    searchRef.current.focus();
  };

  const onClearSearch = () => {
    setQuery('');
    navigate(`/note#search`);
  };

  useEffect(() => {
    if (hashQuery) {
      setQuery(hashQuery);
    }
  }, [hashQuery]);

  useEffect(() => {
    if (query) {
      navigate(`/note#search/text:${query}`);
    }
  }, [query]);

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
      {query && (
        <span className="sicon icon-close" onClick={onClearSearch}>
          <CloseIcon />
        </span>
      )}
    </SearchFieldWrap>
  );
};

export default Search;

const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;
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
      box-shadow: ${(props) => props.theme.colors.shadow2};
    }
  }
`;
