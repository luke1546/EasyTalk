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
    padding: 20px 0 20px 40px;
  `;

const MusicHomePage = () => {
  const [musicId, setMusicId] = useState([]);
  const [musicTitle, setMusicTitle] = useState([]);
  const [videoId, setVideoId] = useState([]);
  const [artistId, setartistId ] = useState([]);
  const [artistName, setArtistName] = useState([]);

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
        const artistId = response.data.map((music) => music.artistId).slice(0, 5);

        setMusicId(musicId);
        setMusicTitle(musicTitle);
        setVideoId(videoId);
        setartistName(artistName);
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

  const arr2 = ["노래 1", "노래 2", "노래 3"];

  // ffffffffffff
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // 녹음 시작
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        setRecordedChunks([]); // 녹음 데이터 초기화
        const newMediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(newMediaRecorder);
        newMediaRecorder.start();
        setIsRecording(true);

        newMediaRecorder.ondataavailable = function (e) {
          setRecordedChunks((prev) => [...prev, e.data]);
        };
      })
      .catch(function (err) {
        console.error("녹음을 시작할 수 없습니다.", err);
      });
  };

  // 녹음 중지
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // 녹음한 오디오 재생
  const playAudio = () => {
    const audioBlob = new Blob(recordedChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
    setIsPlaying(true);

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  // 녹음한 오디오 서버로 전송
  const uploadAudio = async () => {
    const audioBlob = new Blob(recordedChunks);
    const formData = new FormData();
    formData.append("audio", audioBlob);

    try {
      const response = await axios.post("/your-upload-url", formData);
      console.log(response.data);
    } catch (error) {
      console.error("오류가 발생했습니다:", error);
    }
  };

  

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
      <LeftDiv>
        <Textbox section="singleText" context1="지금 인기있는 노래" />
        <div>
          {musicTitle.map((arrElements, index) => {
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
      </LeftDiv>

        {/* <MusicBox musicId={musicId} title={musicTitle} artistName={artistName} /> */}

      <Line />
      <LeftDiv>
        <Textbox section="singleText" context1="AI가 추천하는 노래" />
        <div>
          {arr2.map((arrElements, index) => {
            return (
              <Link to={`/study/music/${index}`}>
                <div key={index}>{arrElements}</div>
              </Link>
            );
          })}
        </div>
      </LeftDiv>
      <Line />
      <LeftDiv>
        <Textbox section="singleText" context1={`${nickname}님이 학습중인 노래`} />
        <button onClick={startRecording}>녹음 시작</button>
        <button onClick={stopRecording}>녹음 중지</button>
        <button onClick={playAudio}>재생</button>
        <button onClick={uploadAudio}>업로드</button>
        {isRecording && <p>녹음 중...</p>}
        {isPlaying && <p>재생 중...</p>}
      </LeftDiv>
      <LeftDiv>
        <Textbox section="singleText" context1="지금 인기있는 노래" />
        <div>
          {musicTitle.map((arrElements, index) => {
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
      </LeftDiv>

        {/* <MusicBox musicId={musicId} title={musicTitle} artistName={artistName} /> */}

      <Line />
      <LeftDiv>
        <Textbox section="singleText" context1="AI가 추천하는 노래" />
        <div>
          {arr2.map((arrElements, index) => {
            return (
              <Link to={`/study/music/${index}`}>
                <div key={index}>{arrElements}</div>
              </Link>
            );
          })}
        </div>
      </LeftDiv>
      <Line />
      <LeftDiv>
        <Textbox section="singleText" context1={`${nickname}님이 학습중인 노래`} />
        <button onClick={startRecording}>녹음 시작</button>
        <button onClick={stopRecording}>녹음 중지</button>
        <button onClick={playAudio}>재생</button>
        <button onClick={uploadAudio}>업로드</button>
        {isRecording && <p>녹음 중...</p>}
        {isPlaying && <p>재생 중...</p>}
      </LeftDiv>
    </div>
  );
};

export default MusicHomePage;