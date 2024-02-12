// EditFeedBox.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Textbox from '../../atoms/Text/Textbox';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';

const EditFeedBox = ({ profileImageUri, target_userId, isLiked, likes, heartCount, feedId, initialContent}) => {
  const navigate = useNavigate();
  const [content, setContent] = useState(initialContent);
  const [selectedImages, setSelectedImages] = useState(null);


  const handleImageChange = (e) => {
    const files = e.target.files;
    // Convert FileList to array and update selectedImages state
    setSelectedImages(Array.from(files));
  };

  const handleSaveClick = async () => {
    try {
      // Send a request to update the feed content
      const formData = new FormData();
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append('images', selectedImages[i]);
      }
      formData.append('feedId', feedId);
      formData.append('content', content);
      await axios.put(`https://i10b307.p.ssafy.io/neighbor/feed/${feedId}`, formData);

      // Redirect back to the FeedBox page after saving
      navigate(`/feed/${feedId}`);
    } catch (error) {
      console.error('Error while updating feed:', error);
    }
  };

  return (
    <div className="edit-feed-box">
      <div className="user-info">
        <img className="profile-img" src={profileImageUri} alt="Profile" />
        <Textbox section="singleText" context1={target_userId} />
      </div>
      <div className="like-comment-info">
        <Button name={isLiked ? 'fHeartBtn' : 'heartBtn'} />
        <Textbox section="singleText" context1={likes} />
        <Icon name="commentIcon" />
        <Textbox section="singleText" context1={heartCount} />
      </div>
      {selectedImages.length > 0 && (
        <div>
          {selectedImages.map((image, index) => (
            <img key={index} className="image-preview" src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
          ))}
        </div>
      )};
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <label htmlFor="image-upload">
        <Button name="impBtn" />
      </label>
      <input id="image-upload" type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: "none" }} />
      <Button name="submitBtn" text="완료" onClick={handleSaveClick} />
    </div>
  );
};

export default EditFeedBox;



{/* <EditFeedBox
          feedId={feedId}
          initialContent={content}
          isLiked={isLiked}
          likes={likes}
          commentCount={commentCount}
          nickname={nickname}
          profileImgageUri={profileImgageUri}
          feedImageUris={feedImageUris}
        /> */}