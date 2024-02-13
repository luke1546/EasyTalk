import { Link } from "react-router-dom";
import Textbox from "../../UI/atoms/Text/Textbox";

import axios from "axios";
import { useState, useRef, useEffect } from "react";
import InputBar from "../../UI/modules/InputBar";

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
        const musicId = response.data.map((music) => music.musicId).slice(0, 5);
        const musicTitle = response.data.map((music) => music.title).slice(0, 5);
        const videoId = response.data.map((music) => music.videoId).slice(0, 5);

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

  // 내 음악 리스트 제공
  // axios
  //   .get(`/study/music`, {
  //     params: {
  //       filter: "myList",
  //     },
  //     withCredentials: true,
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.error("마이 음악 리스트 에러 : ", error);
  //   });

  const userId = 3301009684;

  const [nickname, setNickname] = useState("");
  const [exp, setExp] = useState("");
  const [info, setInfo] = useState("");

  // axios
  //   .get(`http://localhost:8080/user/attendance/${userId}`)
  //   .then((response) => {
  //     const userAttendance = response.data.userDto;
  //     const nickname = userAttendance.nickname; // nickname

  //     setNickname(nickname);

  //     console.log(`exp: ${exp}, info: ${info}`);
  //   })
  //   .catch((error) => {
  //     console.error("There was an error!", error);
  //   });

  // axios
  //   .get("http://localhost:8080/study/music")
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const arr = ["노래 1", "노래 2", "노래 3"];
  const arr2 = ["노래 1", "노래 2", "노래 3"];

  return (
    <div className="MusicHomePage">
      {/* <TabBar
        tabs={[
          { label: "노래", to: "/study" },
          { label: "단어", to: "/a" },
          { label: "문장", to: "/sentence" },
        ]}
      /> */}
      <InputBar variant="searchinputbar" />
      <Textbox section="singleText" context1="지금 인기있는 노래" />
      <div>
        {musicTitle && musicTitle.map((arrElements, index) => {
          return (
            <Link
              to={{
                pathname: `/study/music/${musicId[index]}/${videoId[index]}`,
                state: { videoId: videoId[index] },
              }}
            >
              <div key={musicId[index]}>{arrElements}</div>
            </Link>
            // <Link to={`/study/${musicId[index]}`}>
            //   <div key={musicId[index]}>{arrElements}</div>
            // </Link>
          );
        })}
      </div>
      <hr />
      <Textbox section="singleText" context1="AI가 추천하는 노래" />
      <div>
        {arr2 && arr2.map((arrElements, index) => {
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
