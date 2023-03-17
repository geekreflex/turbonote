import React, { createRef, useRef } from 'react';
import styled from 'styled-components';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

const LabelList = ({ labels, selectedLabel, setSelectedLabel }) => {
  const containerRef = useRef(null);
  const refs = useRef(labels.map(() => createRef()));

  const handleScrollLeft = () => {
    containerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    containerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
  };

  const handleSelect = (label, index) => {
    refs.current[index].current.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
    if (selectedLabel && selectedLabel.id === label.id) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel(label);
    }
  };

  return (
    <LabelsWrap>
      <button className="arrow arrow-left" onClick={handleScrollLeft}>
        <ArrowLeftIcon />
      </button>
      <div className="label-list" ref={containerRef}>
        {labels.map((label, index) => (
          <button
            ref={refs.current[index]}
            key={label.id}
            className={selectedLabel?.id === label?.id ? 'selected' : ''}
            onClick={() => handleSelect(label, index)}
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

export default LabelList;

const LabelsWrap = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  gap: 20px;
  align-items: center;
  justify-content: center;
  position: relative;

  .label-list {
    width: 400px;
    max-width: 70%;
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
    scroll-behavior: smooth;
    gap: 10px;
    position: relative;

    .selected {
      background-color: ${(props) => props.theme.colors.text2};
      color: ${(props) => props.theme.colors.cardBg};
      border-color: ${(props) => props.theme.colors.text2};
    }

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
