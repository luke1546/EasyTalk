// SentenceSituationPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Textbox from "../../UI/atoms/Text/Textbox";

const SentenceSituationPage = () => {
  const navigate = useNavigate();

  // 레벨 정보를 배열로 선언
  const situation = [
    { type: 'travel', label: '여행' },
    { type: 'study', label: '공부' },
    { type: 'introduce', label: '소개' },
    { type: 'bussiness', label: '업무' },
    { type: 'friendly', label: '친목' },
    { type: 'restaurant', label: '식당' },
  ];

  const handleTypeClick = (type) => {
    navigate(`${type}`);
  };

  return (
    <div>
      <h2>단계별 단어 공부</h2>
      {situation.map((sit) => (
        <div key={sit.type} onClick={() => handleTypeClick(sit.type)}>
          <Textbox section="singlePage" context1={sit.label} />
        </div>
      ))}
    </div>
  );
};

export default SentenceSituationPage;
