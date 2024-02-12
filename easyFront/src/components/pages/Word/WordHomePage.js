// WordHomePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Textbox from '../../UI/atoms/Text/Textbox';

const WordHomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="WordHomePage">
      <div onClick={() => handleNavigation('stage')}>
        <Textbox section="singlePage" context1="단계별 단어 공부" />
      </div>
      <div onClick={() => handleNavigation('my')}>
        <Textbox section="singlePage" context1="내 단어장" />
      </div>
      <div onClick={() => handleNavigation('stagetest')}>
        <Textbox section="singlePage" context1="단계별 단어 시험" />
      </div>
      <div onClick={() => handleNavigation('musictest')}>
        <Textbox section="singlePage" context1="노래별 단어 시험" />
      </div>
    </div>
  );
};

export default WordHomePage;
