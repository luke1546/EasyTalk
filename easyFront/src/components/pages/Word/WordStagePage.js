// WordStagePage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
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
      <WordDiv>
      <StyledTitle className="">단계별 단어 공부</StyledTitle>
      {levels.map((level) => (
        <Stagediv  key={level.id} onClick={() => handleLevelClick(level.id)}>
        <StyledP className="">{level.label}</StyledP>
      </Stagediv >
    ))}
    </WordDiv>
    </div>
  );
};

export default WordStagePage;
