// MyNeighborPage.js
import React, { useState, useEffect } from 'react';
// import customAxios from '../../../api/customAxios';
import TabBar from '../../UI/modules/TabBar/TabBar';
import Profile from '../../UI/modules/Profile';
import Button from "../../UI/atoms/Button/Button";
import axios from "axios";

const MyNeighborPage = () => {
  const [myNeighbor, setmyNeighbor] = useState([]);

  const fetchMyNeighbor = async () => {
    try {
      const params = {
        status: "NEIGHBOR",
        order: "name"
      };

      const response = await axios.get("/neighbor", { params }, { withCredentials: true });

      setmyNeighbor(response.data)
    } catch (error) {
      console.error("Error myneighbor", error);
    }
  };

  useEffect(() => {
    fetchMyNeighbor();
  }, []);
  
  
  const NeighborTabs = [
    { label: '내 이웃', to: '/myneighbor' },
    { label: '받은 신청', to: '/myreceive' },
    { label: '보낸 신청', to: '/mysend' },
  ]

  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);
   // 편집 버튼 클릭 -> 편집 모드 상태
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // 아이콘 클릭 -> 이웃 끊기
  const handleNeighborClick = async (neighborId) => {
    try {
      const params = {
        status: "NEIGHBOR",
        neighborId: neighborId
      };

      await axios.delete("/neighbor", { params } );

      fetchMyNeighbor();
    } catch (error) {
      console.error("Error delete neighbor", error);
    }
  }

  return (
    <>
      <TabBar tabs={NeighborTabs} />
      <div onClick={() => handleEditClick()}>
        <Button
          name="submitBtn"
          text={isEditing? '이웃 삭제' : '편집'}
          color={isEditing ? 'red' : 'blue'}
          />
      </div>
      <div>
        {myNeighbor.map((neighbor, index) => (
          <div key={index}>
            <Profile
            text1={neighbor.profileImg}
            text2={neighbor.nickname}
            pageType="horizontal-layout"
          />
            {isEditing && (
            <div onClick={() => handleNeighborClick(neighbor.neighborId)}> {/* 버튼을 감싸는 div에 onClick 이벤트 설정 */}
              <Button
                name="delBtn"
                text="삭제"
                color="red"
              />
            </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
};


export default MyNeighborPage;
