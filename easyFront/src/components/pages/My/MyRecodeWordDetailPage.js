import React, { useState, useEffect } from 'react';
import axios from "axios";
import DoubleBtn from "../../UI/modules/DoubleBtn";
import Input from "../../UI/atoms/Input/Input";
import { useLocation } from 'react-router-dom';  // useLocation import

const MyRecodeWordDetailPage = () => {
  const [myworddetail, setmyworddetail] = useState([]);
  const [reword, setReword] = useState(null);
  const location = useLocation();  // location 상태 선언

  // URL의 쿼리 파라미터에서 testId 추출
  const testId = new URLSearchParams(location.search).get("target");

  const fetchMyRecodeDetail = async () => {
    try {
      const params = {
        target: testId
      };

      const response = await axios.get("/study/test/record/detail", { params }, { withCredentials: true });

      setmyworddetail(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Error myrecodedetail", error)
    }
  };

    const fetchReword = async () => {
    try {
      const response = await axios.get(`/study/test/record?target=word`);
      //  detail의 testId와 MyRecodeWordPage의 testId가 일치하면 정보를 반환
      const matchingTest = response.data.find(test => test.testId === Number(testId));

      if (matchingTest) {
        setReword({
          testTitle: matchingTest.testTitle,
          score: matchingTest.score
        });
      }

    } catch (error) {
      console.error("Error fetching reword", error);
    }
  };


  useEffect(() => {
    fetchMyRecodeDetail();
    fetchReword();
  }, [testId]);  // testId가 변경될 때마다 fetchMyRecodeDetail를 호출

  return (
    <>
      <div>
        {reword && (
        <Input
          name="singleInput"
          value={`${reword.testTitle} ${reword.score}/100`}
          readOnly
        />
        )}

        {myworddetail.map((detail, index) => (
          <div key={index}>
            <Input
              name="singleInput"
              value={`${detail.word} | ${detail.meaning}`}
            />
          </div>
        ))}
      </div>
    </>
  )
};

export default MyRecodeWordDetailPage;
