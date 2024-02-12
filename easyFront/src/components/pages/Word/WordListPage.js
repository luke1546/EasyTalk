// WordListPage.js

import React, { useEffect, useState } from 'react';
import WordBox from '../../UI/modules/WordBox/WordBox';
import axios from "axios";
import { useParams } from "react-router-dom";

const WordListPage = ( ) => {
  const [words, setWords] = useState([]);
  const { level } = useParams();

  useEffect(() => {
    
    const fetchWordsByLevel = async () => {
      try {
        if (level) {
          const response = await axios.get(`https://i10b307.p.ssafy.io:8080/study/word?filter=list&level=${level}`);
          console.log(response.data)
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
    <div>
      {level &&
        <h2>{`${level}단계 단어 목록`}</h2>
      }
      
      {words.map((word) => (
        <WordBox
          key={word.wordId}
          word={word.word}
          meaning={word.wordMeaningDto[0].meaning}
          isSaved={word.isSaved}
          wordAudioUri={word.wordAudioUri}
        />
      ))}
    </div>
  );
};

export default WordListPage;
