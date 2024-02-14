import React, { useState, useEffect } from 'react';
import axios from "axios";
import TabBar from '../../UI/modules/TabBar/TabBar';
import Button from "../../UI/atoms/Button/Button";
import Input from "../../UI/atoms/Input/Input";
import { Link } from 'react-router-dom';

const MyRecodeWordPage = () => {
  const [myrecodeword, setmyrecodeword] = useState([]);

  const fetchMyRecodeWord = async () => {
    try {
      const params = {
        target: "word",
      };

      const response = await axios.get("/study/test/record", { params }, { withCredentials: true });

      setmyrecodeword(response.data)
    } catch (error) {
      console.error("Error myrecodeword", error);
    }
  };

  useEffect(() => {
    fetchMyRecodeWord();
  }, []);

  const RecodeTabs = [
    { label: '노래시험', to: '/myrecodemusic' },
    { label: '단어시험', to: '/myrecodeword' },
  ] 

  return (
    <>
      <TabBar tabs={RecodeTabs} initialTab={2} />
      <div>
        {myrecodeword.map((reword, index) => (
          <Link to={`/myrecodeword/test/record/detail?target=${reword.testId}`}
                key={index}>
            <div>
              <Input 
                name="singleInput"
                value={`${reword.testTitle},
                        ${reword.startTime},
                        ${reword.score}/100`}
                readOnly      // 시용자 수정 불가능
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  )
};

export default MyRecodeWordPage;