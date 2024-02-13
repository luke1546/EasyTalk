// MyNeighborReceivePage.js
import React, { useState, useEffect } from 'react';
import TabBar from '../../UI/modules/TabBar/TabBar';
import Profile from '../../UI/modules/Profile/Profile';
import Button from "../../UI/atoms/Button/Button";
import axios from "axios";


const MyNeighborReceivePage = () => {
  const [myReceive, setmyReceive] = useState([]);

  // 받은 이웃신청 목록 가져오기
  const fetchMyReceive = async () => {
    try {
        const params = {
          status: "RECEIVED",
          order: "name"
        };

        const response = await axios.get("/neighbor", { params }, { withCredentials: true });
      
        setmyReceive(response.data)
      } catch (error) {
        console.error("Error myReceive", error);
      }
  };

  useEffect(() => {
    fetchMyReceive();
  }, []);
  
  // 이웃 신청 수락
  const handleAccept = async (neighborId) => {
    try {
      const params = {
        status: "ACCEPTED",
        neighborId: neighborId
      };

      await axios.put("/neighbor", params );

      fetchMyReceive();
    } catch (error) {
      console.error("Error accept neighbor", error);
    }
  }

  // 이웃 신청 거절
  const handleDeny = async (neighborId) => {
    try {
      const params = {
        status: "RECEIVED",
        neighborId: neighborId
      };

      await axios.delete("/neighbor", { params } );

      fetchMyReceive();
    } catch (error) {
      console.error("Error delete neighbor", error);
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
        <TabBar tabs={NeighborTabs} initialTab={1} />
        <div>
          {myReceive.map((receive, index) => (
          // 각 이웃 신청에 대해 프로필과 수락, 거절 버튼을 렌더링
            <div key={index}>
              <Profile
                userId={receive.userId}
                profileImg={receive.profileImg}
                nickName={receive.nickName}
                pageType="horizontal-layout" 
              />
              <div onClick={() => handleAccept(receive.neighborId)}>
                <Button
                  name="basicBtn"
                  text="수락"
                />|
              </div>
              <div onClick={() => handleDeny(receive.neighborId)}>
                <Button
                  name="basicBtn"
                  text="거절"
                />
              </div>
            </div>
          ))}
        </div>
      </>
    )
  };

export default MyNeighborReceivePage;