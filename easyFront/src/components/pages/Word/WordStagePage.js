// WordStagePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Textbox from "../../UI/atoms/Text/Textbox";

const WordStagePage = () => {
  const navigate = useNavigate();

  // 레벨 정보를 배열로 선언
  const levels = [
    { id: 1, label: '1단계' },
    { id: 2, label: '2단계' },
    { id: 3, label: '3단계' },
    { id: 4, label: '4단계' },
    { id: 5, label: '5단계' },
    { id: 6, label: '6단계' },
    { id: 7, label: '7단계' },
  ];

  const handleLevelClick = (level) => {
    navigate(`${level}`);
  };

  return (
    <div>
      <h2>단계 선택</h2>
      {levels.map((level) => (
        <div key={level.id} onClick={() => handleLevelClick(level.id)}>
          <Textbox section="singlePage" context1={level.label} />
        </div>
      ))}
    </div>
  );
};

export default WordStagePage;
