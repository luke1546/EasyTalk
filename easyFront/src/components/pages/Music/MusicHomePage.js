import { Link } from "react-router-dom";
import Textbox from "../../UI/atoms/Text/Textbox";

import axios from "axios";
import { useState, useEffect } from "react";

const MusicHomePage = () => {
  const [musicId, setMusicId] = useState([]);
  const [musicTitle, setMusicTitle] = useState([]);
  const [videoId, setVideoId] = useState([]);

  useEffect(() => {
    // 조회수순 정렬하여 음악 리스트 제공
    axios
      .get(`/study/music`, {
        params: {
          order: "hit",
          sort: "desc",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        const musicId = response.data.map((music) => music.musicId);
        const musicTitle = response.data.map((music) => music.title);
        const videoId = response.data.map((music) => music.videoId);

        setMusicId(musicId);
        setMusicTitle(musicTitle);
        setVideoId(videoId);
      })
      .catch((error) => {
        console.error("음악 리스트 에러 : ", error);
      });

    // AI 추천순 정렬하여 음악 리스트 제공 (백엔드 로직 필요)
    // 미구현
  }, []);

  const [nickname, setNickname] = useState("");

  const arr2 = ["노래 1", "노래 2", "노래 3"];

  return (
    <div className="MusicHomePage">
      {/* <InputBar variant="searchinputbar" uri="/study/music/search/" /> */}
      <Textbox section="singleText" context1="지금 인기있는 노래" />
      <div>
        {musicTitle &&
          musicTitle.map((arrElements, index) => {
            return (
              <Link
                to={{
                  pathname: `/study/music/${musicId[index]}/${videoId[index]}`,
                  state: { videoId: videoId[index] },
                }}
              >
                <div key={musicId[index]}>{arrElements}</div>
              </Link>
            );
          })}
      </div>
      <hr />
      <Textbox section="singleText" context1="AI가 추천하는 노래" />
      <div>
        {arr2 &&
          arr2.map((arrElements, index) => {
            return (
              <Link to={`/study/music/${index}`}>
                <div key={index}>{arrElements}</div>
              </Link>
            );
          })}
      </div>
      <hr />
      <Textbox section="singleText" context1={`${nickname}님이 학습중인 노래`} />
    </div>
  );
};

export default MusicHomePage;