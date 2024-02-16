import { Link, useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import ListenBox from "../../UI/modules/ListenBox/ListenBox";
import axios from "axios";

const MusicSentencePage = () => {
  const [sentenceIds, setSentenceIds] = useState([]);
  const [title, setTitle] = useState("");

  const match = useMatch("*"); // 현재 경로의 패턴을 가져옴
  let url = match.pathname;
  const tmp = url.split("/");
  const musicId = tmp[3];

  useEffect(() => {
    // 제목 가져오는 axios
    axios
      .get(`/study/music/title?target=${musicId}`)
      .then((response) => {
        setTitle(response.data);
      })
      .catch((error) => {
        console.error("제목 에러 : ", error);
      });

    // musicId에 해당하는 노래의 문장들 정보 axios
    axios
      .get(`/study/music/detail?target=${musicId}`)
      .then((response) => {
        // 문장 IDs를 모두 가져온 후에 한 번에 설정
        const promises = response.data.map((obj) =>
          axios.get(`/study/music/lyric?target=${obj.lyricId}`)
        );
        Promise.all(promises)
          .then((responses) => {
            const lyricIds = responses.map((response) => response.data);
            setSentenceIds(lyricIds);
          })
          .catch((error) => {
            console.error("시험 정보 가져옴 에러 : ", error);
          });
      })
      .catch((error) => {
        console.error("시험 정보 가져옴 에러 : ", error);
      });
  }, [musicId]);

  return (
    <div className="MusicSentencePage">
      <div>{title}</div>
      {sentenceIds.map((id) => (
        <ListenBox key={id} id={id} type="lyric"/>
      ))}
    </div>
  );
};

export default MusicSentencePage;
