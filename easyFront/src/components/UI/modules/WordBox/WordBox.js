import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Textbox from "../../atoms/Text/Textbox";
import Button from "../../atoms/Button/Button";
import "./WordBox.css";
import WordDetailPage from "../../../pages/Common/WordDetailPage";

const WordBox = ({ wordId, word, isSaved, meaning, wordAudioUri }) => {
  const [Saved, setSaved] = useState(isSaved);

  const handleSaveClick = async () => {
    try {
      if (!Saved) {
        await axios.post(`https://i10b307.p.ssafy.io/study/word`, { wordId: wordId });
      } else {
        await axios.delete(`https://i10b307.p.ssafy.io/study/word`, { wordId: wordId });
      }
      setSaved(!Saved);
    } catch (error) {
      console.error("Error saving or deleting:", error);
    }
  };

  const handlePlayClick = () => {
    const audio = new Audio(wordAudioUri);
    audio.play();
  };

  return (
    <Link to={WordDetailPage} state={wordId}>
      <Textbox section="singleText" context1={word} />
      <div className="divider" />
      <Textbox section="singleText" context1={meaning} />
      <div className="buttons">
        {isSaved ? (
          <Button name="fBookMarkBtn" onClick={handleSaveClick} />
        ) : (
          <Button name="bookMarkBtn" onClick={handleSaveClick} />
        )}
        <Button name="listenBtn" onClick={handlePlayClick} />
      </div>
    </Link>
  );
};

export default WordBox;
