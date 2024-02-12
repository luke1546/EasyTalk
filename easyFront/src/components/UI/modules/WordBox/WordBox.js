import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Textbox from '../../atoms/Text/Textbox';
import Button from '../../atoms/Button/Button';
import './WordBox.css';
import WordDetailPage from "../../../pages/Common/WordDetailPage";

const WordBox = ({ wordId, word, isSaved, meaning, wordAudioUri }) => {
  const [Saved, setSaved] = useState(isSaved);

  const handleSaveClick = async (event) => {
    event.stopPropagation();
    try {
      if (!Saved) {
        await axios.post(`https://i10b307.p.ssafy.io:8080/study/word`, { 'wordId': wordId });
        setSaved(true);
      } else {
        await axios.delete(`https://i10b307.p.ssafy.io:8080/study/word?wordId=${wordId}`);
        setSaved(false);
      }
    } catch (error) {
      console.error('Error saving or deleting:', error);
    }
  };

  const handlePlayClick = (event) => {
    event.stopPropagation();
    const audio = new Audio(wordAudioUri);
    audio.play();
  };

  return (
    <div>
      <Link to={`/study/word/${wordId}/detail`} state={wordId}>
        <Textbox section="singleText" context1={word} />
        <div className="divider" />
        <Textbox section="singleText" context1={meaning} />
      </Link>
      <div className="buttons">
        {Saved ? (
          <Button name="fBookMarkBtn" onClick={handleSaveClick} />
        ) : (
          <Button name="bookMarkBtn" onClick={handleSaveClick} />
        )}
        <Button name="listenBtn" onClick={handlePlayClick} />
      </div>
    </div>
  );
};

export default WordBox;
