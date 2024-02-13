// ListenBox.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Textbox from '../../atoms/Text/Textbox';
import Button from '../../atoms/Button/Button';
import './ListenBox.css'; // 필요한 CSS 파일을 import
import SentenceSituationPage from "../../../pages/Sentence/SentenceSituationPage";

const ListenBox = ({ sentence1, sentence2 }) => {
  const [bookmarked1, setBookmarked1] = useState(sentence1.isBookmarked);
  const [bookmarked2, setBookmarked2] = useState(sentence2.isBookmarked);
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);

  useEffect(() => {
    // 북마크 상태가 변경될 때마다 외부에서 제공받은 콜백 호출
    // onBookmarkChange(bookmarked);
  }, [bookmarked1, bookmarked2]); // 외부에서 제공받은 콜백은 현재 주석 처리되어 있습니다.

  const handleBookmarkClick1 = () => {
    setBookmarked1(!bookmarked1);
  };

  const handleBookmarkClick2 = () => {
    setBookmarked2(!bookmarked2);
  };

  const handlePlayClick1 = () => {
    setIsPlaying1(!isPlaying1);
  };

  const handlePlayClick2 = () => {
    setIsPlaying2(!isPlaying2);
  };

  return (
    <div className="listen-box">
      <Link to={SentenceSituationPage} className="sentence-box">
        <div className="text-area">
          <Textbox section="singleText" context1={sentence1.sentence} />
          <Textbox section="singleText" context1={sentence1.meaning} />
        </div>
        <div className="icons-area">
          {bookmarked1 ? (
            <Button name="fBookMarkBtn" onClick={handleBookmarkClick1} />
          ) : (
            <Button name="bookMarkBtn" onClick={handleBookmarkClick1} />
          )}
          <Button name="listenBtn" onClick={handlePlayClick1} />
        </div>
        <div className="divider" />
        <div className="text-area">
          <Textbox section="singleText" context1={sentence2.sentence} />
          <Textbox section="singleText" context1={sentence2.meaning} />
        </div>
        <div className="icons-area">
          {bookmarked2 ? (
            <Button name="fBookMarkBtn" onClick={handleBookmarkClick2} />
          ) : (
            <Button name="bookMarkBtn" onClick={handleBookmarkClick2} />
          )}
          <Button name="listenBtn" onClick={handlePlayClick2} />
        </div>
      </Link>
    </div>
  );
};

ListenBox.propTypes = {
  sentence1: PropTypes.shape({
    sentence: PropTypes.string.isRequired,
    sentence_id: PropTypes.string.isRequired,
    meaning: PropTypes.string.isRequired,
    isBookmarked: PropTypes.bool,
    audioUrl: PropTypes.string,
  }).isRequired,
  sentence2: PropTypes.shape({
    sentence: PropTypes.string.isRequired,
    sentence_id: PropTypes.string.isRequired,
    meaning: PropTypes.string.isRequired,
    isBookmarked: PropTypes.bool,
    audioUrl: PropTypes.string,
  }).isRequired,
};

export default ListenBox;
