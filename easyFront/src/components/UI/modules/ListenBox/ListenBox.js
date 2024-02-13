// ListenBox.js

import React, { useState } from 'react';
import axios from "axios";
import Textbox from '../../atoms/Text/Textbox';
import Button from '../../atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import './ListenBox.css'; // 필요한 CSS 파일을 import

const ListenBox = ({ sentence }) => {
  const navigate = useNavigate();
  const [isSaved, setSaved] = useState(sentence.saved);

  const handleSaveClick = async (event) => {
    event.stopPropagation();
    try {
      if (!isSaved) {
        await axios.post(`https://i10b307.p.ssafy.io:8080/study/sentence`, {'sentenceId' : sentence.sentenceId})
        setSaved(true);
      } else {
        await axios.delete(`https://i10b307.p.ssafy.io:8080/study/sentence?sentenceId=${sentence.sentenceId}`);
        setSaved(false);
      }
    } catch (error) {
      console.error('Error saving or deleting:', error);
    }
  };

  const handleListenBoxClick = (id) => {
    navigate(`/study/sentence/${id}/detail`);
  };

  const handlePlayClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="listen-box" onClick={() => handleListenBoxClick(sentence.sentenceId)}>
      <div className="text-area">
        <Textbox section="singleText" context1={sentence.sentence} />
        <Textbox section="singleText" context1={sentence.meaning} />
      </div>
      <div className="icons-area">
        {isSaved ? (
          <Button name="fBookMarkBtn" onClick={handleSaveClick} />
        ) : (
          <Button name="bookMarkBtn" onClick={handleSaveClick} />
        )}
        <Button name="listenBtn" onClick={handlePlayClick} />
      </div>
    </div>
  );
};

export default ListenBox;
