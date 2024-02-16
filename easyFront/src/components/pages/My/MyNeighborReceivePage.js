// MyNeighborReceivePage.js
import React, { useState, useEffect } from "react";
import TabBar from "../../UI/modules/TabBar/TabBar";
import Profile from "../../UI/modules/Profile";
import Button from "../../UI/atoms/Button/Button";
import axios from "axios";

const MyNeighborReceivePage = () => {
  const [myReceive, setmyReceive] = useState([]);

  // 받은 이웃신청 목록 가져오기
  const fetchMyReceive = async () => {
    try {
      const params = {
        status: "RECEIVED",
        order: "name",
      };

      const response = await axios.get("/neighbor", { params }, { withCredentials: true });
      console.log(response.data);
      setmyReceive(response.data);
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
        neighborId: neighborId,
      };

      await axios.put("/neighbor", params);

      fetchMyReceive();
    } catch (error) {
      console.error("Error accept neighbor", error);
    }
  };

  // 이웃 신청 거절
  const handleDeny = async (neighborId) => {
    try {
      const params = {
        status: "RECEIVED",
        neighborId: neighborId,
      };

      await axios.delete("/neighbor", { params });

      fetchMyReceive();
    } catch (error) {
      console.error("Error delete neighbor", error);
    }
  };

  // 상단 Tab
  const NeighborTabs = [
    { label: "내 이웃", to: "/myneighbor" },
    { label: "받은 신청", to: "/myreceive" },
    { label: "보낸 신청", to: "/mysend" },
  ];

  return (
    <>
      <TabBar tabs={NeighborTabs} initialTab={1} />
      <div>
        {myReceive.map((receive, index) => (
          <div key={index}>
            <Profile
              direction="left"
              text2={receive.nickname}
              profileImageUri={receive.profileImageUri}
              pageType="horizontal-layout"
            />
            <span onClick={() => handleAccept(receive.neighborId)}>
              <Button
                name="basicBtn"
                text="수락"
                // 버튼 컴포넌트 안에 이벤트 핸들러를 넣어줍니다.
              />
            </span>
            <span onClick={() => handleDeny(receive.neighborId)}>
              <Button
                name="basicBtn"
                text="거절"
                // 버튼 컴포넌트 안에 이벤트 핸들러를 넣어줍니다.
              />
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyNeighborReceivePage;
