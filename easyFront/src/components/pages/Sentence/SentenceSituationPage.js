// SentenceSituationPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Textbox from "../../UI/atoms/Text/Textbox";
import styled from "styled-components";

const WordDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;

const Stagediv = styled.div`
  border: 1px solid #8382ff;
  border-radius: 20px;
  height: 86px;
  font-weight: bold;
  box-shadow: 0px 5px 6px -4px #8382ff;
  margin: 20px 20px 0;

  &:hover {
    box-shadow: 0px 5px 6px 0px #8382ff;
  }
`;

const StyledP = styled.p`
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.p`
  text-align: left;
  font-weight: bold;
  padding: 0px 20px;
`;

const SentenceSituationPage = () => {
  const navigate = useNavigate();

  // 레벨 정보를 배열로 선언
  const situation = [
    { type: "travel", label: "여행" },
    { type: "study", label: "공부" },
    { type: "introduce", label: "소개" },
    { type: "business", label: "업무" },
    { type: "friendly", label: "친목" },
    { type: "restaurant", label: "식당" },
  ];

  const handleTypeClick = (type) => {
    navigate(`${type}`);
  };

  return (
    <WordDiv>
      <StyledTitle>단계별 단어 공부</StyledTitle>
      {situation.map((sit) => (
        <Stagediv key={sit.type} onClick={() => handleTypeClick(sit.type)}>
          <StyledP>{sit.label}</StyledP>
        </Stagediv>
      ))}
    </WordDiv>
  );
};

export default SentenceSituationPage;
