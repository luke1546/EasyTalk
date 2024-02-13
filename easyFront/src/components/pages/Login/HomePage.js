import { Link, useLocation } from "react-router-dom/dist";
import Button from "../../UI/atoms/Button/Button";
import Textbox from "../../UI/atoms/Text/Textbox";
import Profile from "../../UI/modules/Profile";
import ExpBar from "../../UI/modules/ExpBar";
import Line from "../../UI/atoms/Line/Line";
// import yourImage from './path_to_your_image_file';

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const HomePage = () => {

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

  const ChaDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
  `;

  const WelcomeDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;

  const DayDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `;

  const LeftDiv = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 20px 40px;
  `;

  const RandomDiv = styled.div`
    // display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px 20px;
  `;

  const ExpDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 20px 40px 0 20px;
  `;

  const InnerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `;

  const InnerRightDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 40px 0px;
  `;

  const WordBox = styled.div`
    border: 2px solid #8382ff;
    border-radius: 10px;
    width: 100px;
    padding: 10px;
    margin: 0px 5px;
  `;

  const WordBoxes = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 40px 0px;
  `;

  return (
    <>
      <ChaDiv>
        <WelcomeDiv>
          <Textbox section="singleText" fontWeight="bold" context1={[`${nickname}님`]} />
          <Textbox section="singleText" fontWeight="bold" context1={[`안녕하세요!`]} />
        </WelcomeDiv>
        {/* <img src={yourImage} alt="description" /> */}
        <DayDiv>
          <br />
          <br />
          <Textbox section="singleText" context1="오늘도 멋진 하루네요." />
          {/* <br /> */}
          <Textbox section="singleText" context1="영어 공부를 시작해볼까요?" />
        </DayDiv>
      </ChaDiv>
      <Line />
      <LeftDiv>
          <Textbox section="singleText" context1="오늘의 쉽게말하는 영어" fontWeight="bold" />
      </LeftDiv>
      <RandomDiv>
        <WordBoxes>
          <WordBox>
            Apple
            <br />
            사과
          </WordBox>
          <WordBox>
            Apple
            <br />
            사과
          </WordBox>
          <WordBox>
            Apple
            <br />
            사과
          </WordBox>
        </WordBoxes>
        <br />
        <div>문장박스1</div>
      </RandomDiv>
      <Line />
      <LeftDiv>
        <Textbox section="singleText" context1="경험치" fontWeight="bold" />
      </LeftDiv>
      <ExpBar exp={exp} />
      <ExpDiv>
        <InnerDiv>
          <Textbox section="singleText" context1={`${nickname}님 대단해요 !`} />
            <br />
          <Textbox section="singleText" context1={`${needExp} 경험치 더 받으면`} context2={`${lv}레벨이 돼요.`} />
          <Textbox section="singleText" context1={`${lv}레벨을 달성할 수 있어요.`} />
        </InnerDiv>
      </ExpDiv>
      <Link to="/study">
        <Button name="submitBtn" text="학습 이어서하고 경험치 받기" />
      </Link>

      <Line />
      <LeftDiv>
        <Textbox section="singleText" context1="출석체크" fontWeight="bold"/>
      </LeftDiv>
      <InnerRightDiv>
        <Textbox section="singleText" context1={`출석체크하고 경험치 받아가세요 !`} />
        <Textbox section="singleText" context1={`일주일 연속 출석체크 시 30 경험치 포인트 !`} />
      <div>출석 리스트 들어가야할 곳 {`${attendanceList}`}</div>
      </InnerRightDiv>
      <br />
      <br />
      <br />
    </>
  );
};

export default HomePage;