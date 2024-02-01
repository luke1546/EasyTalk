import { Link } from "react-router-dom";
import Textbox from "../atoms/Text/Textbox";
import Button from "../atoms/Button/Button";
import styled from "styled-components";

const LogoTextbox = styled(Textbox)`
  color: #8382ff;
  font-weight: bold;
`;

const BellBtn = styled(Button)`
  color: #8382ff;
`;

const Header = () => {
  const loginToken = false;

  const notice = () => {
    console.log("알림 버튼 눌림!!");
  };

  return (
    <div className="Header">
      {/* 여기 로그인버튼은 조건절로 로그인 시에는 로그아웃창이나 미니프로필로 전환인데 생각해보면 접근제한때문에 그냥 상시로 로그아웃해도 괜찮을듯 */}
      <Link to="/">
        <LogoTextbox section="logoText" context1="쉽게말해" />
      </Link>
      <BellBtn name="bellBtn" onClick={notice} />
      {loginToken ? (
        <button>로그아웃</button>
      ) : (
        <Link to="/login">
          <Button name="submitBtn" text="로그인" />
        </Link>
      )}
    </div>
  );
};

export default Header;
