// input.js
import * as React from "react";
import styled from "styled-components";

const SearchInput = styled.div`
  border: 2px solid #9c9cff;
  border-radius: 50px;
  padding: 0 20px; // 상하 0, 좌우 20px
  height: 35px;
  width: 100%-40px;
  margin: 0 5px;
`;

const SingleInput = styled.div`
  border: 2px solid #9c9cff;
  border-radius: 50px;
  padding: 10px 20px; // 상하 0, 좌우 20px
  height: 30px;
  width: calc(100% - 80px);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const StyleInput = styled.input`
  border: none;
  outline: none;
  padding: 0;
  font-size: 17px;
  background-color: transparent;
`;

const Input = (props) => {
  if (props.name === "searchInput") {
    return (
      <SearchInput className="searchInput">
        <StyleInput id="searchInput" type="text" {...props} />
      </SearchInput>
    );
  }

  if (props.name === "singleInput") {
    return (
      <SingleInput className="singleInput">
        <StyleInput id="singleInput" type="text" {...props} />
      </SingleInput>
    );
  }

  if (props.name === "doubleInput") {
    const { placeholder1, placeholder2, restProps } = props;
    return (
      <div className="doubleInput">
        <input id="doubleInput" type="text" placeholder={placeholder1} {...restProps} />
        <input id="doubleInput" type="text" placeholder={placeholder2} {...restProps} />
      </div>
    );
  }
};

export default Input;