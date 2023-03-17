import React, { createRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

const LabelList = ({ labels, selectedLabel, setSelectedLabel }) => {
  const containerRef = useRef(null);
  const refs = useRef(labels.map(() => createRef()));
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (container.scrollWidth > container.clientWidth) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    } else {
      setShowLeftArrow(false);
      setShowRightArrow(false);
    }

    const handleScroll = () => {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [labels]);

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
      <div className="arrow-box arrow-box-left">
        {showLeftArrow && (
          <button className="arrow arrow-left" onClick={handleScrollLeft}>
            <ArrowLeftIcon />
          </button>
        )}
      </div>
      <div className="labels-wrap" ref={containerRef}>
        <div className="label-list">
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
      </div>
      <div className="arrow-box arrow-box-right">
        {showRightArrow && (
          <button className="arrow arrow-right" onClick={handleScrollRight}>
            <ArrowRightIcon />
          </button>
        )}
      </div>
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

  .labels-wrap {
    width: 400px;
    overflow-x: hidden;
  }

  .label-list {
    width: max-content;
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;
    gap: 10px;
    flex-wrap: nowrap;
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

  .arrow-box {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
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
