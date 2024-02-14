import * as React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  border: 2px solid #8382ff;
  border-radius: 50px;
  padding: 0 20px; // 상하 0, 좌우 20px
  height: 20px;
  width: 100%;
`;

const SingleInput = styled.input`
  border: 2px solid #8382ff;
  border-radius: 50px;
  padding: 0 20px; // 상하 0, 좌우 20px
  height: 40px;
  width: calc(100% - 80px);
  font-size: 18px;s
`;

const Input = (props) => {
  if (props.name === "searchInput") {
    return (
      <div className="searchInput">
        <input id="searchInput" type="text" {...props} />
      </div>
    );
  }

  if (props.name === "singleInput") {
    return (
      <span className="singleInput">
        <input id="singleInput" type="text" {...props} />
      </span>
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