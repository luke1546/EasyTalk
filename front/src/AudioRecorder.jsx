import React, { useState } from 'react';
import axios from 'axios';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const newMediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(newMediaRecorder);
      newMediaRecorder.start();

      setRecording(true);

      const audioChunks = [];

      newMediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      newMediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.href = audioUrl;
        a.download = 'recording.wav';
        a.click();
      });

      setTimeout(() => {
        newMediaRecorder.stop();
          setRecording(false);
          setTimeout(() => {
              sendDataToServer();
          }, 2000);
    }, 3000);
});
};
    
    const sendDataToServer = async () => {
        const url = 'http://localhost/study/sentence/test'; // 실제 백엔드 API URL로 변경해주세요.
        const data = {
            url: 'C:\\Users\\SSAFY\\Downloads\\recording.wav',
            sentence: "do you wanna build a snowman?",
        };
    
        try {
          const response = await axios.post(url, data);
          console.log(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
      <body>
          {recording ? <h2>녹음중입니다.</h2> : <h2>마이크를 누르며 말해주세요.</h2>}
      <button onClick={startRecording} disabled={recording}>
          <br></br>
        <img src="https://play-lh.googleusercontent.com/tGPoLyKm57lHnCZJaSwOf8koy0N7tdsTcMFnC4XPbGLIduNc8F3Izw6jTsrLX7uElTI=w240-h480-rw">      
          </img>
            </button>
        </body>
  );
};

export default AudioRecorder;