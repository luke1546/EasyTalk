import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";

import axios, { HttpStatusCode } from "axios";
import { useEffect } from "react";

import yourImage from "../../../assets/kakao_login_medium_wide.png";


const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI =
  process.env.REACT_APP_EASYTALK_URL +
 process.env.REACT_APP_KAKAO_REDIRECT_URL;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const LoginPage = () => {
  useEffect(() => {
    window.location.href = KAKAO_AUTH_URL;
  });

  // console.log(CLIENT_ID);
  // console.log(REDIRECT_URI);
  return (
    <div className="LoginPage">
      <br />
      <br />
      <br />
      <br />
      <br/>
      <br/>
      loading...
    </div>
  );
};

export default LoginPage;

