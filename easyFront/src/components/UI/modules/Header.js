import { Link, useNavigate } from "react-router-dom";
import Textbox from "../atoms/Text/Textbox";
import Button from "../atoms/Button/Button";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { loginState } from "../../pages/Common/loginState";

// 요소들
const LogoTextbox = styled(Textbox)`
  color: #8382ff;
  font-weight: bold;
  font-size: 35px !important;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const BellBtn = styled(Button)`
  color: #8382ff;
`;

// 배치
const HeaderContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  width: 60%;
  margin: 0 20%;

  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
  }
`;

const LeftLogo = styled.div`
  flex: 1;
  text-align: left;
`;

const RightButton = styled.div`
  flex: 1;
  text-align: right;
`;

const Header = () => {
  const navigate = useNavigate();
  const [loginToken, setLoginToken] = useRecoilState(loginState);

  const notice = () => {
    console.log("알림 버튼 눌림!!");
  };

  const logout = () => {
    axios
      .get("/logout", { withCredentials: true })
      .then((response) => {
        console.log(response);
        setLoginToken(false);
        localStorage.removeItem("loginToken");
        navigate("/");
      })
      .catch((error) => {
        console.error("로그아웃 에러 : ", error);
      });
  };

  return (
    <HeaderContainer className="Header">
      <LeftLogo className="leftlogo">
        <Link to="/">
          <LogoTextbox section="logoText" context1="쉽게말해" />
        </Link>
      </LeftLogo>
      <RightButton className="rightbutton">
        {/* <BellBtn name="bellBtn" onClick={notice} /> */}
        {loginToken ? (
          <div onClick={logout}>
            <Button name="logBtn" text="로그아웃" />
          </div>
        ) : (
          <Link to="/login">
            <Button name="logBtn" text="로그인" />
          </Link>
        )}
      </RightButton>
    </HeaderContainer>
  );
};

export default Header;
