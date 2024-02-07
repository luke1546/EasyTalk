// WordHomePage.js

import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Textbox from '../../UI/atoms/Text/Textbox';
import WordListPage from './WordListPage';
import WordStagePage from './WordStagePage';
import WordTestPage from './WordTestPage';

const WordHomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="WordHomePage">
      <Link to={WordStagePage}>
        <Textbox section="singlePage" context1="단계별 단어 공부" />
      </Link>
      <Link to={WordListPage} state={userId}>
        <Textbox section="singlePage" context1="내 단어장" />
      </Link>
      <div onClick={() => handleNavigation('/study/word/stagetest')}>
        <Textbox section="singlePage" context1="단계별 단어 시험" />
      </div>
      <div onClick={() => handleNavigation('/study/word/musictest')}>
        <Textbox section="singlePage" context1="노래별 단어 시험" />
      </div>
    </div>
  );
};

export default WordHomePage;
