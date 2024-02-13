// PlaceSearchPage.js

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import InputBar from "../../UI/modules/InputBar";
import Profile from "../../UI/modules/Profile/Profile";
import Textbox from "../../UI/atoms/Text/Textbox";

const PlaceSearchPage = () => {
  const navigate = useNavigate();
  const { searchValue } = useParams(); // URL에서 searchValue 값을 가져옵니다.
  const [searchResult, setSearchResult] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/neighbor?status=SENTED&keyword=${searchValue}`);
        setSearchResult(response.data);
        console.dir(response);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchData();
  }, [searchValue]);  

  const handleProfileClick = (userId) => {
    navigate(`/neighbor/user/${userId}`);
  };

  return (
    <div className="PlaceSearchPage">
      <h1>검색 결과</h1>
      <InputBar variant="searchinputbar" uri="/neighbor/search/" />
      {searchResult.map((user) => (
        <div key={user.userId}>
          <Profile
            pageType="horizontal-layout"
            // userId={user.userId}
            // userName={user.userName}
            // profileImg={user.profileImg}
            targetUserId={user.userId}
            profileImg={user.profileImg}
            nickname={user.nickname}
            onClick={() => handleProfileClick(user.userId)}
          />
          <Textbox section='singleText' context1={user.info} context2={user.otherInfo}/>
        </div>
      ))}
    </div>
  );
};

export default PlaceSearchPage;