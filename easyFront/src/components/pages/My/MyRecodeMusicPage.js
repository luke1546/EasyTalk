import React, { useState, useEffect } from 'react';
import axios from "axios";
import TabBar from '../../UI/modules/TabBar/TabBar';
import Button from "../../UI/atoms/Button/Button";
import Input from "../../UI/atoms/Input/Input";

const MyRecodeMusicPage = () => {
  const [myrecodemusic, setmyrecodemusic] = useState([]);

  const fetchMyRecodeMusic = async () => {
    try {
      const params = {
        target: "music",
      };

      const response = await axios.get("/study/test/record", { params }, { withCredentials: true });

      setmyrecodemusic(response.data)
      // console.log(response.data)
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
 

  return (
    <>
      <TabBar tabs={RecodeTabs} />
      <div onClick={() => handleSaveClick()}>
        <Button
          name="submitBtn"
          text={issaving? '저장완료' : '저장'}
          color={issaving ? '#8382ff;' : '#8382ff;'}
          />
      </div>
      <div>
        {myrecodemusic.map((remusic, index) => (
          <div key={index}>
            <Input 
              name="singleInput"
              value={`${remusic.testTitle},
                      ${remusic.startTime},
                      ${remusic.score}/100`}
                      readOnly    // 사용자가 수정하지못하게 함
            />
          </div>
        ))}
      </div>
    </>
  )
};

export default MyRecodeMusicPage;