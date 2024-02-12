import React, { useState, useEffect } from 'react';
import axios from "axios";
import TabBar from '../../UI/modules/TabBar/TabBar';
import Button from "../../UI/atoms/Button/Button";

const MyRecodeMusicPage = () => {
  const [myrecodemusic, setmyrecodemusic] = useState([]);

  const fetchMyRecodeMusic = async () => {
    try {
      const params = {
        target: "music",
      };

      const response = await axios.get("/study/test/record", { params }, { withCredentials: true });
        console.log("heelo");
      setmyrecodemusic(response.data)
    } catch (error) {
      console.error("Error myrecodemusic", error);
    }
  };

  useEffect(() => {
    fetchMyRecodeMusic();
  }, []);

  const RecodeTabs = [
    { label: '노래시험', to: '/myrecodemusic' },
    { label: '단어시험', to: '/myrecodeword' },
  ]

    // 저장 모드 상태
    const [issaving, setIssaving] = useState(false);
    // 저장 버튼 클릭 -> 저장 모드 상태
   const handleSaveClick = () => {
      setIssaving(!issaving);
   };
 

  // return (
  //   <>
  //     <TabBar tabs={RecodeTabs} />
  //     <div onClick={() => handleSaveClick()}>
  //       <Button
  //         name="submitBtn"
  //         text={issaving? '저장완료' : '저장'}
  //         color={issaving ? 'red' : 'blue'}
  //         />
  //     </div>
  //     <div>
  //       {myrecodemusic.map((remusic, index) => (
  //         <div key={index}>
            
  //       ))}
  //     </div>

  //   </>
  // )
};

export default MyRecodeMusicPage;