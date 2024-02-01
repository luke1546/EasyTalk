import * as React from "react";
import styled from "styled-components";
import profileImage from "../../../assets/minji.jpg";
import Textbox from "../atoms/Text/Textbox";

const StyledImage = styled.img`
  border-radius: 50%;
  width: 30px; // 이미지의 크기를 조절해주세요
  height: 30px; // 이미지의 크기를 조절해주세요
`;

const StyledTextbox = styled(Textbox)`
  border: 1px solid #ccc; // 텍스트 박스에 적용될 border 스타일
  padding: 10px; // 텍스트 박스 내부 여백
  display: inline-block;
`;

const ChatBox = () => {
  return (
    <div>
      <StyledImage src={profileImage} alt="Profile" />
      <StyledTextbox section="doubleText" context1="내이름은서민지거꾸로해도서민지"  />
    </div>
  );
};

export default ChatBox;