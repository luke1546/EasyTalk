import { Link, useMatch, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../../UI/atoms/Button/Button";
import WordBox from "../../UI/modules/WordBox/WordBox";
import styled from "styled-components";

const Btn = styled.button`
  border: 1px solid #8382ff;
  border-radius: 50px;
  background-color: white;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  padding: 10px 40px; // 패딩을 조절하여 버튼의 높이를 텍스트에 맞춤
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 6px -4px #8382ff;
  margin: 20px 20px 0;
  left: 50%;

  &:hover {
    box-shadow: 0px 5px 6px 0px #8382ff;
  }
`;

const MusicWordPage = () => {
  const navigate = useNavigate();
  const match = useMatch("*"); // 현재 경로의 패턴을 가져옴
  const { videoId, index } = useParams();
  let url = match.pathname;
  url = url.replace("word", "test");

  const tmp = url.split("/");

  const musicId = tmp[3];

  const [wordList, setWordList] = useState([]);

  const [title, setTitle] = useState("");

  useEffect(() => {
    // 제목 가져오는 axios
    axios
      .get(`/study/music/title?target=${musicId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setTitle(response.data);
      })
      .catch((error) => {
        console.error("제목 에러 : ", error);
      });

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

  const handleGoTest = () => {
    navigate('test');
  }

  return (
    <div className="MusicWordPage">
      <div>{title}</div>
      <div>
        {wordList &&
          wordList.map((wordItem, index) => {
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
      <div onClick={handleGoTest} >
        <Button name="submitBtn" text="시험보기" />
      </div>
      
    </div>
  );
};

export default MusicWordPage;
