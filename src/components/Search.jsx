import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, SearchIcon } from './icons';
import NotesWrap from './NotesWrap';
import ViewWrap from './ViewWrap';
import Note from './Note';

const Search = () => {
  const navigate = useNavigate();
  const { notes } = useSelector((state) => state.note);
  const { labels } = useSelector((state) => state.label);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('Search');
  const [selectedLabel, setSelectedLabel] = useState(null);

  const filterNotes = () => {
    const filtered = notes.filter((note) => {
      const titleMatcth = note.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const contentMatch = note.content
        .toLowerCase()
        .includes(query.toLowerCase());

      if (!note.trashed && (titleMatcth || contentMatch)) {
        // check if note has selected label
        if (selectedLabel === null) {
          return true;
        } else {
          return note.labels.includes(selectedLabel.id);
        }
      } else {
        return false; // if note is trashed or doesn't match search query, exclude it
      }
    });
    setFilteredNotes(filtered);
  };

  const onClearSearch = () => {
    setQuery('');
    setSelectedLabel(null);
    navigate(`/note#search`);
  };

  useEffect(() => {
    if (query) {
      navigate(`/note#search/text:${query}`);
    }
  }, [query]);

  useEffect(() => {
    filterNotes();
  }, [query, selectedLabel]);

  useEffect(() => {
    if (selectedLabel) {
      setPlaceholder(`Search within "${selectedLabel.name}"`);
    } else {
      setPlaceholder('Search');
    }
  }, [selectedLabel]);

  return (
    <ViewWrap>
      <SearchWrap>
        <SearchField
          query={query}
          setQuery={setQuery}
          placeholder={placeholder}
          clear={onClearSearch}
        />
        <Labels
          labels={labels}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
        />
      </SearchWrap>
      <NotesWrap>
        {(query || selectedLabel) &&
          filteredNotes.map((note) => <Note note={note} key={note.id} />)}
      </NotesWrap>
    </ViewWrap>
  );
};

const SearchField = ({ query, setQuery, placeholder, clear }) => {
  const location = useLocation();
  const hashQuery = location.hash.split(':')[1];
  const [focused, setFocused] = useState(false);
  const searchRef = useRef();

  const onSearchIcon = () => {
    searchRef.current.focus();
  };

  useEffect(() => {
    if (hashQuery) {
      setQuery(hashQuery);
    }
  }, [hashQuery]);

  return (
    <SearchFieldWrap>
      <span className="sicon icon-search" onClick={onSearchIcon}>
        <SearchIcon />
      </span>
      <input
        ref={searchRef}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {(focused || query) && (
        <span
          className="sicon icon-close"
          onClick={() => {
            clear();
            setFocused(false);
          }}
        >
          <CloseIcon />
        </span>
      )}
    </SearchFieldWrap>
  );
};

const Labels = ({ labels, selectedLabel, setSelectedLabel }) => {
  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    containerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    containerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
  };

  return (
    <LabelsWrap>
      <button className="arrow arrow-left" onClick={handleScrollLeft}>
        <ArrowLeftIcon />
      </button>
      <div className="label-list" ref={containerRef}>
        {labels.map((label) => (
          <button
            key={label.id}
            className={selectedLabel?.id === label?.id ? 'selected' : ''}
            onClick={() => setSelectedLabel(label)}
          >
            {label.name}
          </button>
        ))}
      </div>
      <button className="arrow arrow-right" onClick={handleScrollRight}>
        <ArrowRightIcon />
      </button>
    </LabelsWrap>
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

const LabelsWrap = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  gap: 20px;
  align-items: center;

  div {
    width: 400px;
    max-width: 70%;
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;
    gap: 10px;

    button {
      padding: 8px 15px;
      cursor: pointer;
      border-radius: 20px;
      border: none;
      outline: none;
      font-size: 12px;
      font-weight: 600;
      color: ${(props) => props.theme.colors.text3};
      background-color: transparent;
      /* border-bottom: 1px solid ${(props) => props.theme.colors.border1}; */
      border: 1px solid ${(props) => props.theme.colors.border1};

      :hover {
        background-color: ${(props) => props.theme.colors.text2};
        color: ${(props) => props.theme.colors.cardBg};
        border-color: ${(props) => props.theme.colors.text2};
      }
    }
  }

  .selected {
    background-color: ${(props) => props.theme.colors.text2};
    color: ${(props) => props.theme.colors.cardBg};
    border-color: ${(props) => props.theme.colors.text2};
  }

  .arrow {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: none;
    outline: none;
    font-size: 16px;
    cursor: pointer;
    color: ${(props) => props.theme.colors.text3};
    background-color: ${(props) => props.theme.colors.cardBg};
    :hover {
      background-color: ${(props) => props.theme.colors.text2};
      color: ${(props) => props.theme.colors.cardBg};
      border-color: ${(props) => props.theme.colors.text2};
    }
  }

  .arrow-left {
    svg {
      margin-left: 5px;
    }
  }

  .arrow-right {
    svg {
      margin-right: 1px;
    }
  }
`;
