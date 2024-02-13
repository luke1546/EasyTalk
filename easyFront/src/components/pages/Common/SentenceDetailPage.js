import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListenBox from "../../UI/modules/ListenBox/ListenBox";
import MicBox from "../../UI/modules/MicBox";

const SentenceDetailPage = () => {
  const { id } = useParams();
  const [sentence, setSentence] = useState('');
  const [buttonTF, setButtonTF] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios
      .get(`/study/sentence/detail?target=${id}`)
      .then((response) => {
        setSentence(response.data);
      })
      .catch((error) => {
        console.error('문장 가져오는 중 에러 발생:', error);
      });
  }, [id]);

  const buttonClick = () => {
    if (buttonTF) {
      setButtonTF(false);
      stopRecording();
      uploadAudio();
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
    }
  };

  
  // 녹음한 오디오 서버로 전송
  const uploadAudio = async () => {
    const audioBlob = new Blob(recordedChunks);
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("sentence", sentence.sentence);
    try {
      const response = await axios.post(`/study/speech`, formData, {
        withCredentials: true,
      });
      setResult(response.data);
    } catch (error) {
      console.error("오류가 발생했습니다:", error);
    }
  };

  return (
    <div>
      <ListenBox
        sentence={sentence}
      />
      <div className="TestPage">
        <MicBox />
        {buttonTF ? (
          <button onClick={buttonClick}>녹음종료</button>
        ) : (
          <button onClick={buttonClick}>녹음하기</button>
        )}
        {result && (
          <div>
            <div>{result.recognize}</div>
            <div>{result.score}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentenceDetailPage;
