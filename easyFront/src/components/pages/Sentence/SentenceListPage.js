// SentenceListPage.js

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import ListenBox from "../../UI/modules/ListenBox/ListenBox";
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

const SentenceListPage = ( ) => {
  const [sentences, setSentences] = useState([]);
  const [situation, setSituation] = useState('');
  const { type } = useParams();
  const label = { 'travel': '여행', 'study': '공부', 'introduce': '소개', 'bussiness': '업무', 'friendly': '친목', 'restaurant': '식당'};


  useEffect(() => {
    
    const fetchSentencesByType = async () => {
      try {
        if (type) {
          const response = await axios.get(`https://i10b307.p.ssafy.io:8080/study/sentence?filter=${type}`);
          console.log(response.data)
          setSentences(response.data);
          setSituation(label[type]);
        }
        else {
          const response = await axios.get(`https://i10b307.p.ssafy.io:8080/study/sentence?filter=myList`);
          setSentences(response.data);
        }
      } catch (error) {
        console.error('문장 목록을 가져오는 중 에러 발생:', error);
      }
    };

    fetchSentencesByType();
  }, [type]);

  return (
    <WordDiv>
      {type ? (
          <StyledTitle>{situation}</StyledTitle>
      ) : (
          <StyledTitle>저장한 문장</StyledTitle>
      )}
      <div>
      {sentences && sentences.map((sentence) => (
        <ListenBox
          id={sentence.sentenceId}
        />
      ))}
      </div>
    </WordDiv>
  );
};

export default SentenceListPage;
