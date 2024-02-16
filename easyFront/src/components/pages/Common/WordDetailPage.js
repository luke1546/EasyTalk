import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../UI/atoms/Button/Button';
import { useParams } from 'react-router-dom';
import Line from "../../UI/atoms/Line/Line";
import styled from "styled-components";

const Worddiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 2px solid #9c9cff;
  border-radius: 20px;
  margin: 20px;
`;

const H = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Btndiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const WordDetailPage = () => {
  const { wordId } = useParams();
  const [targetWord, setWord] = useState('');
  const [Saved, setSaved] = useState('');

  useEffect(() => {
    // 단어 가져오는 axios
    axios
      .get(`/study/word/detail?target=${wordId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setWord(response.data);
        setSaved(response.data.isSaved);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("단어 가져옴 에러 : ", error);
      });
  }, []);

  const groupMeaningsByPartOfSpeech = (meanings) => {
    const groupedMeanings = {};
    // wordMeaningDto가 undefined인 경우 처리
    meanings = meanings || [];
    meanings.forEach((meaning) => {
      if (!groupedMeanings[meaning.partOfSpeech]) {
        groupedMeanings[meaning.partOfSpeech] = [];
      }
      groupedMeanings[meaning.partOfSpeech].push(meaning.meaning);
    });
    return groupedMeanings;
  };

  const handleSaveClick = async (event) => {
    event.stopPropagation();
    try {
      if (!Saved) {
        await axios.post(`https://i10b307.p.ssafy.io:8080/study/word`, { 'wordId': wordId });
        setSaved(true)
      } else {
        await axios.delete(`https://i10b307.p.ssafy.io:8080/study/word?wordId=${wordId}`);
        setSaved(false)
      }

      
    } catch (error) {
      console.error('Error saving or deleting:', error);
    }
  };

  const handlePlayClick = (event) => {
    event.stopPropagation();
    const audio = new Audio(`https://easy-s3-bucket.s3.ap-northeast-2.amazonaws.com${targetWord.wordAudioUri}`);
    audio.play();
  };

  return (
    <Worddiv>
      <H>{targetWord.word}</H>
    <Line />
      <div>{targetWord.pronunciation}</div>
      <Btndiv className="buttons">
        {Saved ? (
          <Button name="fBookMarkBtn" size="25px" color="#8382ff" onClick={handleSaveClick} />
        ) : (
          <Button name="bookMarkBtn" size="25px" color="#8382ff" onClick={handleSaveClick} />
        )}
        <Button name="listenBtn" size="25px" color="#8382ff" onClick={handlePlayClick} />
      </Btndiv>
      <Line />
      {/* wordMeaningDto를 partOfSpeech 기준으로 그룹화하여 사용 */}
      {Object.entries(groupMeaningsByPartOfSpeech(targetWord.wordMeaningDto)).map(([partOfSpeech, meanings], index) => (
        <div key={index}>
          <h3>{partOfSpeech}</h3>
          {/* 그룹화된 의미들을 나열 */}
          {meanings.map((meaning, index) => (
            <p key={index}>{meaning}</p>
          ))}
        </div>
      ))}
    </Worddiv>
  );
};

export default WordDetailPage;
