// DoubleInputBox.js
import React from 'react';
import PropTypes from 'prop-types';
import Textbox from '../../atoms/Text/Textbox';
import Button from '../../atoms/Button/Button';
import './DoubleInputBox.css'; // 새로운 CSS 파일 추가

const DoubleInputBox = ({ password, onPasswordChange, onSubmit }) => {
  const handleButtonClick = () => {
    // 가입 신청하기 버튼을 클릭했을 때 실행되는 함수
    onSubmit(password);
  };

  return (
    <div className="double-input-box">
      <div className="input-container">
        <Textbox section="passwordInput" context1="비밀번호" />
        <hr className="separator" />
        <input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={(e) => onPasswordChange(e.target.value)} />
      </div>
      <Button name="submitBtn" text="가입 신청하기" onClick={handleButtonClick} />
    </div>
  );
};

DoubleInputBox.propTypes = {
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DoubleInputBox;
