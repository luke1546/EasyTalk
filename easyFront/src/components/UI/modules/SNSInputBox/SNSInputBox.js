// SNSInputBox.js

import React, { useState } from 'react';
import Button from '../../atoms/Button/Button';
import './SNSInputBox.css';

const SNSInputBox = ({ type, onSubmit }) => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = () => {
    // TODO: 게시글 또는 댓글 작성 로직 구현
    onSubmit({ content, selectedImage });
  };

  return (
    <div className={`sns-input-box ${type}`}>
      {selectedImage && (
      <img className="image-preview" src={URL.createObjectURL(selectedImage)} alt="Preview" />
      )}
      <textarea
        placeholder={type === 'post' ? '게시글 내용을 입력하세요.' : '댓글을 입력하세요.'}
        value={content}
        onChange={handleContentChange}
      ></textarea>
      {type === 'post' && (
        <>
          <label htmlFor="image-upload">
            <Button name="impBtn" />
          </label>
          <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} />
        </>
      )}
      <Button name="submitBtn" text='등록' onClick={handleSubmit} />
    </div>
  );
};

export default SNSInputBox;
