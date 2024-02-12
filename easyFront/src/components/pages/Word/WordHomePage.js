// WordHomePage.js

import React from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Textbox from "../../UI/atoms/Text/Textbox";
import WordListPage from "./WordListPage";
import WordStagePage from "./WordStagePage";
import WordTestPage from "./WordTestPage";

const WordHomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="WordHomePage">
      <div onClick={() => navigate("stage")}>
        <Textbox section="singlePage" context1="단계별 단어 공부" />
      </div>
      <div onClick={() => handleNavigation("/study/word/my")}>
        <Textbox section="singlePage" context1="내 단어장" />
      </div>
      <div onClick={() => handleNavigation("/study/word/stagetest")}>
        <Textbox section="singlePage" context1="단계별 단어 시험" />
      </div>
      <div onClick={() => handleNavigation("/study/word/musictest")}>
        <Textbox section="singlePage" context1="노래별 단어 시험" />
      </div>
      <Routes>
        <Route path="stage" element={<WordStagePage />} />
        <Route path="/study/word/my" element={<WordListPage />} />
        <Route path="/study/word/stagetest" element={<WordTestPage />} />
        <Route path="/study/word/musictest" element={<WordTestPage />} />
      </Routes>
    </div>
  );
};

export default WordHomePage;
