// EditFeedBox.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Textbox from '../../atoms/Text/Textbox';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';

const EditFeedBox = ({ feed, onCancel }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [myFeed, setMyFeed] = useState('');
  const [heartCount, setHeartCount] = useState('');
  const [commentCount, setCommentCount] = useState('');
  const [feedImageUris, setFeedImageUris] = useState('');

  useEffect(() => {
    if (feed) {
      setPreviewImage(feed.image);
      setContent(feed.content);
      setNickname(feed.nickname);
      setMyFeed(feed.myFeed);
      setHeartCount(feed.heartCount);
      setCommentCount(feed.commentCount);
      setFeedImageUris(feed.feedImageUris);
    }
  }, [feed]); // feed가 변경될 때마다 실행


  // 이미지 변경 핸들러
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = (finishedEvent) => {
      setPreviewImage(finishedEvent.currentTarget.result);
    };
  };

  // 저장 버튼 클릭 핸들러
  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('feedId', feed.feedId);
      formData.append('images', selectedImage);
  
      await axios.put(`/neighbor/feed/${feed.feedId}`, formData, { withCredentials: true });
      navigate(`/feed/${feed.feedId}`);
    } catch (error) {
      console.error('Error while updating feed:', error);
    }
  };


  return (
    <div className="edit-feed-box">
      <div className="user-info">
      <Textbox section="singleText" context1={nickname} />
      </div>
      <div className="like-comment-info">
        <Button name={myFeed ? 'fHeartBtn' : 'heartBtn'} />
        <Textbox section="singleText" context1={heartCount} />
        <Icon name="commentIcon" />
        <Textbox section="singleText" context1={commentCount} />
      </div>
      <div className="test">
        
        
      {selectedImage ? (
    <img className="image-preview" src={previewImage} alt="Preview" />
    ) : (
    <img className="image-preview" src={`https://easy-s3-bucket.s3.ap-northeast-2.amazonaws.com${feedImageUris[feedImageUris.length-1]}`} alt="Preview" />
    )}

      
        </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <label htmlFor="image-upload">
        <Button name="impBtn" />
      </label>
      <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
      <div onClick={() => handleSaveClick()}>
      <Button name="submitBtn" text="완료" />
      </div>
      <Button name="basicBtn" text="취소" onClick={onCancel} />
    </div>
  );
};

export default EditFeedBox;