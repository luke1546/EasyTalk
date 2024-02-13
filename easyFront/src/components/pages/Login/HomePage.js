import { Link, useLocation } from "react-router-dom/dist";
import Button from "../../UI/atoms/Button/Button";
import Textbox from "../../UI/atoms/Text/Textbox";
import Profile from "../../UI/modules/Profile";
import ExpBar from "../../UI/modules/ExpBar";

import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  // const userId = 3301009684;
  // const location = useLocation();
  // const userId = location.state.userId;

  const [nickname, setNickname] = useState("");
  const [exp, setExp] = useState("");
  const [info, setInfo] = useState("");
  const [profileImageUri, setProfileImageUri] = useState("");

  const [attendanceList, setAttendanceList] = useState("");

  const needExp = 100 - (exp % 100);
  const lv = Math.floor(exp / 100 + 1);

  console.log("11");

  useEffect(() => {
    // 명세서 나의 유저데이터
    axios
      .get("/user", { withCredentials: true })
      .then((response) => {
        const userData = response.data;
        const nickname = userData.nickname; // nickname
        const exp = userData.exp; // exp 값
        const info = userData.info; // info 값
        const profileImageUri = userData.profileImageUri;

        setNickname(nickname);
        setExp(exp);
        setInfo(info);
        setProfileImageUri(profileImageUri);

        // console.log(
        //   `exp: ${exp}, nickname: ${nickname}, profileImageUri: ${profileImageUri}, info: ${info}`
        // );
      })
      .catch((error) => {
        console.error("유저 데이터 에러 : ", error);
        console.dir(error);
      });

    // 명세서 기준 출석데이터
    // 0부터 월요일
    axios
      .get("/user/attendance", { withCredentials: true })
      .then((response) => {
        const userAttendance = response.data;

        setAttendanceList(userAttendance);
      })
      .catch((error) => {
        console.error("출석부 에러 : ", error);
      });
  }, []);

  return (
    <>
      <div>
        <Textbox section="singleText" context1={`${nickname}님 안녕하세요 !`} />
      </div>
      <div>
        <Profile direction="rigth" text1={`${info}`} imageUrl={`${profileImageUri}`} />
        {/* <Profile direction="rigth" text1="기분 좋은 오후에요." text2="식사는 하셨나요 ?" /> */}
      </div>
      <hr />
      <div>
        <Textbox section="singleText" context1="오늘의 쉽게말하는 영어" />
      </div>
      <span>단어박스1 | </span>
      <span>단어박스2 | </span>
      <span>단어박스2</span>
      <div>문장박스1</div>
      <hr />
      <Textbox section="singleText" context1="경험치" />
      <ExpBar exp={exp} />
      <Textbox section="singleText" context1={`${nickname}님 대단해요 !`} />
      <Profile direction="left" text1={`${needExp} 경험치 더 받으면`} text2={`${lv}레벨이 돼요.`} />
      <Link to="/study">
        <Button name="submitBtn" text="학습 이어서하고 경험치 받기" />
      </Link>

      <hr />
      <Textbox section="singleText" context1="출석체크" />
      <div>출석체크하고 경험치 받아가세요 !</div>
      <div>일주일 연속 출석체크 시 30 경험치 포인트 !</div>
      <div>출석 리스트 들어가야할 곳 {`${attendanceList}`}</div>
    </>
  );
};

export default HomePage;
