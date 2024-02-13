// PlaceHomePage.js

import InputBar from "../../UI/modules/InputBar";
import SNSInputBox from "../../UI/modules/SNSInputBox/SNSInputBox";
import FeedBox from "../../UI/modules/FeedBox/FeedBox";
import Icon from "../../UI/atoms/Icon/Icon";
// import Profile from "../../UI/modules/Profile/Profile";

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const PlaceHomePage = () => {
  const navigate = useNavigate();

  const [hasNeighbors, setHasNeighbors] = useState();
  const [myFeed, setmyFeed] = useState([]);
  
  useEffect(() => {
    fetchMyNeighbor();
  }, []);

  const fetchMyNeighbor = async () => {
    try {
      const params = {
        status: "NEIGHBOR",
        order: "name"
      };

      const response = await axios.get("/neighbor", { params }, { withCredentials: true });

      setHasNeighbors(response.data ? true : false); // fetchMyNeighbor의 결과에 따라 hasNeighbors 설정
    } catch (error) {
      console.error("Error myneighbor", error);
    }
  };

  const fetchMyFeed = async () => {
    try {
            const params = {
              type: "List",
            };
    
            const response = await axios.get("/neighbor/feed", { params }, { withCredentials: true });
    
            setmyFeed(response.data);
          } catch (error) {
            console.log("Error myFeed", error);
          }
  };

  useEffect(() => {
    fetchMyFeed();
  }, []);

  const [nickname, setNickname] = useState("");
  const [profileImageUri, setProfileImageUri] = useState("");
  const [userId, setuserId] = useState("");

  useEffect(() => {
    // 명세서 나의 유저데이터
    axios
      .get("/user", { withCredentials: true })
      .then((response) => {
        const userData = response.data;
        const nickname = userData.nickname; 
        const profileImageUri = userData.profileImageUri;
        const userId = userData.userId

        setNickname(nickname);
        setProfileImageUri(profileImageUri);
        setuserId(userId);

      })
      .catch((error) => {
        console.error("유저 데이터 에러 : ", error);
        console.dir(error);
      });
    })

  const handlePost = async (newPost) => {
    try {
      const postFeedData = {
        targetUserId: userId,
        // feedId: ,
        profileImageUri: profileImageUri,
        nickname: nickname,
        content: newPost, // SNSInputBox에서 입력한 내용을 가져옵니다.
        heartCount: 0,
        commentCount: 0,
        registerDate: null,
        myFeed: false,
        feedImageUris: []
      };

      const response = await axios.post("/neighbor/feed", postFeedData, { withCredentials: true });

      // 게시글 등록 후에 피드를 다시 불러옵니다.
      fetchMyFeed();
    } catch (error) {
      console.log("Error posting feed", error);
    }
  };


  return (
    <>
      <div className="PlaceHomePage">
        {/* 이웃이 있는지 여부에 따라 다른 내용을 렌더링 */}
        {hasNeighbors ? (
          <>
            <InputBar variant="searchinputbar" />
            <SNSInputBox
              type="post"
              onSubmit={handlePost}
              // onContentChange={(value) => setContent(value)}
              // onImagesChange={(value) => setImages(value)}
              // onPost={handlePost}
            />
            <div>
            { myFeed.map((feed) => (
            // 클릭하면 게시글 수정 페이지로 이동
                <div onClick={() => navigate(`/neighbor/feed/${feed.feedId}`)}>
                  <FeedBox
                    key={feed.feedId}
                    userId={feed.userId} // userId가 있다고 가정합니다.
                    feedId={feed.feedId}
                    profileImg={feed.profileImageUri}
                    nickname={feed.nickname}
                    isLiked={false} // 좋아요 여부는 별도로 관리해야 할 것 같습니다.
                    likeCount={feed.heartCount}
                    commentCount={feed.commentCount}
                    content={feed.content}
                    createdDate={feed.registerDate}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <br />
            <Icon name="warningIcon" />
            <p>아직 내 이웃이 없습니다! 내 이웃을 추가해주세요.</p>
            <InputBar variant="searchinputbar" />
          </>
        )}
      </div>
    </>
  )
}


export default PlaceHomePage;