import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Header from "./components/UI/modules/Header";
import Footer from "./components/UI/modules/Footer";
import IntroPage from "./components/pages/Login/IntroPage";
import LoginPage from "./components/pages/Login/LoginPage";
import HomePage from "./components/pages/Login/HomePage";
import MusicHomePage from "./components/pages/Music/MusicHomePage";
import GroupHomePage from "./components/pages/Group/GroupHomePage";
import PlaceHomePage from "./components/pages/Place/PlaceHomePage";
import MyHomePage from "./components/pages/My/MyHomePage";
import Button from "./components/UI/atoms/Button/Button";

const App = () => {
  const [kakaoToken, setA] = useState(false); // 여기서 true false 값이 로그인 여부로 결정 ( 카카오 토큰 )

  return (
    <BrowserRouter>
      <div className="App">
        <Header className="Header" />
        <div className="MainContens">
          <Routes>
            <Route path="/" exact element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/study" element={<MusicHomePage />} />
            <Route path="/group" element={<GroupHomePage />} />
            <Route path="/place" element={<PlaceHomePage />} />
            <Route path="/my" element={<MyHomePage />} />
          </Routes>
        </div>
        <Footer className="Footer" />
      </div>
    </BrowserRouter>
  );
};

export default App;
