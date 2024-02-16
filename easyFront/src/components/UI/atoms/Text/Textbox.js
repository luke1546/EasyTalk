import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextBoxContainer = styled.span`
  display: flex;
  justify-content: flex-start;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight}; 
  color: ${props => props.color}; 
  word-break: keep-all;
`;

export const Textbox = ({ section, context1, context2, color, fontSize, fontWeight, ...props }) => {
  return (
    <TextBoxContainer className={"${section}-textbox"} color={color} fontSize={fontSize} fontWeight={fontWeight} {...props}>
      {section === "doubleText" ? (
        <>
          <span>{context1}</span>
          <span>{context2}</span>
        </>
      ) : (
        <span>{context1}</span>
      )}
    </TextBoxContainer>
  );
};

Textbox.propTypes = {
  section: PropTypes.string.isRequired,
  context1: PropTypes.string.isRequired,
  context2: PropTypes.string,
  fontSize: PropTypes.string,
};

Textbox.defaultProps = {
  context2: null,
  fontSize: '20px',  // 기본 폰트 크기를 16px로 설정하였습니다. 필요에 따라 변경 가능합니다.
};

export default Textbox;
