// PlaceDetailPage.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Textbox from "../../UI/atoms/Text/Textbox";
import SNSInputBox from "../../UI/modules/SNSInputBox/SNSInputBox";
import FeedBox from "../../UI/modules/FeedBox/FeedBox";
import Profile from "../../UI/modules/Profile/Profile";

const PlaceDetailPage = () => {
  const [feedData, setFeedData] = useState("");
  const [user, setUser] = useState("");
  const { feedId } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/neighbor/feed/${feedId}`);
        setFeedData(response.data);
        // const userResponse = await axios.get(`/neighbor/user/${response.data.userId}`);
        // setUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [feedId]);

  // 데이터 못받아올때
  if (!feedData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PlaceDetailPage">
      광장 게시글 상세 화면
        <>
          {feedData && <FeedBox
            key={feedData.feedId}
            userId={feedData.userId}
            feedId={feedData.feedId}
            profileImg={feedData.profileImageUri}
            nickname={feedData.nickname}
            isLiked={false}
            likeCount={feedData.heartCount}
            commentCount={feedData.commentCount}
            content={feedData.content}
            createdDate={feedData.registerDate}
          />}
          <SNSInputBox feedId={feedData.feedId} />
          <div>
          <Textbox section='singleText' context1={user.info || ""} context2={user.otherInfo || ""}/>
          </div>
        </>
      </div>
    );
  }
  
export default PlaceDetailPage;
