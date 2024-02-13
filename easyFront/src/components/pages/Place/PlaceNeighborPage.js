import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

import FeedBox from "../../UI/modules/FeedBox/FeedBox";
import Profile from "../../UI/modules/Profile";
import BtnBox from "../../UI/modules/BtnBox";

const PlaceNeigborPage = () => {

  // 이웃 상태 관리
  const [isNeighbors, setHasNeighbors] = useState();
  
  const navigate = useNavigate();
  const [myFeed, setmyFeed] = useState([]);
  const { targetUserId } = useParams();

  useEffect(() => {
    const fetchMyFeed = async () => {
      try {
        const response = await axios.get(`/neighbor/feed?type=detail&target=${targetUserId}`);
        setmyFeed(response.data);
        console.log(targetUserId);
        console.dir(response);
      } catch (error) {
        console.log("Error Feed", error);
      }
    };

    fetchMyFeed();
  }, [targetUserId]);

  return (
    <div className="PlaceEditPage">
      광장 이웃 게시글 화면
      {isNeighbors ? (
        // 이웃인 경우
          <>
            <Profile pagetype='horizontal-layout' />
            <BtnBox text1="이웃 끊기"/>
            
            <div>
              { myFeed.map((feed) => (
              // 클릭하면 게시글 수정 페이지로 이동
                  <div onClick={() => navigate(`/neighbor/feed/${feed.feedId}`)}>
                    <FeedBox
                      userId={feed.userId} // userId가 있다고 가정합니다.
                      feedId={feed.feedId}
                      targetUserId={feed.targetUserId}
                      profileImgageUri={feed.profileImageUri}
                      feedImageUris={feed.feedImageUris}
                      nickname={feed.nickname}
                      isLiked={false} // 좋아요 여부는 별도로 관리해야 할 것 같습니다.
                      heartCount={feed.heartCount}
                      commentCount={feed.commentCount}
                      content={feed.content}
                      registerDate={feed.registerDate}
                    />
                  </div>
                ))
              }
            </div>
          </>
      ) : (
        // 이웃이 아닌 경우
        <>
          <Profile pagetype='horizontal-layout' />
          <BtnBox text1="이웃 신청"/>
          <div>
              { myFeed.map((feed) => (
              // 클릭하면 게시글 수정 페이지로 이동
                  <div onClick={() => navigate(`/neighbor/feed/${feed.feedId}`)}>
                    <FeedBox
                      userId={feed.userId} // userId가 있다고 가정합니다.
                      feedId={feed.feedId}
                      targetUserId={feed.targetUserId}
                      profileImgageUri={feed.profileImageUri}
                      feedImageUris={feed.feedImageUris}
                      nickname={feed.nickname}
                      isLiked={false} // 좋아요 여부는 별도로 관리해야 할 것 같습니다.
                      heartCount={feed.heartCount}
                      commentCount={feed.commentCount}
                      content={feed.content}
                      registerDate={feed.registerDate}
                    />
                  </div>
                ))
              }
            </div>
        </>
      )}
      </div>
    );
  }
  
  export default PlaceNeigborPage;