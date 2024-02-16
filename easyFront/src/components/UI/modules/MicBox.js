import styled from "styled-components";
import Textbox from "../atoms/Text/Textbox";
import Button from "../atoms/Button/Button";
import Input from "../atoms/Input/Input";

const MicBtn = styled(Button)`
  color: #9c9cff;
  display: flex;
  padding: 30px;
  border: 2px solid #9c9cff;
  border-radius: 50px;
  margin: 20px;
`;

const Micdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MicBox = () => {
  return (
    <>
      <Micdiv>
        <Textbox section="singlePage" context1="마이크를 누르면 녹음이 시작돼요." />
      </Micdiv>
      <Micdiv>
        <MicBtn name="micCircleBtn" size="40" />
      </Micdiv>
      <Micdiv>
        <Input name="singleInput" placeholder="발음을 인식한 문장" />
      </Micdiv>
    </>
  );
};

export default MicBox;
