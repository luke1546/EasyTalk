// SentenceListPage.js

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import ListenBox from "../../UI/modules/ListenBox/ListenBox";

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
    <div>
      {type ? (
          <h2>{situation}</h2>
      ) : (
          <h2>저장한 문장</h2>
      )}
      {sentences && sentences.map((sentence) => (
        <ListenBox
          id={sentence.sentenceId}
        />
      ))}
    </div>
  );
};

export default SentenceListPage;
