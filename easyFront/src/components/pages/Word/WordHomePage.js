// WordHomePage.js

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

const WordHomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="WordHomePage">
      <WordDiv>
        <Stagediv onClick={() => handleNavigation('stage')}>
          <StyledP className="">단계별 단어 공부</StyledP>
        </Stagediv>
        <Stagediv onClick={() => handleNavigation('my')}>
          <StyledP className="">내 단어장</StyledP>
        </Stagediv>
        <Stagediv onClick={() => handleNavigation('stagetest')}>
          <StyledP className="">단계별 단어 시험</StyledP>
        </Stagediv>
        <Stagediv onClick={() => handleNavigation('musictest')}>
          <StyledP className="">노래별 단어 시험</StyledP>
        </Stagediv>
      </WordDiv>
    </div>
  );
};

export default WordHomePage;
