// WordListPage.js

import React, { useEffect, useState } from 'react';
import WordBox from '../../UI/modules/WordBox/WordBox';
import axios from "axios";
import { useParams } from "react-router-dom";
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

const WordListPage = ( ) => {
  const [words, setWords] = useState([]);
  const { level } = useParams();

  useEffect(() => {
    
    const fetchWordsByLevel = async () => {
      try {
        if (level) {
          const response = await axios.get(`https://i10b307.p.ssafy.io:8080/study/word?filter=list&level=${level}`);
          setWords(response.data);
        }
        else {
          const response = await axios.get(`https://i10b307.p.ssafy.io:8080/study/word?filter=myList`);
          setWords(response.data);
        }
      } catch (error) {
        console.error('단어 목록을 가져오는 중 에러 발생:', error);
      }
    };

    // 단계가 변경되었을 때 fetchWordsByLevel 함수 호출
    fetchWordsByLevel();
  }, [level]);

  return (
    <WordDiv>
      {level ? (
        <>
         <StyledTitle>{`${level}단계 단어 목록`}</StyledTitle>
        </>
  ) : (
    <>
      <StyledTitle>저장한 단어</StyledTitle>
    </>
      )
      }
      
      {words && words.map((word) => (
        <WordBox
          wordId={word.wordId}
          word={word.word}
          meaning={word.wordMeaningDto[0].meaning}
          isSaved={word.isSaved}
          wordAudioUri={word.wordAudioUri}
        />
      ))}
  </WordDiv >
  );
};

export default WordListPage;