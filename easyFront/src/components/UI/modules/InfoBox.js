import styled from "styled-components";
import Textbox from "../atoms/Text/Textbox";
import { Link } from "react-router-dom";

const StyledInfoBox = styled.div`
  padding: 2%;
  border-style: solid;
  border-width: 1px;
  border-radius: 10%;
  border-color: #8382ff;
  color: #2f2f2f;
`;

const InfoBox = ({ text1, text2, text3, text4, nums }) => {
  return (
    <Link to={`/group/${nums}`}>
      <StyledInfoBox>
        <div>
          <Textbox section="singlePage" context1={text1} />
        </div>
        <div>
          <Textbox section="singlePage" context1={text2} />
        </div>
        <div>
          <Textbox section="singlePage" context1={text3} />
        </div>
        <div>
          <Textbox section="singlePage" context1={text4} />
        </div>
      </StyledInfoBox>
    </Link>
  );
};

export default InfoBox;
