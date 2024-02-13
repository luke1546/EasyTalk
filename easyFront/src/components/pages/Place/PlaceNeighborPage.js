import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

import FeedBox from "../../UI/modules/FeedBox/FeedBox";
import Profile from "../../UI/modules/Profile";
import Button from "../../UI/atoms/Button/Button";

const PlaceNeigborPage = () => {
  // 이웃 상태를 관리하는 state
  const [isNeighbors, setIsNeighbors] = useState();

  // 페이지 이동을 위한 hook
  const navigate = useNavigate();

  // 사용자 피드를 관리하는 state
  const [userFeed, setuserFeed] = useState([]);

  // URL 파라미터에서 targetUserId를 가져옴
  const { targetUserId } = useParams();

  // 이웃 상태를 가져오는 함수
  const fetchIsNeighbor = async () => {
    try {
      const response = await axios.get(`/neighbor/status?target=${targetUserId}`, { withCredentials: true });
      console.log(response.data)

      setIsNeighbors(response.data)

      console.log(isNeighbors)
    } catch (error) {
      console.error("Error checking neighbor status", error);
    }
  };
  useEffect(() => {
    fetchIsNeighbor();
  }, [targetUserId]);

  // 피드
  const fetchuserFeed = async () => {
    try {
      const response = await axios.get(`/neighbor/feed?type=detail&target=${targetUserId}`);
      
      setuserFeed(response.data);

    } catch (error) {
      console.log("Error Feed", error);
    }
  };
  useEffect(() => {
    fetchuserFeed();
  }, [targetUserId]);

  const requestOrAcceptNeighbor = async (event, targetUserId) => {
    event.stopPropagation(); 

    try {
      const params = {
        status: isNeighbors === "RECEIVED" ? "NEIGHBOR" : "SENTED",
        neighborId: targetUserId
      };

      if (params.status === "NEIGHBOR") {
        const response = await axios.put("/neighbor", params );
      } else if (params.status === "SENTED") {
        const response = await axios.post("/neighbor", params );
      }

      await fetchIsNeighbor();
    } catch (error) {
      console.error("Error requestOrAcceptNeighbor() ", error);
    }

  }

  const terminateOrRejectNeighbor = async (event, targetUserId) => {
    event.stopPropagation(); 
    
    try {
      const params = {
        status: isNeighbors,
        neighborId: targetUserId
      };

      const response = await axios.delete(`/neighbor?status=${params.status}&neighborId=${params.neighborId}`);
      await fetchIsNeighbor();
    } catch (error) {
      console.error("Error terminateOrRejectNeighbor() ", error);
    }

  }

  return (
    <div className="PlaceEditPage">
      광장 이웃 게시글 화면
      <Profile pagetype='horizontal-layout' />
      {isNeighbors === 'NEIGHBOR' && 
        <Button name="submitBtn" text='이웃 끊기' onClick={(event) => {
            terminateOrRejectNeighbor(event, targetUserId);
          }}
        />
      }
      {isNeighbors === 'NOTNEIGHBOR' && 
        <Button name="submitBtn" text='이웃 신청' onClick={(event) => {
            requestOrAcceptNeighbor(event, targetUserId);
          }}
        />
      }
      {isNeighbors === 'SENTED' && 
        <Button name="submitBtn" text='이웃요청 취소' onClick={(event) => {
            terminateOrRejectNeighbor(event, targetUserId);
          }}
        />
      }
      {isNeighbors === 'RECEIVED' && <div>
        <Button name="submitBtn" text='이웃요청 수락' onClick={(event) => {
            requestOrAcceptNeighbor(event, targetUserId);
          }}
        />
        <Button name="submitBtn" text='이웃요청 거절' onClick={(event) => {
            terminateOrRejectNeighbor(event, targetUserId);
          }}
        />
      </div>}
      {/* {isNeighbors === 'MYPROFILE'} 내가 내프로필 검색한경우 */} 
      <div>
        { userFeed.map((feed) => (
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
    </div>
  );
  }
  
  export default PlaceNeigborPage;