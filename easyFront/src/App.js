import logo from "./logo.svg";
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
import Icon from "./components/UI/atoms/Icon/Icon";
// import Button from "./components/UI/atoms/Button/Button";

const App = () => {
  const [kakaoToken, setA] = useState(false); // 여기서 true false 값이 로그인 여부로 결정 ( 카카오 토큰 )

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/study" element={<MusicHomePage />} />
          <Route path="/group" element={<GroupHomePage />} />
          <Route path="/place" element={<PlaceHomePage />} />
          <Route path="/my" element={<MyHomePage />} />
        </Routes>
        <Footer />
        <Icon name="noticeIcon"/>
        {/* <Button /> */}
      </div>
    </BrowserRouter>
  );

  // if (a) {
  //   return (
  //     <BrowserRouter>
  //       <div className="App">
  //         <Header />
  //         <hr />
  //         <Routes>
  //           <Route path="/intro" element={<IntroPage />} />
  //         </Routes>
  //         <button
  //           onClick={() => {
  //             setA(a === true ? false : true);
  //           }}>가입하기</button>
  //         </div>
  //     </BrowserRouter>
  //   );
  // }
  // return (
  //   <BrowserRouter>
  //     <div className="App">
  //       <Header />
  //       <hr />
  //       <Routes>
  //         <Route path="/" element={<LoginPage />} />
  //         <Route path="/home" element={<HomePage />} />
  //       </Routes>
  //       <hr />
  //       <Footer />
  //       </div>
  //   </BrowserRouter>
  // );
};

export default App;
