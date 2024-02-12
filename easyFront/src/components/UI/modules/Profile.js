import styled from "styled-components";
import Textbox from "../atoms/Text/Textbox";
import { useState, useRef } from "react";

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const StyledImgWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTextWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const StyledProfile = styled.div`
  display: flex;
  flex-direction: row;
`;

const Profile = ({ direction, text1, text2, text3, imageUrl }) => {
  // const [imageUrl, setImageUrl] = useState(
  //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  // );
  const fileInput = useRef();

  if (direction === "left") {
    return (
      <StyledProfile>
        <StyledImgWrapper>
          <StyledImg src={imageUrl} />
        </StyledImgWrapper>
        <StyledTextWrapper>
          <Textbox section="singlePage" context1={text1} />
          <Textbox section="singlePage" context1={text2} />
          <Textbox section="singlePage" context1={text3} />
        </StyledTextWrapper>
      </StyledProfile>
    );
  }
  return (
    <StyledProfile>
      <StyledTextWrapper>
        <Textbox section="singlePage" context1={text1} />
        <Textbox section="singlePage" context1={text2} />
        <Textbox section="singlePage" context1={text3} />
      </StyledTextWrapper>
      <StyledImgWrapper>
        <StyledImg src={imageUrl} />
      </StyledImgWrapper>
    </StyledProfile>
  );
};

export default Profile;
