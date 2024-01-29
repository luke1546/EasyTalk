import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";


const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <div className="LoginPage">
            로그인페이지
            <button onClick={() => navigate('/home')}>로그인완료시</button>
        </div>
    );
  }
  
  export default LoginPage;