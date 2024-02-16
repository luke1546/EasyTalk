// PlaceNeighborPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import FeedBox from "../../UI/modules/FeedBox/FeedBox";
import Profile from "../../UI/modules/Profile";
import Button from "../../UI/atoms/Button/Button";
import Line from "../../UI/atoms/Line/Line";
import styled from "styled-components";

const ProfileDiv = styled.div`
  border: 1px solid #9c9cff;
  border-radius: 20px;
  margin: 20px 20px 0;
  box-shadow: 0px 5px 6px -4px #9c9cff;
`;

const PlaceNeighborPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state ? location.state.user : null; // 상태에서 사용자 데이터를 가져옵니다.
  const [status, setStatus] = useState(null); // 이웃 관계 데이터 저장
  const [feeds, setFeeds] = useState([]);     // 게시글 데이터 저장

  const handleFeedClick = (feedId) => {
    navigate(`/neighbor/feed/${feedId}/detail`); // 클릭하면 해당 피드의 수정 페이지로 이동
  };

  const checkNeighborStatus = async () => {
    try {
      const response = await axios.get(`/neighbor/status?target=${user.userId}`, { withCredentials: true });
      setStatus(response.data.status);
    } catch (error) {
      console.error("Error neighbor status", error);
    }
  };

  const handleNeighborRequest = async () => {
    try {
      await axios.post("/neighbor", { withCredentials: true });
      // 성공 후, 상태 업데이트
      setStatus("NEIGHBOR");
    } catch (error) {
      console.error("Error sending neighbor", error);
    }
  };

  const handleUnfriend = async () => {
    try {
      await axios.delete(`/neighbor?status=NEIGHBOR&neighborId=${user.userId}`, { withCredentials: true });
      // 성공 후, 상태 업데이트
      setStatus("NOTNEIGHBOR");
    } catch (error) {
      console.error("Error unfriending", error);
    }
  };

  const fetchFeeds = async () => { // 게시글을 가져오는 함수
    try {
      const response = await axios.get(`/neighbor/feed?type=detail&target=${user.userId}`, { withCredentials: true });
      setFeeds(response.data); // 가져온 데이터를 상태에 저장
      console.dir(response.data)
    } catch (error) {
      console.error("Error fetching feeds", error);
    }
  };

  useEffect(() => {
    checkNeighborStatus();
    fetchFeeds();
  }, []);
  return (
    <>
    <ProfileDiv>
    <Profile
      // userId={user.userId}
      // profileImg={user.profileImg}
      text1={user.nickname}
      text2={user.info}
      pageType="horizontal-layout"
        />
      </ProfileDiv>
      <div>
        {status === "NEIGHBOR" ? (
          <div onClick={() => handleUnfriend()}>
          <Button
            name="submitBtn"
            text="이웃 끊기"
          />
          </div>
        ) : (
          <div onClick={() => handleNeighborRequest()}>
          <Button
            name="submitBtn"
            text="이웃 신청"
          />
          </div>
        )}
      </div>
      <Line />
      <h3>{user.nickname} 님의 게시글</h3>
      {feeds.map(feed => (
        <div onClick={() => handleFeedClick(feed.feedId)}>
        <FeedBox
          key={feed.feedId}
          userId={feed.userId} // userId가 있다고 가정합니다.
          feedId={feed.feedId}
          profileImg={feed.profileImageUri}
          userName={feed.nickname}
          isLiked={false} // 좋아요 여부는 별도로 관리해야 할 것 같습니다.
          likeCount={feed.heartCount}
          commentCount={feed.commentCount}
          content={feed.content}
          createdDate={feed.registerDate}
          feedImageUris={feed.feedImageUris[feed.feedImageUris.length-1]}
          editMode={false}
          />
      </div>
      ))}
    </>
  );
};

export default PlaceNeighborPage;

