// FeedBox.js
import React, { useState } from 'react';
import axios from 'axios';
import Textbox from '../../atoms/Text/Textbox';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import { useNavigate } from 'react-router-dom';
import './FeedBox.css';
import EditFeedBox from '../EditFeedBox/EditFeedBox';

const FeedBox = ({ feedId, targetUserId, profileImgageUri, feedImageUris, nickname, isLiked: initialIsLiked, heartCount, commentCount, content, registerDate }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(heartCount);

  const handleLikeClick = async (event) => {
    event.stopPropagation();
    try {
      if (isLiked) {
        await axios.delete(`https://i10b307.p.ssafy.io/neighbor/feed/${feedId}`, {
          withCredentials: true,
        });
      } else {
        await axios.post(`https://i10b307.p.ssafy.io/neighbor/feed/${feedId}`, {}, {
          withCredentials: true,
        });
      }

      setIsLiked(!isLiked);
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error('Error while handling like:', error);
    }
  };

  const handleFeedBoxClick = (event) => {
    event.stopPropagation();
    // TODO: FeedBox 클릭 시의 동작 및 해당 FeedBox의 세부페이지로 이동 구현
    navigate(`/neighbor/feed/${feedId}`);
  };

  const handleUserClick = (event) => {
    event.stopPropagation();
    // Navigate to the user's detail page
    navigate(`/neighbor/user/${targetUserId}`);
  };

  return (
    <div className="feed-box" onClick={handleFeedBoxClick}>
      <div className="feed-info">
        <div className="user-info" onClick={handleUserClick}>
          <img className="profile-img" src={profileImgageUri} alt="Profile" />
          <Textbox section="singleText" context1={nickname} />
        </div>
        <div className="like-comment-info">
          <Button name={isLiked ? 'fHeartBtn' : 'heartBtn'} onClick={handleLikeClick} />
          <Textbox section="singleText" context1={likes} />
          <Icon name="commentIcon" />
          <Textbox section="singleText" context1={commentCount} />
        </div>
      </div>
      <Textbox section="singleText" context1={content} />
      <img className="feedImage-Uris" src={feedImageUris} alt="feedImageUris" />
      <Textbox section="singleText" context1={registerDate} />
    </div>
  );
};

export default FeedBox;