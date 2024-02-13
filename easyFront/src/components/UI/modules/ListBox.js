import React from 'react';
import styled from "styled-components";
import Textbox from '../atoms/Text/Textbox';
import Line from '../atoms/Line/Line';

const StyledListBox = styled.div`
  border-radius: 30px;
  border: 2px solid #8382ff;
  padding: 30px 20px;
  margin: 20px;
`;

const TextDiv = styled.div`
  text-align: left; // 왼쪽 정렬 추가
  padding-left: 20px;
`;
const ListBox = ({ textArray }) => {
  // 여기서 다시 선언하지 않고, 이미 받은 prop을 사용합니다.
  return (
    <React.Fragment>
      <StyledListBox>
        {textArray.map((text, index) => (
          <React.Fragment key={index}>
            <TextDiv>
              <Textbox section="singleText"
                context1={text} context2={index < textArray.length - 1 ? null : ''} />
            </TextDiv>
            {index < textArray.length - 1 && <Line />}
          </React.Fragment>
        ))}
      </StyledListBox>
    </React.Fragment>
  );
};

export default ListBox;
