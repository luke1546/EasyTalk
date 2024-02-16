// PlaceDetailPage.js
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Textbox from "../../UI/atoms/Text/Textbox";
import SNSInputBox from "../../UI/modules/SNSInputBox/SNSInputBox";
import FeedBox from "../../UI/modules/FeedBox/FeedBox";
import Profile from "../../UI/modules/Profile/Profile";
import Line from "../../UI/atoms/Line/Line";
import styled from "styled-components";

const PlaceDetailPage = () => {
  const [feedData, setFeedData] = useState("");
  const [comments, setComments] = useState([]);
  // const [user, setUser] = useState("");
  const { feedId } = useParams();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/neighbor/feed/${feedId}`);
        setFeedData(response.data);

        const commentResponse = await axios.get(`/neighbor/feed/${feedId}/comment`);
        setComments(commentResponse.data);
        console.log(commentResponse.data)
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
        <>
        {feedData &&
          <FeedBox
            key={feedData.feedId}
            userId={feedData.userId}
            feedId={feedData.feedId}
            profileImg={feedData.profileImageUri}
            userName={feedData.nickname}
            isLiked={false}
            likeCount={feedData.heartCount}
            commentCount={feedData.commentCount}
            content={feedData.content}
            createdDate={feedData.registerDate}
            editMode={true}
            // feedImageUris={feedData.feedImageUris[feedData.feedImageUris.length - 1]}// 변경된 부분
          />}
       <Line />
        <SNSInputBox feedId={feedData.feedId} />
        {comments.map((comment) => (
          <div key={comment.id}>
            <img src={"https://easy-s3-bucket.s3.ap-northeast-2.amazonaws.com"+comment.profileImageUri} alt="Profile" />
            <Textbox section='singleText' context1={comment.nickname} />
            <Textbox section='singleText' context1={comment.content} />
            <Textbox section='singleText' context1={comment.registrationDate} />
            <hr />  
          </div>
        ))}
        </>
      </div>
    );
  }
  
export default PlaceDetailPage;
