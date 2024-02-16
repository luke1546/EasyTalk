// FeedBox.js
import React, { useState } from 'react';
import axios from 'axios';
import Textbox from '../../atoms/Text/Textbox';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import { useNavigate } from 'react-router-dom';
import './FeedBox.css';
import EditFeedBox from '../EditFeedBox/EditFeedBox';

const FeedBox = ({ userId, feedId, profileImg, userName, isLiked: initialIsLiked, likeCount, commentCount, content, createdDate, feedImageUris, editMode }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(likeCount);
  const [isEditing, setIsEditing] = useState(false);
  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await axios.delete(`http://your-api-url/remove-like/${feedId}`, {
          withCredentials: true,
        });
      } else {
        await axios.post(`http://your-api-url/add-like/${feedId}`, {}, {
          withCredentials: true,
        });
      }

      setIsLiked(!isLiked);
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error('Error while handling like:', error);
    }
  };

  const handleFeedBoxClick = (feedId) => {
    // TODO: FeedBox 클릭 시의 동작 및 해당 FeedBox의 세부페이지로 이동 구현
    navigate(`/neighbor/feed/${feedId}`);
  };

  const handleEditClick = () => {
    // 피드 수정 버튼 클릭 시 수정 모드 활성화
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    // 피드 수정 취소 시 수정 모드 비활성화
    setIsEditing(false);
  };

  const handleUserClick = () => {
    // Navigate to the user's detail page
    navigate(`/user/${userId}`);
  };

  return (
    <div 
    className="feed-box" 
    onClick={isEditing ? handleFeedBoxClick(feedId) : undefined}
    >

      {isEditing ? (
        // 수정 모드일 때 EditFeedBox 컴포넌트를 렌더링
        <EditFeedBox
          feedId={feedId}
          content={content}
          onCancel={handleCancelEdit}
          isLiked={isLiked}
          likes={likes}
          commentCount={commentCount}
          userName={userName}
          profileImg={profileImg}
          feedImageUris={feedImageUris}
        />
      ) : (
        <>
          <div className="feed-info">
            <div className="user-info" onClick={handleUserClick}>
              <img className="profile-img" src={"https://easy-s3-bucket.s3.ap-northeast-2.amazonaws.com"+profileImg} alt="Profile" />
                <Textbox section="singleText" context1={userName} />
                
            </div>
            <div className="like-comment-info">
              <Button name={isLiked ? 'fHeartBtn' : 'heartBtn'} color="red" size="20px" onClick={handleLikeClick} />
              <Textbox section="singleText" context1={likes} />
              <Icon name="commentIcon" size="18px" color="grey" />
              <Textbox section="singleText" context1={commentCount} />
            </div>
          </div>
          <img className="feed-img" src={"https://easy-s3-bucket.s3.ap-northeast-2.amazonaws.com"+feedImageUris} alt="FeedImage" />
            <Textbox section="singleText" context1={content} />
            <Textbox section="singleText" context1={createdDate} />
            {/* {editMode && (
            <div onClick={handleEditClick}>
              <Button name="submitBtn" text="수정"  />
            </div>
          )} */}
          </>
      )}
    </div>
  );
};

export default FeedBox;
