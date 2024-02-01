// EditFeedBox.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Textbox from '../../atoms/Text/Textbox';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';

const EditFeedBox = ({ profileImg, userName, isLiked, likes, commentCount, feedId, initialContent, onCancel }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState(initialContent);
  const [selectedImage, setSelectedImage] = useState(null);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSaveClick = async () => {
    try {
      // Send a request to update the feed content
      const formData = new FormData();
      formData.append('image', selectedImage);
      await axios.put(`http://your-api-url/update-feed/${feedId}`, { content }, { withCredentials: true });

      await axios.post('http://your-api-url/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Redirect back to the FeedBox page after saving
      navigate(`/feed/${feedId}`);
    } catch (error) {
      console.error('Error while updating feed:', error);
    }
  };

  return (
    <div className="edit-feed-box">
      <div className="user-info">
        <img className="profile-img" src={profileImg} alt="Profile" />
        <Textbox section="singleText" context1={userName} />
      </div>
      <div className="like-comment-info">
        <Button name={isLiked ? 'fHeartBtn' : 'heartBtn'} />
        <Textbox section="singleText" context1={likes} />
        <Icon name="commentIcon" />
        <Textbox section="singleText" context1={commentCount} />
      </div>
      {selectedImage && (
      <img className="image-preview" src={URL.createObjectURL(selectedImage)} alt="Preview" />
      )}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <label htmlFor="image-upload">
        <Button name="impBtn" />
      </label>
      <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
      <Button name="submitBtn" text="완료" onClick={handleSaveClick} />
      <Button name="basicBtn" text="취소" onClick={onCancel} />
    </div>
  );
};

export default EditFeedBox;
