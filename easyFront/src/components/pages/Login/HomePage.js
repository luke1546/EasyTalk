import { Link, useLocation } from "react-router-dom/dist";
import Button from "../../UI/atoms/Button/Button";
import Textbox from "../../UI/atoms/Text/Textbox";
import Profile from "../../UI/modules/Profile";
import ExpBar from "../../UI/modules/ExpBar";
import Line from "../../UI/atoms/Line/Line";
// import yourImage from './path_to_your_image_file';

import { AccessChecker } from "../Common/AccessChecker";

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { RiContactsBookUploadLine } from "react-icons/ri";

const ChaDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px 0px;
  align-items: center;
`;

const ProfileImgDiv = styled.img`
  display: flex;
  margin-left: auto;
  width: 130px;
  height: 130px;
  border-radius: 50%;
`;

const AtenDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px 20px;
  align-items: center;
`;

const LeftDiv = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 20px 20px;
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
  padding: 20px 20px 0 20px;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow-wrap: anywhere;
  width: 100%;
  
  & > :first-child {
    align-self: flex-start;
  }
`;

const WordBox = styled.div`
  background-color: #8382ff;
  color: white;
  border-radius: 10px;
  background: linear-gradient(to top, #9c9cff, #cfcfff);
  width: 30%;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0px 4px 2px -4px #121212;
`;

const WordBoxes = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin: 20px 0px 0px;

  @media (max-width: 768px) {
    margin: 10px 0px 0px;
    // flex-direction: column;
    align-items: center;
  }
`;

const SenBox = styled.div`
  border-radius: 10px;
  margin: 10px 0px 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 2px -4px #121212;
  background-color: #9c9cff;
  color: white;
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
  background-color: ${(props) => (props.isAttend ? "#9c9cff" : "transparent")};
  color: ${(props) => (props.isAttend ? "white" : "black")};
  margin: 4px;
  border: 1px solid #8382ff;
  font-size: 20px;
`;

const PointText = styled.div`
  color: gray;
  font-size: 15px;
  text-align: center;
`;

const HomePage = () => {
  // AccessChecker();

  const [nickname, setNickname] = useState("");
  const [exp, setExp] = useState("");
  const [info, setInfo] = useState("");
  const [profileImageUri, setProfileImageUri] = useState("");

  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [attendanceList, setAttendanceList] = useState([]);

  const needExp = 100 - (exp % 100);
  const lv = Math.floor(exp / 100 + 1);

  // 오늘의 단어 및 문장
  const [wordData, setWordData] = useState([]);

  const [toDaySentence, setTodaySentence] = useState("");
  const [toDaySentenceMean, setTodaySentenceMean] = useState("");

  // useEffect(() => {
  //   // 명세서 나의 유저데이터
  //   axios
  //     .get("/user", { withCredentials: true })
  //     .then((response) => {
  //       console.log(userData);
  //       const userData = response.data;
  //       const nickname = userData.nickname; // nickname
  //       const exp = userData.exp; // exp 값
  //       const info = userData.info; // info 값
  //       const profileImageUri = userData.profileImageUri;

  //       setNickname(nickname);
  //       setExp(exp);
  //       setInfo(info);
  //       setProfileImageUri(profileImageUri);
  //     })
  //     .catch((error) => {
  //       console.error("유저 데이터 에러 : ", error);
  //       console.dir(error);
  //     });

  //   // 문장 데이터 (오늘의 단어)
  //   axios
  //     .get("/study/sentence/today", { withCredentials: true })
  //     .then((response) => {
  //       const wordData = response.data.words;
  //       const sentenceData = response.data.sentence;

  //       setWordData(wordData);

  //       setTodaySentence(sentenceData.sentence.split("-")[0]);
  //       setTodaySentenceMean(sentenceData.meaning.split("-")[0]);
  //     })
  //     .catch((error) => {
  //       console.error("문장 데이터 에러 : ", error);
  //       console.dir(error);
  //     });

  //   // 명세서 기준 출석데이터
  //   // 0부터 월요일
  //   axios
  //     .get("/user/attendance", { withCredentials: true })
  //     .then((response) => {
  //       const userAttendance = response.data;

  //       setAttendanceList(userAttendance);

  //       setAttendanceList([1, 2]);
  //     })
  //     .catch((error) => {
  //       console.error("출석부 에러 : ", error);
  //     });
  // }, []);

  const [userDataLoading, setUserDataLoading] = useState(true);
  const [sentenceDataLoading, setSentenceDataLoading] = useState(true);
  const [attendanceDataLoading, setAttendanceDataLoading] = useState(true);

  useEffect(() => {
    axios.get("/user", { withCredentials: true }).then((response) => {
      const userData = response.data;
      const nickname = userData.nickname; // nickname
      const exp = userData.exp; // exp 값
      const info = userData.info; // info 값
      const profileImageUri = userData.profileImageUri;

      setNickname(nickname);
      setExp(exp);
      setInfo(info);
      setProfileImageUri(profileImageUri);
      setUserDataLoading(false);
    });

    axios.get("/study/sentence/today", { withCredentials: true }).then((response) => {
      const wordData = response.data.words;
      const sentenceData = response.data.sentence;

      setWordData(wordData);

      setTodaySentence(sentenceData.sentence.split("-")[0]);
      setTodaySentenceMean(sentenceData.meaning.split("-")[0]);
      setSentenceDataLoading(false);
    });

    axios.get("/user/attendance", { withCredentials: true }).then((response) => {
      const userAttendance = response.data;

      setAttendanceList(userAttendance);

      setAttendanceDataLoading(false);
    });
  }, []);

  if (userDataLoading || sentenceDataLoading || attendanceDataLoading) {
    return <div>Loading...</div>; // or return a loading spinner
  } else {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 20px",
          }}
        >
          <ChaDiv>
            <div>
              <Textbox
                section="singleText"
                fontWeight="bold"
                fontSize="22px"
                context1={`${nickname}님 반가워요!`}
              />
              <br />
              <Textbox section="singleText" context1="기분 좋은 오후에요." />
              <Textbox section="singleText" context1="식사는 하셨나요 ?" />
            </div>
          </ChaDiv>
          <ProfileImgDiv
            src={`https://easy-s3-bucket.s3.ap-northeast-2.amazonaws.com` + profileImageUri}
          />
        </div>
        <Line />
        <LeftDiv>
          <Textbox section="singleText" fontSize="22px" context1="오늘의 쉽게말하는 영어" fontWeight="bold" />
        </LeftDiv>
        <RandomDiv>
          <WordBoxes>
            {wordData.map((item, index) => (
              <WordBox>
                <div key={index}>
                  <Textbox section="singleText" fontWeight="bold" context1={`${item.word}`} />
                  {/* <Textbox
                    section="singleText"
                    context1={`${item.wordMeaningDto[index].meaning}`}
                  /> */}
                </div>
              </WordBox>
            ))}
          </WordBoxes>
          <SenBox>
            <Textbox section="singleText" fontWeight="bold" context1={`${toDaySentence}`} />
            <Textbox section="singleText" context1={`${toDaySentenceMean}`} />
          </SenBox>
        </RandomDiv>
        <Line />
        <LeftDiv>
          <Textbox section="singleText" 
                fontSize="22px"context1="경험치" fontWeight="bold" />
        </LeftDiv>
        <ExpBar exp={exp} />
        <ExpDiv>
          <InnerDiv>
            <Textbox section="singleText" context1={`${nickname}님 대단해요!`} />
            <br />
            <Textbox
              section="singleText"
              context1={`${needExp} 경험치 더 받으면`}
            />
            <Textbox section="singleText" context1={`${lv + 1}레벨을 달성할 수 있어요.`} />
          </InnerDiv>
        </ExpDiv>
        <Link to="/study">
          <Button name="submitBtn" text="학습 이어서하고 경험치 받기" />
        </Link>

        <Line />
        <LeftDiv>
          <Textbox section="singleText" fontSize="22px" context1="출석체크" fontWeight="bold" />
        </LeftDiv>
        <AtenDiv>
          <div>
            <Textbox section="singleText" context1={`출석하고 경험치 받아가세요!`} />
            <Textbox section="singleText" context1={`일주일 연속 출석 시 30경험치 +`} />
          </div>
        </AtenDiv>
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
  }
};

export default HomePage;
