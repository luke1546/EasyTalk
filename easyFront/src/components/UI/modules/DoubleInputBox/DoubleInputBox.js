// DoubleInputBox.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Textbox from '../../atoms/Text/Textbox';
import Button from '../../atoms/Button/Button';
import './DoubleInputBox.css';

const DoubleInputBox = ({ groupId }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      await axios.post(`/group/${groupId}/join`, { 'password': password });
      navigate('https://i10b307.p.ssafy.io/group')
    }
    catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className="double-input-box">
      <div className="input-container">
        <Textbox section="passwordInput" context1="비밀번호" />
        <hr className="separator" />
        <input type="password" placeholder="비밀번호를 입력하세요." value={password} onChange={handlePasswordChange} />
      </div>
      <Button name="submitBtn" text="가입 신청하기" onClick={handleButtonClick} />
    </div>
  );
};


export default DoubleInputBox;
