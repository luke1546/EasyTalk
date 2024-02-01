// WordBox.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Textbox from '../../atoms/Text/Textbox';
import Button from '../../atoms/Button/Button';
import './WordBox.css';

const WordBox = ({ word, meaning, isBookmarked, audioUrl, onBookmarkChange, ...props }) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 북마크 상태가 변경될 때마다 외부에서 제공받은 콜백 호출
    onBookmarkChange(bookmarked);
  }, [bookmarked, onBookmarkChange]);

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Link to={`/word-details/${word}`} className="word-box" {...props}>
      <Textbox section="singleText" context1={word} />
      <div className="divider" />
      <Textbox section="singleText" context1={meaning} />
      <div className="buttons">
        {bookmarked ? (
          <Button name="fBookMarkBtn" onClick={handleBookmarkClick} />
        ) : (
          <Button name="bookMarkBtn" onClick={handleBookmarkClick} />
        )}
        <Button name="listenBtn" onClick={handlePlayClick} />
        {/* ... 이하 생략 ... */}
      </div>
    </Link>
  );
};

WordBox.propTypes = {
  word: PropTypes.string.isRequired,
  meaning: PropTypes.string.isRequired,
  isBookmarked: PropTypes.bool,
  audioUrl: PropTypes.string,
  onBookmarkChange: PropTypes.func, // 외부에서 북마크 상태 변경을 감지하기 위한 콜백
};

WordBox.defaultProps = {
  isBookmarked: false,
  audioUrl: null,
  onBookmarkChange: () => {}, // 기본값으로 빈 함수를 전달
};

export default WordBox;
