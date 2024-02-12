import "./App.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
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
import MyFeedPage from "./components/pages/My/MyFeedPage";
import MyGroupPage from "./components/pages/My/MyGroupPage";
import MyNeighborPage from "./components/pages/My/MyNeighborPage";
import MyNeighborReceivePage from "./components/pages/My/MyNeighborReceivePage";
import MyNeighborSendPage from "./components/pages/My/MyNeighborSendPage";
import MusicDetailPage from "./components/pages/Music/MusicDetailPage";


const App = () => {
  const [kakaoToken, setA] = useState(false); // 여기서 true false 값이 로그인 여부로 결정 ( 카카오 토큰 )
  const code = new URL(window.location.href).searchParams.get("code");

  // axios 요청을 위한 상태 변수를 추가
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://i10b307.p.ssafy.io:8080/test');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);


  return (
    <BrowserRouter>
      <div className="App">
        <Header className="Header" />


        {/* axios 요청의 결과를 출력 */}
        {data && (
          <div>
            <p>{data.title}</p>
            <p>{data.body}</p>
          </div>
        )}

        <div className="MainContens">
          <Routes>
            <Route path="/" exact element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="/study" element={<MusicHomePage />} /> */}
            <Route path="/group" element={<GroupHomePage />} />
            <Route path="/place" element={<PlaceHomePage />} />
            <Route path="/my" element={<MyHomePage />} />
            {/* <Route path={`/study/search/:searchValue`} element={<MusicSearchPage />} /> */}
            <Route path="/login/oauth/kakao" element={<LoginHandeler />} />
            <Route path={`/login/oauth/kakao?code=${code}`} element={<LoginHandeler />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* <Route path="/study/artist/나훈아" element={<ArtistDetailPage />} /> */}
            <Route path="/study/*" element={<StudyPage />} />
            <Route path="/myedit" element={<MyEditPage />} />
            <Route path="/mymusic" element={<MyMusicPage />} />
            <Route path="/myrecodemusic" element={<MyRecodeMusicPage />} />
            <Route path="/myrecodeword" element={<MyRecodeWordPage />} />
            <Route path="/myfeed" element={<MyFeedPage />} />
            <Route path="/myneighbor" element={<MyNeighborPage />} />
            <Route path="/myreceive" element={<MyNeighborReceivePage />} />
            <Route path="/mysend" element={<MyNeighborSendPage />} />
            <Route path="/mygroup" element={<MyGroupPage />} />
            {/* <Route path={`/study/:index`} element={<MusicDetailPage />} /> */}
          </Routes>
        </div>
        <Footer className="Footer" /> 
      </div>
    </BrowserRouter>
  );
};

export default App;
