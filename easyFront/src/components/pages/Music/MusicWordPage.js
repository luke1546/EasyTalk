import { useParams, Link, useMatch } from "react-router-dom";
import Button from "../../UI/atoms/Button/Button";
import axios from "axios";
import { useState, useEffect } from "react";

import WordBox from "../../UI/modules/WordBox/WordBox";
const MusicWordPage = () => {
  const match = useMatch("*"); // 현재 경로의 패턴을 가져옴
  let url = match.pathname;
  url = url.replace("word", "test");

  const tmp = url.split("/");

  const musicId = tmp[3];

  const [wordList, setWordList] = useState([]);

  console.log(wordList);

  useEffect(() => {
    // 단어 가져오는 axios
    axios
      .get(`/study/word?filter=music&target=${musicId}`, {
        withCredentials: true,
      })
      .then((response) => {
        const wordList = response.data.map((item) => ({
          wordId: item.wordId, // 단어별 번호
          word: item.word, // 영단어
          pronunciation: item.pronunciation, // 발음기호
          wordMeaningDto: item.wordMeaningDto.map((meaning) => ({
            meaning: meaning.meaning,
          })), // 단어의 뜻들
          wordAudioUri: item.wordAudioUri,
        }));

        setWordList(wordList);
      })
      .catch((error) => {
        console.error("단어 가져옴 에러 : ", error);
      });
  }, []);

  return (
    <div className="MusicWordPage">
      <div>제목 : 노래가 나와주세요~</div>
      <div>
        {wordList.map((wordItem, index) => {
          return (
            <div key={index}>
              <WordBox
                wordId={wordItem.wordId}
                word={wordItem.word}
                isSaved={false}
                meaning={wordItem.wordMeaningDto.map((meaningItem, subIndex) => {
                  return <div key={subIndex}>{meaningItem.meaning}</div>;
                })}
                wordAudioUri={wordItem.wordAudioUri}
              />
            </div>
          );
        })}
      </div>
      <Link to={url}>
        <Button name="submitBtn" text="시험보기" />
      </Link>
    </div>
  );
};

export default MusicWordPage;
