// ListenBox.js

import React, { useState, useEffect } from 'react';
import axios from "axios";
import Textbox from "../../atoms/Text/Textbox";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import "./ListenBox.css"; // 필요한 CSS 파일을 import

const ListenBox = ({ id, type }) => {
  const navigate = useNavigate();
  const [sentence, setSentence] = useState('');
  const [isSaved, setSaved] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [lyricId, setLyricId] = useState('');

  useEffect(() => {
    
    const fetchSentence = async () => {
      try {
          const response = await axios.get(`https://i10b307.p.ssafy.io:8080/study/sentence/detail?target=${id}`);
          setSentence(response.data);
          setSaved(response.data.saved);
          setAudioUrl(response.data.sentenceAudioUri);
          console.log(response.data)
          if (type === 'lyric') {
            const lyricId = await axios.get(`https://i10b307.p.ssafy.io:8080/study/music/sentence?target=${response.data.sentenceId}`)
            setLyricId(lyricId.data)
            setAudioUrl(`/study/music/lyric/audio/${lyricId.data}.wav`);
            console.log(audioUrl)
            console.log(lyricId.data)
          }

          } catch (error) {
        console.error('문장을 가져오는 중 에러 발생:', error);
      }
    };

    fetchSentence();
  }, [id]);

  const playAudio = (event) => {
    event.stopPropagation();
    const audio = new Audio(`https://easy-s3-bucket.s3.ap-northeast-2.amazonaws.com${audioUrl}`);
    audio.play();
  };

  const handleSaveClick = async (event) => {
    event.stopPropagation();
    try {
      if (!isSaved) {
        await axios.post(`https://i10b307.p.ssafy.io:8080/study/sentence`, {'sentenceId' : id});
        setSaved(true);
      } else {
        await axios.delete(`https://i10b307.p.ssafy.io:8080/study/sentence?sentenceId=${id}`);
        await axios.delete(`https://i10b307.p.ssafy.io:8080/study/sentence?sentenceId=${id}`);
        setSaved(false);
      }
    } catch (error) {
      console.error("Error saving or deleting:", error);
    }
  };

  const handleListenBoxClick = (id) => {
    navigate(`/study/sentence/${id}/detail`);
  };

  return (
    <div className="listen-box" onClick={() => handleListenBoxClick(sentence.sentenceId)}>
      <div className="text-area">
        <Textbox section="singleText" fontWeight="bold" context1={sentence.sentence} />
        <Textbox section="singleText" context1={sentence.meaning} />
      </div>
      <div className="icons-area">
        {isSaved ? (
          <Button name="fBookMarkBtn" onClick={handleSaveClick} />
        ) : (
          <Button name="bookMarkBtn" onClick={handleSaveClick} />
        )}
        <Button name="listenBtn" onClick={playAudio} />
      </div>
    </div>
  );
};

export default ListenBox;