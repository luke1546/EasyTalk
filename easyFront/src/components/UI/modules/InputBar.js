//InputBar.js
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
  margin: 20px 0 0px 0;
  margin: 20px 0 0px 0;
`;
const InputBar = ({ variant, uri, onSubmit }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleInputClick = () => {
    // 버튼 클릭 시 실행되어야 할 로직을 작성
    if (searchValue === "") {
      alert("검색어를 입력해주세요!");
    } else {
      navigate(uri + `${searchValue}`);
      // navigate(`/neighbor/search/${searchValue}`);
    }
  };

  const intro = () => {
    if (searchValue === "") {
      alert("검색어를 입력해주세요!");
    } else {
      onSubmit && onSubmit(searchValue);
    }
  };
  return (
    <StyledContainer>
      {/* 검색어를 입력하세요 */}
      {variant === "searchinputbar" && (
        <>
          <Input
            name="searchInput"
            placeholder="검색어를 입력하세요."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleInputClick(uri);
              }
            }}
          />
          <span onClick={handleInputClick}>
            <Icon name="searchIcon" size="35px" color="#9c9cff" />
          </span>
        </>
      )}

      {variant === "introinputbar" && (
        <>
          <Input
            name="searchInput"
            placeholder="검색창"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                intro();
              }
            }}
          />
          <span onClick={intro}>
            <Icon name="searchIcon" size="30px" color="#9c9cff" />
          </span>
        </>
      )}
      {variant === "chatinputbar" && (
        <>
          <Icon name="commentIcon" />
          <Input name="searchInput" placeholder="채팅을 입력하세요." />
          <Button name="submitBtn" text="전송" onClick={() => handleInputClick("chatInput")} />
        </>
      )}
    </StyledContainer>
  );
};
export default InputBar;
