import * as React from "react";
import styled from "styled-components";
import Button from "../atoms/Button/Button";
import Icon from "../atoms/Icon/Icon";
import Input from "../atoms/Input/Input";
import Label from "../atoms/Label/Label";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;


const InputBar = ({ variant }) => {
  const handleInputClick = (inputname) => {
    // 버튼 클릭 시 실행되어야 할 로직을 작성
    console.log(`Input ${inputname} clicked`);
  };

  return (
    <StyledContainer>
      {/* 검색어를 입력하세요 */}
      {variant === 'searchinputbar' && (
        <>
          <Icon name="searchIcon" />
          <Input name="searchInput" label="검색어를 입력하세요" />
          <Button name="xBtn" onClick={() => handleInputClick('searchInput')} />
        </>
      )}

      {variant === 'chatinputbar' && (
        <>
          <Icon name="commentIcon" />
          <Input name="searchInput" label="검색어를 입력하세요" />
          <Button name="submitBtn"  text="전송" onClick={() => handleInputClick('chatInput')} />

        </>
      ) }
    </StyledContainer>
  )
};
 

export default InputBar;