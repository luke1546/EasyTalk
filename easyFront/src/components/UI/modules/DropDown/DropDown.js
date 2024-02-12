// DropDown.js

import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';
import './DropDown.css';

const DropDown = ({ options, defaultOption }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isOptionsVisible, setOptionsVisible] = useState(false);

  const handleToggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOptionsVisible(false);
  };

  return (
    <div className="dropdown">
      <div className="selected-option" onClick={handleToggleOptions}>
        <Button name="dropBtn" onClick={handleToggleOptions} />
        {selectedOption}
      </div>
      {isOptionsVisible && (
        <div className="options-list">
          {options.map((option) => (
            <div
              key={option}
              className={`option ${option === selectedOption ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
