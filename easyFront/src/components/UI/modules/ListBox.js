import React from 'react';
import styled from "styled-components";
import Textbox from '../atoms/Text/Textbox';

const StyledListBox = styled.div`
  padding: 2%;
  border-style: solid;
  border-width: 1px;
  border-radius: 10%;
`;

const ListBox = ({ textArray }) => {
  // 여기서 다시 선언하지 않고, 이미 받은 prop을 사용합니다.
  return (
    <React.Fragment>
      <StyledListBox>
        {textArray.map((text, index) => (
          <React.Fragment key={index}>
            <Textbox section="singleText" context1={text} context2={index < textArray.length - 1 ? null : ''} />
            {index < textArray.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </StyledListBox>
    </React.Fragment>
  );
};

export default ListBox;
