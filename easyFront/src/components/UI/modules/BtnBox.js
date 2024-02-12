import styled from "styled-components";
import Textbox from "../atoms/Text/Textbox";
import Button from "../atoms/Button/Button";
import { Link } from "react-router-dom";

const StyledBtnBox = styled.div`
  padding: 2%;
  border-style: solid;
  border-width: 1px;
  border-radius: 10%;
  border-color: ${({ btnColor }) => btnColor || "#8382ff"}};
  `;

const BtnBox = ({ text1, text2, text3, btnText, btnColor, btnLink }) => {
  return (
    <StyledBtnBox btnColor={btnColor}>
      <div>
        <Textbox section="singlePage" context1={text1} />
      </div>
      <div>
        <Textbox section="singlePage" context1={text2} />
      </div>
      <div>
        <Textbox section="singlePage" context1={text3} />
      </div>
      <Link to={btnLink}>
        <Button name="submitBtn" text={btnText} color={btnColor} />
      </Link>
    </StyledBtnBox>
  );
};

export default BtnBox;
