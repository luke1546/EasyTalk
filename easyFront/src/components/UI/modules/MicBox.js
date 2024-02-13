import styled from "styled-components";
import Textbox from "../atoms/Text/Textbox";
import Button from "../atoms/Button/Button";
import Input from "../atoms/Input/Input";

const MicBtn = styled(Button)`
  color: #8382ff;
`;

const MicBox = () => {
  return (
    <>
      <div>
        <Textbox section="singlePage" context1="마이크를 누르며 말해주세요." />
      </div>
      <div>
        <MicBtn name="micCircleBtn" size="40" />
      </div>
      <div>
        <Input name="singleInput" placeholder="발음을 인식한 문장" />
      </div>
    </>
  );
};

export default MicBox;
