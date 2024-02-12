// WordListPage.js

import React, { useEffect, useState } from "react";
import WordBox from "../../UI/modules/WordBox/WordBox";

const WordListPage = ({ level }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    // 단계 정보를 기반으로 해당 단계의 단어 목록을 가져오는 비동기 함수 호출
    const fetchWordsByLevel = async () => {
      try {
        // 예시: 서버에서 해당 단계의 단어 목록을 가져오는 API 호출
        const response = await fetch(`/api/words?level=${level}`);
        const data = await response.json();

        // 가져온 데이터를 상태에 업데이트
        setWords(data);
      } catch (error) {
        console.error("단어 목록을 가져오는 중 에러 발생:", error);
      }
    };

    // 단계가 변경되었을 때 fetchWordsByLevel 함수 호출
    fetchWordsByLevel();
  }, [level]);

  return (
    <div>
      <h2>{`${level}단계 단어 목록`}</h2>
      {words.map((word) => (
        <WordBox
          key={word.id}
          word={word.word}
          meaning={word.meaning}
          isBookmarked={word.isBookmarked}
          audioUrl={word.audioUrl}
          onBookmarkChange={(bookmarked) => {
            // 북마크 상태가 변경될 때 실행되는 콜백
            // 해당 단어의 북마크 상태를 업데이트하는 로직을 여기에 추가
            console.log(
              `단어 ${word.word}의 북마크 상태가 변경되었습니다. 새로운 상태: ${bookmarked}`
            );
          }}
        />
      ))}
    </div>
  );
};

export default WordListPage;
