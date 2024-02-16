import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Textbox from '../../atoms/Text/Textbox';
import styled from 'styled-components';

const WordBoxContainer = styled.div`
  display: flex;
  padding: 20px;
  border: 2px solid #9c9cff;
  border-radius: 20px;
  margin: 20px;
  box-shadow: 0px 5px 6px -4px #9c9cff;

  &:hover {
    box-shadow: 0px 5px 6px 0px #9c9cff;
  }
`;

const OneDiv = styled.div`
  width: 100%;
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  height: 0.1vh;
  background-color: #9c9cff;
  margin: 10px;
`;

const LeftAlignContainer = styled.div`
  text-align: left;
  padding: 10px;
`;

const WordBox = ({ wordId, word, isSaved, meaning, wordAudioUri }) => {
  const [Saved, setSaved] = useState(isSaved);
  
  const handleSaveClick = async (event) => {
    event.stopPropagation();
    try {
      if (!Saved) {
        await axios.post(`https://i10b307.p.ssafy.io:8080/study/word`, { 'wordId': wordId });
        setSaved(true);
      } else {
        await axios.delete(`https://i10b307.p.ssafy.io:8080/study/word?wordId=${wordId}`);
        setSaved(false);
      }
    } catch (error) {
      console.error('Error saving or deleting:', error);
    }
  };

  const handlePlayClick = (event) => {
    event.stopPropagation();
    const audio = new Audio(`https://easy-s3-bucket.s3.ap-northeast-2.amazonaws.com${wordAudioUri}`);
    audio.play();
  };

  return (
    <WordBoxContainer>
      <OneDiv>
      <Link to={`/study/word/${wordId}/detail`} state={wordId}>
        <TopDiv>
          <Textbox color="black" fontWeight="bold" fontSize="25px" section="singleText" context1={word} />
        </TopDiv>
      <Divider />
      <LeftAlignContainer>
        <Textbox color="black" section="singleText" context1={meaning} />
      </LeftAlignContainer>
      </Link>
      </OneDiv>
    </WordBoxContainer>
  );
};

export default WordBox;
