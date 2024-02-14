import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
// import 
import PlaceNeighborPage from "./components/pages/Place/PlaceNeighborPage";
import PlaceEditPage from "./components/pages/Place/PlaceEditPage";
import MusicDetailPage from "./components/pages/Music/MusicDetailPage";
import PlaceDetailPage from "./components/pages/Place/PlaceDetailPage";


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
  height: 10vh;
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
    font-family: 'Noto Sans KR', sans-serif !important;
    font-size: 20px;
  text-align: center;
`;

const MainContents = styled.div`
  padding-top: 10vh;
  height: 82vh;
  overflow: auto;
`;

const PageFooter = () => {
  const location = useLocation();  // 현재 위치 상태를 추적합니다.

  // 현재 위치가 "/"일 때는 렌더링하지 않습니다.
  if (location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }

  return (
    <FooterDiv>
      <Footer className="Footer" /> 
    </FooterDiv>
  )
}

const App = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  return (
    <React.Fragment>
      <BrowserRouter>
        <AppDiv>
          <HeaderDiv>
            <Header className="Header" />
          </HeaderDiv>
          <StyledDiv as={MainContents}>
            <Routes>
              <Route path="/" exact element={<IntroPage />} />
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
