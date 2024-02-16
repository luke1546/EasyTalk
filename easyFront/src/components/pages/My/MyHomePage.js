// MyHomePage.js
import { Link } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import Profile from "../../UI/modules/Profile";
import Button from "../../UI/atoms/Button/Button";
import ListBox from "../../UI/modules/ListBox";
// import customAxios from '../../../api/customAxios';
import axios from 'axios';

const Homediv = styled.div`
`;
const StyledprofileBox = styled.div`

  border-radius: 30px;
  border: 2px solid #8382ff;
  padding: 30px 20px;
  margin: 20px;
`;

const MyHomePage = () => {
  // 유저 프로필 데이터 저장할 변수
  const [userData, setuserData] = useState(null);
  
  // targetUserId 상태 추가 
  // 로그인한 사용자의 ID를 setTargetUserId에 설정해줘야되나?
  const [targetUserId, setTargetUserId] = useState();

  // 마운트 될 때 서버에서 프로필 데이터를 가져옴
  useEffect(() => {
    // targetUserId가 존재할 때만 비동기 요청을 수행합니다.
    axios.get(`user`, { withCredentials: true })
      .then(response => {
        setuserData(response.data)
        console.log(response.data)

      })
      .catch(error => console.error('Error user profile data', error));
  }, [targetUserId]); // targetUserId가 변경될 때마다 실행
  

  const mylist1 = [
    { text: '내 노래', path: "/mymusic" },
    { text: '학습 기록', path: "/myrecodemusic" },
    { text: '내 게시글', path: "/myfeed" },
    { text: '내 이웃', path: "/myneighbor" },
    { text : '내 그룹', path: "/mygroup"},
  ]

  const mylist2 = [
    '공지사항',
    '자주묻는질문',
    '고객센터',
    '회원정보수정 및 탈퇴',
    '친구초대',
  ]

  return (
    <Homediv className="MyHomePage">
      <StyledprofileBox>
        {userData && ( 
          <Profile
            direction="left"
            text1={userData.nickname}
            text2={`레벨 ${Math.floor(userData.exp / 100 + 1)} | 경험치 : ${100 - (userData.exp % 100)}`}
            text3={userData.info}
            profileImageUri={userData.profileImageUri}
          />
         )}
        <Link to="/myedit">
          <Button name="basicBtn" text="프로필 편집하기" />
        </Link>
      </StyledprofileBox>
      
      <ListBox textArray={mylist1.map((item, index) => (
        <Link key={index} to={item.path}>
          {item.text}
        </Link>
      ))} />

      <ListBox textArray={mylist2} />
    </Homediv>
    );
  };
  
  export default MyHomePage;