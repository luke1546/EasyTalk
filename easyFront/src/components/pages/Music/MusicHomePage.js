import { Link } from "react-router-dom";
import Textbox from "../../UI/atoms/Text/Textbox";
import MusicBox from "../../UI/modules/MusicBox/MusicBox";
import Line from "../../UI/atoms/Line/Line";

import axios from "axios";
import { useState, useRef, useEffect } from "react";
import InputBar from "../../UI/modules/InputBar";
import styled from "styled-components";

const LeftDiv = styled.div`
  text-align: left;
  padding: 10px 0 0px 20px;
`;

const LeDiv = styled.div`
  text-align: left;
  padding: 20px 0 0px 20px;
`;

const BoxDiv = styled.div`
  // border: 1px solid s#8382ff;
`;

const LineDiv = styled.div`
  padding: 0.1px 0 ;
`;


const MusicHomePage = () => {
  const [musicList, setMusicList] = useState([]);

  const [myStudyMusic, setMyStudyMusic] = useState([]);

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
        const musicList = response.data.slice(0, 5).map((item) => ({
          musicId: item.musicId,
          title: item.title,
          artistName: item.artistName,
          musicTime: item.musicTime,
          musicImageUrl: item.musicImageUri,
          videoId: item.videoId,
        }));

        setMusicList(musicList);
      })
      .catch((error) => {
        console.error("음악 리스트 에러 : ", error);
      });

    // AI 추천순 정렬하여 음악 리스트 제공 (백엔드 로직 필요)
    // 미구현

    // 닉네임 가져오기
    axios
      .get("/user", { withCredentials: true })
      .then((response) => {
        const userData = response.data;
        const nickname = userData.nickname; // nickname

        setNickname(nickname);
      })
      .catch((error) => {
        console.error("닉네임 데이터 에러 : ", error);
        console.dir(error);
      });

    // 학습한 노래들 /study/test/record?target={word}
    // axios
    //   .get("/study/test/record?target=music", { withCredentials: true })
    //   .then((response) => {
    //     const myStudyMusic = response.data.map((item) => ({
    //       score: item.score,
    //       startTime: item.startTime,
    //       target: item.target,
    //       testAudioUri: item.testAudioUri,
    //       testId: item.testId,
    //       testTitle: item.testTitle,
    //     }));

    //     setMyStudyMusic(myStudyMusic);
    //   })
    //   .catch((error) => {
    //     console.error("학습한 노래 데이터 에러 : ", error);
    //     console.dir(error);
    //   });
    axios
      .get(`/study/music`, {
        params: {
          filter: "myList",
          order: "hit",
          sort: "desc",
        },
        withCredentials: true,
      })
      .then((response) => {
        const myStudyMusic = response.data.map((item) => ({
          musicId: item.musicId,
          title: item.title,
          artistName: item.artistName,
          musicTime: item.musicTime,
          musicImageUrl: item.musicImageUri,
          videoId: item.videoId,
        }));
        console.log(response)
        setMyStudyMusic(myStudyMusic);
        console.log(myStudyMusic);
      })
      .catch((error) => {
        console.error("내가 학습한 음악 리스트 에러 : ", error);
      });
  }, []);

  const [nickname, setNickname] = useState("");

  const arr2 = ["노래 1", "노래 2", "노래 3"];

  return (
    <div className="MusicHomePage">
      <InputBar variant="searchinputbar" />
      <LeDiv>
        <Textbox section="singleText" context1="지금 인기있는 노래" fontWeight="bold" />
      </LeDiv>
        <div>
          {musicList &&
            musicList.map((item, index) => {
              return (
                <Link
                  to={{
                    pathname: `/study/music/${item.musicId}/${item.videoId}`,
                    state: { videoId: item.videoId },
                  }}
                >
                  <BoxDiv key={item.musicId}>
                    <MusicBox
                      musicId={item.musicId}
                      title={item.title}
                      artistName={item.artistName}
                      musicTime={item.musicTime}
                      musicImageUrl={item.musicImageUrl}
                      videoId={item.videoId}
                    />
                  </BoxDiv>
                </Link>
              );
            })}
        </div>
      
      <LineDiv>
        <Line />
      </LineDiv>
      {/* <LeftDiv>
        <Textbox section="singleText" fontWeight="bold" context1="AI가 추천하는 노래" />
      </LeftDiv>
      <LineDiv>
        <Line />
      </LineDiv> */}
      <LeftDiv>
        <Textbox section="singleText" fontWeight="bold" context1={`최근 ${nickname}님이 학습한 노래`} />
      </LeftDiv>  
        <div>
          {myStudyMusic &&
            myStudyMusic.slice(0, 5).map((item, index) => {
              return (
                
                  <BoxDiv key={item.musicId}>
                    <MusicBox
                      musicId={item.musicId}
                      title={item.title}
                      artistName={item.artistName}
                      musicTime={item.musicTime}
                      musicImageUrl={item.musicImageUrl}
                      videoId={item.videoId}
                    />
                  </BoxDiv>

              );
            })}
        </div>
      
    </div>
  );
};

export default MusicHomePage;
