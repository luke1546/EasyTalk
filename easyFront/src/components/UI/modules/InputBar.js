import * as React from "react";
import styled from "styled-components";
import Button from "../atoms/Button/Button";
import Icon from "../atoms/Icon/Icon";
import Input from "../atoms/Input/Input";
import Label from "../atoms/Label/Label";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputBar = ({ variant }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleInputClick = () => {
    // 버튼 클릭 시 실행되어야 할 로직을 작성
    if (searchValue === "") {
      alert("검색어를 입력해주세요!");
    } else {
      navigate(`/study/music/search/${searchValue}`);
    }
  };

  return (
    <StyledContainer>
      {/* 검색어를 입력하세요 */}
      {variant === "searchinputbar" && (
        <>
          <Icon name="searchIcon" />
          <Input
            name="searchInput"
            label="검색어를 입력하세요"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleInputClick();
              }
            }}
          />
          <Button name="xBtn" onClick={handleInputClick} />
        </>
      )}

      {variant === "chatinputbar" && (
        <>
          <Icon name="commentIcon" />
          <Input name="searchInput" label="검색어를 입력하세요" />
          <Button name="submitBtn" text="전송" onClick={() => handleInputClick("chatInput")} />
        </>
      )}
    </StyledContainer>
  );
};

export default InputBar;