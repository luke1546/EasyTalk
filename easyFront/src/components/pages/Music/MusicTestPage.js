import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const MusicTestPage = () => {
  const navigate = useNavigate();

  const match = useMatch("*"); // 현재 경로의 패턴을 가져옴
  let url = match.pathname;
  const tmp = url.split("/");
  const musicId = tmp[3];

  const [title, setTitle] = useState("");

  const [recognize, setRecognize] = useState("");
  const [score, setScore] = useState();

  const [buttonTF, setButtonTF] = useState(false);

  const [lyric, setLyric] = useState([]);

  const [currentLyricIndex, setCurrentLyricIndex] = useState(0); // 현재 가사 인덱스

  const [totalScore, setTotalScore] = useState(0);
  const [recordingCount, setRecordingCount] = useState(0);

  useEffect(() => {
    if (score) {
      setTotalScore((prevScore) => prevScore + score);
    }
  }, [score]);

  const matchRate = recordingCount > 0 ? totalScore / recordingCount : 0;

  const buttonClick = () => {
    if (buttonTF) {
      if (currentLyricIndex < lyric.length - 1) {
        // 가사가 끝까지 도달하지 않았다면
        setCurrentLyricIndex(currentLyricIndex + 1); // 가사 인덱스 증가
      } else {
        if (matchRate >= 60) {
          navigate("result", { state: { matchRate } });
        } else {
          navigate("result", { state: { matchRate } });
        }
      }
      setButtonTF(false);
      // 여기에 녹음이 종료되며 보내버려서 검증하는게 들어가야함
      console.log("여기에 녹음이 종료되며 보내버려서 검증하는게 들어가야함");
      stopRecording();
    } else {
      setButtonTF(true);
      // 여기에 녹음하는 기능이 들어가야하고
      console.log("여기에 녹음하는 기능이 들어가야하고");
      startRecording();
      setRecordingCount((prevCount) => prevCount + 1);
    }
  };

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
    return new Promise((resolve, reject) => {
      if (mediaRecorder) {
        mediaRecorder.addEventListener(
          "stop",
          () => {
            setIsRecording(false);
            resolve();
          },
          { once: true }
        );
        mediaRecorder.stop();
      } else {
        reject("MediaRecorder not available");
      }
    });
  };
  //   if (mediaRecorder) {
  //     mediaRecorder.stop();
  //     setIsRecording(false);
  //   }
  // };

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
    // await stopRecording();

    console.log(mediaRecorder);
    console.log(recordedChunks);

    const audioBlob = new Blob(recordedChunks);
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("sentence", lyric[currentLyricIndex - 1]?.lyric);

    console.log(audioBlob);
    console.log(formData.get("audio"));
    console.log(formData.get("sentence"));

    try {
      console.log(lyric[currentLyricIndex]?.lyric);
      const response = await axios.post("/study/speech", formData, {
        withCredentials: true,
      });
      console.log(response.data);
      console.log(response.data.recognize);
      console.log(response.data.score);

      setRecognize(response.data.recognize);
      setScore(response.data.score);
    } catch (error) {
      console.error("오류가 발생했습니다:", error);
    }
  };

  // ffffffffffff

  useEffect(() => {
    if (!isRecording && recordedChunks.length > 0) {
      uploadAudio();
    }
  }, [recordedChunks, isRecording]);

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

    // musicId에 해당하는 노래를 시험 볼 때 필요한 정보 axios
    axios
      .get(`/study/music/test?target=${musicId}`, {
        withCredentials: true,
      })
      .then((response) => {
        const lyric = response.data.lyrics.map((item) => ({
          lyric: item.lyric,
          lyricId: item.lyricId,
          lyricAudioUri: item.lyricAudioUri,
          durationMs: item.durationMs,
          meaning: item.meaning,
          musicId: item.musicId,
          startOffsetMs: item.startOffsetMs,
        }));

        setLyric(lyric);
      })
      .catch((error) => {
        console.error("시험 정보 가져옴 에러 : ", error);
      });
  }, []);

  return (
    <div className="MusicTestPage">
      <div>{title}</div>
      <div>{lyric[currentLyricIndex]?.lyric || "가사를 불러오는 중..."} </div>{" "}
      {/* 가사 나올 박스 */}
      <div>{lyric[currentLyricIndex + 1]?.lyric || ""} </div> {/* 다음에 나올 가사 */}
      {buttonTF ? (
        <button onClick={buttonClick}>녹음종료</button>
      ) : (
        <button onClick={buttonClick}>녹음하기</button>
      )}
      <div>{recognize}</div>
      <div>{score}% 일치</div>
      <div>
        테스트용 녹음 확인 : <button onClick={playAudio}>재생</button>
      </div>
    </div>
  );
};

export default MusicTestPage;
