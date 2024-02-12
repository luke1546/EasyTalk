// SNSInputBox.js

import React, { useState } from "react";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SNSInputBox.css";

const SNSInputBox = ({ userId, feedId }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    // Convert FileList to array and update selectedImages state
    setSelectedImages(Array.from(files));
  };

  const handleSubmit = async () => {
    try {
      // Send a request to update the feed content
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("content", content);

      // Append each image file to the formData
      if (!feedId) {
        for (let i = 0; i < selectedImages.length; i++) {
          formData.append("images", selectedImages[i]);
        }
        await axios.post(`https://i10b307.p.ssafy.io/neighbor/feed`, formData);
        navigate("https://i10b307.p.ssafy.io/neighbor/feed?type=list");
      } else {
        await axios.post(`https://i10b307.p.ssafy.io/neighbor/feed/${feedId}/comment`, formData);
        navigate(`https://i10b307.p.ssafy.io/neighbor/feed/${feedId}`);
      }
    } catch (error) {
      console.error("Error while updating feed:", error);
    }
  };

  return (
    <div className="sns-input-box">
      {selectedImages.length > 0 && (
        <div>
          {selectedImages.map((image, index) => (
            <img
              key={index}
              className="image-preview"
              src={URL.createObjectURL(image)}
              alt={`Preview ${index}`}
            />
          ))}
        </div>
      )}
      <textarea
        placeholder={!feedId ? "게시글 내용을 입력하세요." : "댓글을 입력하세요."}
        value={content}
        onChange={handleContentChange}
      ></textarea>
      {!feedId && (
        <>
          <label htmlFor="image-upload">
            <Button name="impBtn" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </>
      )}
      <Button name="submitBtn" text="등록" onClick={handleSubmit} />
    </div>
  );
};

export default SNSInputBox;
