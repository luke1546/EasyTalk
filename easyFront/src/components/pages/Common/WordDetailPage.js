import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../UI/atoms/Button/Button';
import { useParams } from 'react-router-dom';

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
    const audio = new Audio(targetWord.wordAudioUri);
    audio.play();
  };

  return (
    <div>
      <h2>{targetWord.word}</h2>
      <div>{targetWord.pronunciation}</div>
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
      <div className="buttons">
        {Saved ? (
          <Button name="fBookMarkBtn" onClick={handleSaveClick} />
        ) : (
          <Button name="bookMarkBtn" onClick={handleSaveClick} />
        )}
        <Button name="listenBtn" onClick={handlePlayClick} />
      </div>
    </div>
  );
};

export default WordDetailPage;
