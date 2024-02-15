import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { loginState } from "./loginState";

export function AccessChecker() {
  const navigate = useNavigate();
  const loginToken = useRecoilValue(loginState);

  useEffect(() => {
    if (!loginToken) {
      navigate("/");
      alert("로그인이 필요합니다!");
    }
  }, [loginToken, navigate]);
}
