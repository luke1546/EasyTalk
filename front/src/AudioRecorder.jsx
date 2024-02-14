import axios from "axios";
import { useState } from "react";

const MusicHomePage = () => {
  
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
    formData.append("target", 576);
    try {
      const response = await axios.put("http://localhost:8080/study/music/test", formData);
      console.log(response.data);
    } catch (error) {
      console.error("오류가 발생했습니다:", error);
    }
  };

  // ffffffffffff
  return (
    <div>
      <button onClick={startRecording}>녹음 시작</button>
      <button onClick={stopRecording}>녹음 중지</button>
      <button onClick={playAudio}>재생</button>
      <button onClick={uploadAudio}>업로드</button>
      {isRecording && <p>녹음 중...</p>}
      {isPlaying && <p>재생 중...</p>}
    </div>
  );
};

export default MusicHomePage;