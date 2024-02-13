// SentenceHomePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Textbox from '../../UI/atoms/Text/Textbox';

const SentenceHomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="SentenceHomePage">
      <div onClick={() => handleNavigation('situation')}>
        <Textbox section="singlePage" context1="상황별로 공부하기" />
      </div>
      <div onClick={() => handleNavigation('my')}>
        <Textbox section="singlePage" context1="내가 저장한 문장" />
      </div>
    </div>
  );
};

export default SentenceHomePage;
