// MyNeighborSendPage.js
import React, { useState, useEffect } from 'react';
import axios from "axios";
import TabBar from '../../UI/modules/TabBar/TabBar';
import Profile from '../../UI/modules/Profile';
import Button from "../../UI/atoms/Button/Button";


const MyNeighborSendPage = () => {
  const [mySend, setmySend] = useState([]);

  // 보낸 이웃신청 목록 가져오기
  const fetchMySend = async () => {
    try {
      const params = {
        status: "SENTED",
        order: "name"
      };

      const response = await axios.get("/neighbor", { params }, { withCredentials: true });

      setmySend(response.data)
    } catch (error) {
      console.error("Error mySend", error);
    }
};

  useEffect(() => {
    fetchMySend();
  }, []);

  // 이웃 신청 취소
  const handleCancel = async (neighborId) => {
    try {
      const params = {
        status: "SENTED",
        neighborId: neighborId
      };

      await axios.delete("/neighbor", { params });

      fetchMySend();
    } catch (error) {
      console.error("Error cancel neighbor", error);
    }
  }

  // 상단 Tab
  const NeighborTabs = [
    { label: '내 이웃', to: '/myneighbor' },
    { label: '받은 신청', to: '/myreceive' },
    { label: '보낸 신청', to: '/mysend' },
  ]
  
  return (
    <>
      <TabBar tabs={NeighborTabs} initialTab={2} />
      <div>
        {mySend.map((send, index) => (
          // 각 이웃 신청에 대해 프로필과 수락, 거절 버튼을 렌더링
          <div key={index}>
            <Profile
              text1={send.profileImg}
              text2={send.nickname}
              pageType="horizontal-layout"
            />
            <div onClick={() => handleCancel(send.neighborId)}>
            <Button
              name="basicBtn"
              text="취소"
              />
              </div>
          </div>
        ))}
      </div>
    </>
  )
};

export default MyNeighborSendPage;