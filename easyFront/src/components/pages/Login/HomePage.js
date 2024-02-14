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

const ChaDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px 0px;
  align-items: center;
`;

const ProfileImgDiv = styled.img`
  display: flex;
  margin-left: auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
`;

<<<<<<< HEAD
=======
const AtenDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px 40px;
  align-items: center;
`;


>>>>>>> feature-css
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
  overflow-wrap: anywhere;
`;

const WordBox = styled.div`
  border: 2px solid #8382ff;
  border-radius: 10px;
  width: 30%;
  padding: 10px;
<<<<<<< HEAD

=======
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
>>>>>>> feature-css
`;

const WordBoxes = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin: 20px 40px 0px;
`;

const SenBox = styled.div`
<<<<<<< HEAD
  text-align: center; /* 가운데 정렬을 위해 text-align: center;를 적용합니다. */
=======
>>>>>>> feature-css
  border: 2px solid #8382ff;
  border-radius: 10px;
  margin: 10px 40px 20px;
  padding: 20px 0;
<<<<<<< HEAD
=======
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
>>>>>>> feature-css
  `;

const DayDiv = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

const DayCircle = styled.div`
  width: 10vw;
  height: 10vw;
  max-width: 60px;
  max-height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isAttend ? "#8382ff" : "transparent")};
  color: ${(props) => (props.isAttend ? "white" : "black")};
  margin: 4px;
  border: 1px solid #8382ff;
<<<<<<< HEAD
  font-size: 18px;
=======
  font-size: 20px;
>>>>>>> feature-css
  `;

const PointText = styled.div`
  color: gray;
<<<<<<< HEAD
  font-size: 12px;
=======
  font-size: 15px;
>>>>>>> feature-css
  text-align: center;
`;

const HomePage = () => {
  const [nickname, setNickname] = useState("");
  const [exp, setExp] = useState("");
  const [info, setInfo] = useState("");
  const [profileImageUri, setProfileImageUri] = useState("");

  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [attendanceList, setAttendanceList] = useState([]);

  const needExp = 100 - (exp % 100);
  const lv = Math.floor(exp / 100 + 1);

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

    // 문장 데이터 (오늘의 단어)
    axios
      .get("/study/sentence/today", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        // const sentenceData = response.data.sentence;
        // const wordsData = response.data.word;

        // // 이후에 sentenceData와 wordsData를 이용하여 원하는 작업을 수행하면 됩니다.
        // console.log(sentenceData);
        // console.log(wordsData);
      })
      .catch((error) => {
        console.error("문장 데이터 에러 : ", error);
        console.dir(error);
      });

    // 명세서 기준 출석데이터
    // 0부터 월요일
    axios
      .get("/user/attendance", { withCredentials: true })
      .then((response) => {
        const userAttendance = response.data;

        setAttendanceList(userAttendance);

<<<<<<< HEAD
        // setAttendanceList([1, 2, 3]);
=======
        setAttendanceList([1, 2]);
>>>>>>> feature-css
      })
      .catch((error) => {
        console.error("출석부 에러 : ", error);
      });
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 40px' }}>
      <ChaDiv>
        <div>
          <Textbox section="singleText" fontWeight="bold" context1={`${nickname}님 안녕하세요 !`} /> 
        <br />
          <Textbox section="singleText" context1="기분 좋은 오후에요." />
          <Textbox section="singleText" context1="식사는 하셨나요 ?" />
        </div>
      </ChaDiv>
        <ProfileImgDiv src={profileImageUri} />
      </div>
      <Line />
      <LeftDiv>
        <Textbox section="singleText" context1="오늘의 쉽게말하는 영어" fontWeight="bold" />
      </LeftDiv>
      <RandomDiv>
        <WordBoxes>
          <WordBox>
<<<<<<< HEAD
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
        <SenBox>
          Do you like apple?
          <br />
          사과를 좋아하니 ?
=======
            <Textbox section="singleText" fontWeight="bold" context1="Apple" />
            <Textbox section="singleText" context1="사과" />
          </WordBox>
          <WordBox>
            <Textbox section="singleText" fontWeight="bold" context1="Apple" />
            <Textbox section="singleText" context1="사과" />
          </WordBox>
          <WordBox>
            <Textbox section="singleText" fontWeight="bold" context1="Apple" />
            <Textbox section="singleText" context1="사과" />
          </WordBox>
        </WordBoxes>
        <SenBox>
          <Textbox section="singleText" fontWeight="bold" context1="Do you like apple?" />
          <Textbox section="singleText" context1="너는 사과를 좋아하니 ?" />
>>>>>>> feature-css
        </SenBox>
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
          <Textbox
            section="singleText"
            context1={`${needExp} 경험치 더 받으면`}
            context2={`${lv}레벨이 돼요.`}
          />
          <Textbox section="singleText" context1={`${lv + 1}레벨을 달성할 수 있어요.`} />
        </InnerDiv>
      </ExpDiv>
      <Link to="/study">
        <Button name="submitBtn" text="학습 이어서하고 경험치 받기" />
      </Link>

      <Line />
      <LeftDiv>
        <Textbox section="singleText" context1="출석체크" fontWeight="bold" />
      </LeftDiv>
<<<<<<< HEAD
      <ChaDiv>
=======
      <AtenDiv>
>>>>>>> feature-css
        <div>
          <Textbox section="singleText" context1={`출석하고 경험치 받아가세요!`} />
          <Textbox section="singleText" context1={`일주일 연속 출석 시 30 경험치 추가!`} />
        </div>
<<<<<<< HEAD
      </ChaDiv>
=======
      </AtenDiv>
>>>>>>> feature-css
      <DayDiv>
        <div style={{ display: "flex" }}>
          {days.map((day, index) => (
            <div key={index}>
              <DayCircle key={index} isAttend={attendanceList.includes(index)}>
                {day}
              </DayCircle>
              {attendanceList.includes(index) && <PointText>+10</PointText>}
            </div>
          ))}
        </div>
      </DayDiv>
    </>
  );
};

export default HomePage;