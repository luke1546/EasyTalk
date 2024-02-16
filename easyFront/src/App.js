import "./App.css";

import React from "react";
import axios from "axios"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "./components/pages/Common/loginState";

import styled from "styled-components";
import Header from "./components/UI/modules/Header";
import Footer from "./components/UI/modules/Footer";
import IntroPage from "./components/pages/Login/IntroPage";
import LoginPage from "./components/pages/Login/LoginPage";
import HomePage from "./components/pages/Login/HomePage";
import StudyPage from "./components/pages/Common/StudyPage";
import GroupHomePage from "./components/pages/Group/GroupHomePage";
import PlaceHomePage from "./components/pages/Place/PlaceHomePage";
import MyHomePage from "./components/pages/My/MyHomePage";
import LoginHandeler from "./components/pages/Login/LoginHandeler";
import SignupPage from "./components/pages/Login/SignupPage";
import MyEditPage from "./components/pages/My/MyEditPage";
import MyMusicPage from "./components/pages/My/MyMusicPage";
import MyRecodeMusicPage from "./components/pages/My/MyRecodeMusicPage";
import MyRecodeWordPage from "./components/pages/My/MyRecodeWordPage";
import MyRecodeWordDetailPage from "./components/pages/My/MyRecodeWordDetailPage";
import MyFeedPage from "./components/pages/My/MyFeedPage";
import MyGroupPage from "./components/pages/My/MyGroupPage";
import MyNeighborPage from "./components/pages/My/MyNeighborPage";
import MyNeighborReceivePage from "./components/pages/My/MyNeighborReceivePage";
import MyNeighborSendPage from "./components/pages/My/MyNeighborSendPage";
import PlaceNeighborPage from "./components/pages/Place/PlaceNeighborPage";
import PlaceEditPage from "./components/pages/Place/PlaceEditPage";
import PlaceDetailPage from "./components/pages/Place/PlaceDetailPage";


axios.defaults.baseURL = 'https://i10b307.p.ssafy.io:8080';
axios.defaults.withCredentials = true;

const HeaderDiv = styled.div`
  z-index: 10;
  position: fixed !important;
  background-color: white;
  width: 100vw;
  height: 10vh;
  display: fixed;
  justify-content: space-evenly;
`;

const FooterDiv = styled.div`
  z-index: 10;
  position: fixed !important;
  background-color: white;
  width: 100vw;
  height: 8vh;
  display: flex;
  justify-content: space-evenly;
`;

const StyledDiv = styled.div`
  text-align: center;
  padding: 0 20%;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const AppDiv = styled.div`
  font-family: "Noto Sans KR", sans-serif !important;
  font-size: 20px;
  text-align: left;
`;

const MainContents = styled.div`
  padding-top: 10vh;
  height: 82vh;
  overflow-x: hidden;
  overflow: auto;
`;

const PageFooter = () => {
  const location = useLocation(); // 현재 위치 상태를 추적합니다.

  // 현재 위치가 "/"일 때는 렌더링하지 않습니다.
  if (location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/login" ) {
    return null;
  }

  return (
    <FooterDiv>
      <Footer className="Footer" />
    </FooterDiv>
  );
};

const App = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  const [isEnd, setIsEnd] = useState(false); // 스크롤이 끝에 도달했는지를 저장하는 상태
  const divRef = useRef(null);

  useEffect(() => {
    const onCheckScroll = () => {
      const divElement = divRef.current;
      if (divElement) {
        const { scrollTop, scrollHeight, clientHeight } = divElement;
        // console.log(scrollTop);
        // console.log(scrollHeight);
        // console.log(clientHeight);

        if (scrollTop + clientHeight + 100 >= scrollHeight) {
          console.log("End");
          setIsEnd(true); // 스크롤이 끝에 도달했음을 상태에 저장
        } else {
          setIsEnd(false); // 스크롤이 끝에 도달하지 않았음을 상태에 저장
        }
      }
    };

    const divElement = divRef.current;
    if (divElement) {
      divElement.addEventListener("scroll", onCheckScroll);
    }

    // 컴포넌트가 언마운트 될 때 이벤트 리스너를 제거합니다.
    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", onCheckScroll);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <BrowserRouter>
        <AppDiv>
          <HeaderDiv>
            <Header className="Header" />
          </HeaderDiv>
          <StyledDiv as={MainContents} ref={divRef}>
            <Routes>
              <Route path="/" exact element={<IntroPage isEnd={isEnd} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/group" element={<GroupHomePage />} />
              <Route path="/place" element={<PlaceHomePage />} />
              <Route path="/my" element={<MyHomePage />} />
              <Route path="/login/oauth/kakao" element={<LoginHandeler />} />
              <Route path={`/login/oauth/kakao?code=${code}`} element={<LoginHandeler />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/study/*" element={<StudyPage />} />
              <Route path="/myedit" element={<MyEditPage />} />
              <Route path="/mymusic" element={<MyMusicPage />} />
              <Route path="/myrecodemusic" element={<MyRecodeMusicPage />} />
              <Route path="/myrecodeword" element={<MyRecodeWordPage />} />
              <Route path="/myrecodeword/test/record/detail" element={<MyRecodeWordDetailPage />} />
              <Route path="/myfeed" element={<MyFeedPage />} />
              <Route path="/myneighbor" element={<MyNeighborPage />} />
              <Route path="/myreceive" element={<MyNeighborReceivePage />} />
              <Route path="/mysend" element={<MyNeighborSendPage />} />
              <Route path="/mygroup" element={<MyGroupPage />} />
              <Route path="/neighbor/feed/:feedId" element={<PlaceEditPage />} />
              <Route path="/neighbor/feed/:feedId/detail" element={<PlaceDetailPage />} />
              <Route path="/placeneighbor" element={<PlaceNeighborPage />} />
            </Routes>
          </StyledDiv>
          <PageFooter />
        </AppDiv>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
