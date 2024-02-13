import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../atoms/Button/Button";


const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;



function TripleBtn() {
  const handleButtonClick = (buttonInfo) => {
    console.log(`Button ${buttonInfo.name} clicked. Text: ${buttonInfo.text}`);
  };
  
  // bookMarkText와 isBookMarked를 상태로 관리
  const [bookMarkText, setBookMarkText] = useState("저장하기");
  const [isBookMarked, setIsBookMarked] = useState(true);
  const [shareText] = useState("공유하기");
  const [micText] = useState("시험보기");

  useEffect(() => {
    if (isBookMarked) {
      setBookMarkText("제거하기");
    } else {
      setBookMarkText("저장하기");
    }
  }, [isBookMarked]);

  // isBookMarked 상태에 따라 다른 버튼을 렌더링
  const bookMarkBtn = isBookMarked ? (
    <Button name="fBookMarkBtn" text={bookMarkText} onClick={() => { handleButtonClick({ name: 'fBookMarkBtn', text: bookMarkText }); setIsBookMarked(!isBookMarked); }} />
  ) : (
    <Button name="bookMarkBtn" text={bookMarkText} onClick={() => { handleButtonClick({ name: 'bookMarkBtn', text: bookMarkText }); setIsBookMarked(!isBookMarked); }} />
  );

  return (
    <div>
      <div>
        {bookMarkBtn}
        <Button name="shareBtn" text={shareText} onClick={() => handleButtonClick({ name: 'shareBtn', text: shareText })} />
        <Button name="micCircleBtn" text={micText} onClick={() => handleButtonClick({ name: 'micCircleBtn', text: micText })} />
      </div>
      <StyledContainer>
        <p>{bookMarkText}</p>
        <p>{shareText}</p>
        <p>{micText}</p>
      </StyledContainer>
    </div>
  );
}

export default TripleBtn;
