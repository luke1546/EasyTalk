import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ListenBox from "../../UI/modules/ListenBox/ListenBox";
import MicBox from "../../UI/modules/MicBox";
import Button from "../../UI/atoms/Button/Button";
import styled from "styled-components";

const CDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MicBtn = styled(Button)`
  color: #8382ff;
  // border: 1px solid #8382ff;
  border-radius: 100%;
  width: 100px;
  height: 100px;
  background-color: white;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // box-shadow: 0px 5px 6px -4px #8382ff;
  margin: 20px auto 0; /* 수정된 부분: 상단 마진을 20px로, 좌우 마진을 auto로 설정하여 수평 가운데 정렬 */
  left: 50%;
  transform: translateX(0%); /* 수정된 부분: 가운데 정렬을 위해 transform을 사용하여 좌표 이동 */

  &:hover {
    box-shadow: 0px 5px 6px 0px #8382ff;
  }
`;

const SentenceDetailPage = () => {
  const { id } = useParams();
  const [sentence, setSentence] = useState("");
  const [buttonTF, setButtonTF] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recognize, setRecognize] = useState("");
  const [score, setScore] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    axios
      .get(`/study/sentence/detail?target=${id}`)
      .then((response) => {
        setSentence(response.data);
      })
      .catch((error) => {
        console.error("문장 가져오는 중 에러 발생:", error);
      });
  }, [id]);

  const buttonClick = () => {
    if (buttonTF) {
      setButtonTF(false);
      stopRecording();
    } else {
      setButtonTF(true);
      startRecording();
    }
  };

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
  
      console.log(mediaRecorder);
      console.log(recordedChunks);
  
      const audioBlob = new Blob(recordedChunks);
      const formData = new FormData();
      formData.append("audio", audioBlob);
      formData.append("sentence", sentence.sentence);
  
      console.log(audioBlob);
      console.log(formData.get("audio"));
      console.log(formData.get("sentence"));

      try {
        const response = await axios.post("/study/speech", formData, {
          withCredentials: true,
        });
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

  return (
    <div>
      <ListenBox
        id={id}
      />
      <div className="TestPage">
        <MicBtn name="micCircleBtn" size="40" onClick={buttonClick} />
        {score && (
          <>
            <div>{recognize}</div>
            <div>{score}</div>
          </>
        )}
      <CDiv>
          <div onClick={playAudio}><Button name="submitBtn" text="녹음 재생"></Button></div>
      </CDiv>
      </div>
    </div>
  );
};

export default SentenceDetailPage;
