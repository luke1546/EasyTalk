import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios, { HttpStatusCode } from "axios";
import { useRecoilState } from "recoil";
import { loginState } from "../Common/loginState";

const REDIRECT_URI =
  process.env.REACT_APP_EASYTALK_URL +
  process.env.REACT_APP_FRONT_PORT +
  process.env.REACT_APP_KAKAO_REDIRECT_URL;

const LoginHandeler = (props) => {
  const [loginToken, setLoginToken] = useRecoilState(loginState);

  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const kakaoLogin = async () => {
      await axios({
        method: "GET",
        // url: `${REDIRECT_URI}/?code=${code}`,
        url: `/login/oauth/kakao?code=${code}`,
        headers: {
          "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
          "Access-Control-Allow-Origin": "*", //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
        },
        withCredentials: true,
      }).then((res) => {
        //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(res);
        console.log(res.data.UserRegistrationStatus);
        console.log(res.data.userId);

        const userChecker = res.data.UserRegistrationStatus;
        const userId = res.data.userId;

        const loginToken = true;

        if (userChecker === "UNREGISTERED") {
          // 등록되지 않은 사용자
          navigate("/signup");
        } else if (userChecker === "DUPLICATED") {
          // 다른 아이디가 있는 사용자
          alert("다른 아이디가 있습니다.");
          navigate("/login");
        } else if (userChecker === "REGISTERED") {
          setLoginToken(true);
          localStorage.setItem("loginToken", loginToken);

          // 등록된 사용자
          navigate("/home");
          // navigate("/home", { state: { userId: userId } });
        } else {
          alert("잘못된 접근입니다!");
        }
      });
    };
    kakaoLogin();
  }, [props.history]);

  // nickname, info

  // let tmp = 0;

  // const abc = () => {
  //   const nickname = "닉닉네임";
  //   const info = "안녕하세요";

  //   const userDto = { nickname, info };
  //   axios
  //     .post(`http://localhost:80/register`, JSON.stringify(userDto), {
  //       headers: {
  //         "Content-Type": `application/json`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("성공");
  //       alert("성공");
  //       regCheck();
  //     })
  //     .catch((error) => {
  //       console.log("실패");
  //       alert("실패");
  //       console.log(error);
  //       console.log(JSON.stringify(userDto));
  //     });
  // };

  // const regCheck = () => {
  //   axios
  //     .get(`http://localhost:80/registration-check`)
  //     .then((response) => {
  //       // 요청 성공
  //       alert("로그인 성공!");
  //       navigate("/home");
  //     })
  //     .catch((error) => {
  //       if (error.status === HttpStatusCode.Unauthorized) {
  //         console.log(error.response.status);
  //         console.log("if");
  //       } else {
  //         console.log(error.response.status);
  //         console.dir(error);
  //         console.log("else");
  //       }
  //     });
  // };

  // useEffect(() => {
  //   regCheck();
  //   // const response = axios.get("/registration-check");
  //   // console.log(response);
  //   // if (response.status >= 200 && response.status < 300) {
  //   //   // status가 200대일 때 로그인 처리
  //   //   login();
  //   // } else if (response.status >= 400 && response.status < 500) {
  //   //   // status가 400대일 때 추가 정보 입력을 요청
  //   //   loginInput();
  //   // }
  //   // const login = () => {
  //   //   // 로그인 처리 코드를 여기에 작성하세요.
  //   //   console.log("로그인 성공");
  //   // };
  //   // const loginInput = () => {
  //   //   // 추가 정보 입력을 요청하는 코드를 여기에 작성하세요.
  //   //   console.log("추가정보입력필요");
  //   // };
  // });

  return (
    <div className="LoginHandeler">
      <p>로그인 중입니다.</p>
    </div>
  );
};

export default LoginHandeler;
